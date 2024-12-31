import { t } from 'i18next';

import { Tooltip } from '@mui/material';

import PropTypes from 'prop-types';

import SingleChart from '@/components/Shared/CircleChart';
import * as Icons from '@/components/Shared/Icons';

import Accepts from './Accepts';

import {
  AgeGroupIconTranslate,
  AgeGroupTranslate,
  TypeIconTranslate,
  TypeTranslate,
} from '../dicts';
import * as Styled from '../styles';

import * as Tooltips from './Tooltips';

export * as Tooltip from './Tooltips';

// it would be better to import just like Tooltip but don't want to make to many changes all over the code
export { ConditionalLink, Link, LinkNoRel } from './Links';

export { default as Accepts } from './Accepts';
export { default as DoctorLinks } from './DoctorLinks';
export { default as PhoneButton } from './PhoneButton';

export const DoubleChip = function DoubleChip({ type, ageGroup, isExtra, isFloating, viewType }) {
  const drType = t(TypeTranslate[type]);
  const drAgeGroup = t(AgeGroupTranslate?.[ageGroup] ?? 'adults');
  const typeIcon = TypeIconTranslate[type] ?? 'Family';
  const ageGroupIcon = AgeGroupIconTranslate?.[ageGroup] ?? 'Adults';

  const isDentist = type === 'den';

  const first = viewType !== 'list' && (
    <Styled.PageInfo.First single={!isDentist ? 1 : 0} direction="row" component="span" spacing={1}>
      <Icons.Icon name={typeIcon} className="icon" />
      <span className="text">{t(`${drType}`)}</span>
    </Styled.PageInfo.First>
  );

  const second = isDentist && viewType !== 'list' && (
    <Styled.PageInfo.Second direction="row" component="span" spacing={1}>
      <span className="text">{t(`${drAgeGroup}`)}</span>
      <Icons.Icon name={ageGroupIcon} className="icon" />
    </Styled.PageInfo.Second>
  );

  let isExtraLabel = '';
  let isExtraTooltip = t('clinicForBetterAccessibility');
  let isFloatingLabel = '';
  let isFloatingTooltip = t('floatingClinic');

  if (viewType !== 'page') {
    /* empty */
  } else {
    isExtraLabel = t('clinicForBetterAccessibility');
    isExtraTooltip = t('clinicForBetterAccessibilityDesc');
    isFloatingLabel = t('floatingClinic');
    isFloatingTooltip = t('floatingClinic');
  }

  const third = isExtra && (
    <Tooltip title={isExtraTooltip} leaveTouchDelay={3000} enterTouchDelay={50}>
      <Styled.IsSpecial direction="row" alignItems="center" spacing={1} viewType={viewType}>
        <Icons.Icon name="ClinicViolet" />
        {isExtraLabel}
      </Styled.IsSpecial>
    </Tooltip>
  );

  const fourth = isFloating && (
    <Tooltip title={isFloatingTooltip} leaveTouchDelay={3000} enterTouchDelay={50}>
      <Styled.IsSpecial
        direction="row"
        alignItems="center"
        spacing={1}
        viewType={viewType}
        type="floating"
      >
        <Icons.Icon name="GpFloatingBlue" />
        {isFloatingLabel}
      </Styled.IsSpecial>
    </Tooltip>
  );

  return (
    <Styled.PageInfo.DCWrapper direction="row" viewType={viewType}>
      {first}
      {second}
      {third}
      {fourth}
    </Styled.PageInfo.DCWrapper>
  );
};

DoubleChip.defaultProps = {
  ageGroup: undefined,
  isExtra: false,
  isFloating: false,
  viewType: 'marker',
};

DoubleChip.propTypes = {
  type: PropTypes.string.isRequired,
  ageGroup: PropTypes.oneOf([undefined, 'students', 'youth']),
  isExtra: PropTypes.bool,
  isFloating: PropTypes.bool,
  viewType: PropTypes.oneOf(['marker', 'list', 'page']),
};

export const HeadQuotient = function HeadQuotient({
  load,
  note,
  date,
  accepts,
  hasOverride,
  tooltipTitle,
}) {
  return (
    <Tooltip
      title={
        <Tooltips.HeadQuotient
          load={load}
          note={note}
          date={date}
          hasOverride={hasOverride}
          tooltipTitle={tooltipTitle}
        />
      }
      leaveTouchDelay={3000}
      enterTouchDelay={50}
    >
      <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
        <Accepts accepts={accepts} />
      </Styled.InfoWrapper>
    </Tooltip>
  );
};

HeadQuotient.defaultProps = {
  hasOverride: false,
};

HeadQuotient.propTypes = {
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  load: PropTypes.string.isRequired,
  accepts: PropTypes.oneOf(['y', 'n']).isRequired,
  hasOverride: PropTypes.bool,
  tooltipTitle: PropTypes.string.isRequired,
};

export const Availability = function Availability({ date, availability, hasOverride, isFloating }) {
  if (isFloating) {
    return '';
  }

  return (
    <Tooltip
      title={
        <Tooltips.Availability date={date} hasOverride={hasOverride} availability={availability} />
      }
      leaveTouchDelay={3000}
      enterTouchDelay={50}
    >
      <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
        <SingleChart size="26px" percent={availability} />
        {availability > 1 && (
          <SingleChart size="18px" percent={availability - 1} stroke="#FF4C4C" inner />
        )}
      </Styled.InfoWrapper>
    </Tooltip>
  );
};

Availability.defaultProps = {
  hasOverride: false,
  isFloating: false,
};

Availability.propTypes = {
  date: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  hasOverride: PropTypes.bool,
  isFloating: PropTypes.bool,
};
