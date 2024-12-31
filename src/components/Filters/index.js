import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { t } from 'i18next';
import PropTypes from 'prop-types';

import { useFilter } from '@/context/filterContext';

import * as Icons from '@/components/Shared/Icons';

import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import ToggleMapCards from './ToggleMapCards';
import Search from './Search';

import * as Styled from './styles';
import { withErrorBoundary } from '../Shared/ErrorBoundary';

const DoctorTypeIcons = {
  gp: <Icons.Icon name="Family" />,
  ped: <Icons.Icon name="Kids" />,
  den: <Icons.Icon name="Dentist" />,
  gyn: <Icons.Icon name="Gyno" />,
};
const AgeGroupIcons = {
  a: <Icons.Icon name="Adults" />,
  y: <Icons.Icon name="Kids" />,
  s: <Icons.Icon name="Students" />,
};
const AcceptsIcons = {
  vsi: <Icons.Icon name="All" />,
  y: <Icons.Icon name="Check" />,
  n: <Icons.Icon name="Ban" />,
};

const DoctorTypeText = {
  gp: 'generalPractitioner',
  ped: 'pediatrician',
  den: 'dentist',
  gyn: 'gynecologist',
};

const Filters = function Filters({ useShow }) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { doctorType, accept } = useFilter();
  const [type, ageGroup = 'a'] = doctorType.split('-');

  useEffect(() => {
    if (matches) setExpanded(true);
    if (!matches) setExpanded(false);
  }, [matches]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const up = (
    <Styled.Grid>
      <Styled.Toggles>
        <ToggleDoctorType />
        <ToggleAccepts />
      </Styled.Toggles>
      <Search />
    </Styled.Grid>
  );

  const filterIcon = (
    <Styled.FilterIconStack direction="row" spacing={1}>
      <Icons.Icon name="Filter" />
      <span>Filter</span>
    </Styled.FilterIconStack>
  );

  const typeIcon = type && DoctorTypeIcons[type];
  const ageGroupIcon = type === 'den' && ageGroup && AgeGroupIcons[ageGroup];
  const acceptsIcon = accept && AcceptsIcons[accept];

  const doctorTypeText = t(`${DoctorTypeText[type]}`);

  const filterInfo = (
    <Styled.FilterInfoStack direction="row">
      {typeIcon}
      <span>{doctorTypeText}</span>
      {type === 'den' && (
        <Styled.Divider orientation="vertical" flexItem sx={{ marginInline: 1 }} />
      )}
      {ageGroupIcon}
      <Styled.Divider orientation="vertical" flexItem sx={{ marginInline: 1 }} />
      {acceptsIcon}
    </Styled.FilterInfoStack>
  );

  const down = (
    <Styled.Grid>
      <Styled.Card>
        <Styled.Collapse in={expanded}>
          <ToggleDoctorType />
          <ToggleAccepts />
        </Styled.Collapse>
        <Styled.CardActions onClick={handleExpandClick}>
          {filterIcon}
          {filterInfo}
        </Styled.CardActions>
        {/* you can create MobileSearch component  with only mobile style or tweak current Search */}
      </Styled.Card>
      <Search />
      <ToggleMapCards useShow={useShow} />
    </Styled.Grid>
  );

  return matches ? up : down;
};

Filters.propTypes = {
  useShow: PropTypes.func.isRequired,
};

export default withErrorBoundary(Filters);
