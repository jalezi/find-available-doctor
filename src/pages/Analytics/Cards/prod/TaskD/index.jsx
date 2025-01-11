/* eslint-disable react/prop-types */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import Papa from 'papaparse';
import { useEffect, useRef, useState } from 'react';

import gynDoseganjePovprecja from 'assets/data/analytics/pivotke-D/pivot_ginekologi_doseganje_povprecja.csv';
import gynObseg from 'assets/data/analytics/pivotke-D/pivot_ginekologi_obseg.csv';
import gpGlavarina from 'assets/data/analytics/pivotke-D/pivot_zdravniki_glavarina.csv';
import gpGlavarinaMean from 'assets/data/analytics/pivotke-D/pivot_zdravniki_glavarina_mean.csv';
import gpObseg from 'assets/data/analytics/pivotke-D/pivot_zdravniki_obseg.csv';
import denDoseganjePovprecja from 'assets/data/analytics/pivotke-D/pivot_zobozdravniki_doseganje_povprecja.csv';
import denObseg from 'assets/data/analytics/pivotke-D/pivot_zobozdravniki_obseg.csv';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { t } from 'i18next';
import CustomReactSelect from 'pages/Analytics/components/CustomReactSelect';
import Label from 'pages/Analytics/components/Label';

/** @type {Highcharts["options"]} */
const nekiOptions = {
  title: {
    text: 'PivotkeD',
    backgroundColor: 'oklch(0.98 0 0)',
  },
  type: 'line',
  xAxis: {
    type: 'datetime',
    plotLines: [
      {
        color: 'red',
        width: 1,
        value: Date.UTC(2022, 0, 1),
        zIndex: 5,
        label: {
          text: 'opis',
          rotation: 0,
          y: 20,
          style: {
            color: '#333333',
          },
        },
      },
    ],
  },
  series: [],
  tooltip: {
    xDateFormat: '%e %B %Y',
    shared: true,
    crosshairs: true,
  },
};

const files = Object.freeze({
  gynDoseganjePovprecja,
  gynObseg,
  gpGlavarinaMean,
  gpGlavarina,
  gpObseg,
  denDoseganjePovprecja,
  denObseg,
});

// Define data groups for categorization
const dataGroups = Object.freeze({
  avg: Object.freeze(['gynDoseganjePovprecja', 'gpGlavarinaMean', 'denDoseganjePovprecja']),
  vol: Object.freeze(['gynObseg', 'gpObseg', 'denObseg']),
  capitation: Object.freeze(['gpGlavarina']),
});

const groupOrder = Object.freeze({
  avg: 2,
  vol: 1,
  capitation: 0,
});

/**
 * @type {readonly { label: string, options: {name: string, label: string, value: string} }[]}
 */
const groupOptions = Object.entries(dataGroups)
  .map(([label, opts]) => ({
    label,
    options: opts.map(value => ({
      name: 'data',
      label: value,
      value,
      group: label,
    })),
  }))
  .sort((a, b) => groupOrder[a.label] - groupOrder[b.label]);

/**
 * Utility to parse CSV file
 * @param {string} fileUrl
 * @returns {Promise<{ public: number[][], private: number[][] }>}
 */
const parseCsvData = async fileUrl => {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let text;
  try {
    text = await response.text();
  } catch (error) {
    throw new Error('An error occurred while fetching the data.', { cause: error });
  }
  if (!text) {
    throw new Error('An error occurred while fetching the data.');
  }

  const data = { public: [], private: [] };

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      delimiter: ',',
      skipEmptyLines: true,
      step: results => {
        const { datum, javni, zasebni } = results.data;
        const [year, month, day] = datum.split('-');
        const date = Date.UTC(year, month - 1, day);
        data.public.push([date, Number(parseFloat(javni).toFixed(2))]);
        data.private.push([date, Number(parseFloat(zasebni).toFixed(2))]);
      },
      complete: () => resolve(data),
      error: error => reject(error),
    });
  });
};

function formatGroupLabel(data) {
  return (
    <div>
      <span>{data.label}</span>
      <span>{data.options.length}</span>
    </div>
  );
}

/**
 * FilterForm component for selecting data options
 */
function FilterForm({ filterState, onFormChange }) {
  const tCommon = t('analytics.common', { returnObjects: true });
  const { data: tData } = tCommon;

  // eslint-disable-next-line no-shadow
  const translatedOptions = groupOptions.map(option => ({
    ...option,
    label: tData[option.label],
    options: option.options.map(o => ({ ...o, label: tData[o.label] })),
  }));

  return (
    <form>
      <Label htmlFor="data">Data</Label>
      <CustomReactSelect
        id="data"
        name="data"
        value={{
          name: 'data',
          label: `${tData[filterState.group]}: ${tData[filterState.data]}`,
          value: filterState.data,
        }}
        onChange={onFormChange}
        options={translatedOptions}
        // eslint-disable-next-line react/no-unstable-nested-components
        formatGroupLabel={formatGroupLabel}
      />
    </form>
  );
}

/**
 * PivotkeD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered PivotkeD component.
 */
const PivotkeD = function PivotkeD({ id }) {
  const chartRef = useRef(null);
  const [init, setInit] = useState(false);
  const [chartOptions, setChartOptions] = useState(nekiOptions);
  const [filterState, setFilterState] = useState({
    data: groupOptions[0].options[0].value,
    group: groupOptions[0].options[0].group,
  });
  const [error, setError] = useState(null);

  const translations = t('analytics.taskD', { returnObjects: true });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  useEffect(() => {
    const setData = async () => {
      try {
        const data = await parseCsvData(files[filterState.data]);
        setChartOptions({
          series: [
            { name: 'Javni', data: data.public },
            { name: 'Zasebni', data: data.private },
          ],
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
        setError(new Error('An error occurred while fetching the data.', { cause: err }));
      }
    };
    setData();
  }, [filterState.data]);

  const onFormChange = e => {
    const { name, value } = e;
    setFilterState(prev => ({ ...prev, [name]: value, group: e.group }));
  };

  return (
    <Card id={id}>
      {error && <CardContent>{error.message}</CardContent>}
      <CardHeader>
        <CardTitle>{translations.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <FilterForm filterState={filterState} onFormChange={onFormChange} />
      </CardContent>
      <CardContent>
        <figure>
          <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
        </figure>
      </CardContent>
    </Card>
  );
};

export default withErrorBoundary(PivotkeD);
