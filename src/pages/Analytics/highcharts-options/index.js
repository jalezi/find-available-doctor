import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';

import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';
import annotaitons from 'highcharts/modules/annotations';
import loMerge from 'lodash/merge';

import { baseOptions, commonOptions } from './options';

accessibility(Highcharts);
exporting(Highcharts);
drilldown(Highcharts);
annotaitons(Highcharts);

accessibility(HighMaps);
exporting(HighMaps);
drilldown(HighMaps);
annotaitons(HighMaps);

Highcharts.setOptions(loMerge(baseOptions, commonOptions));
HighMaps.setOptions(loMerge(baseOptions, commonOptions));
