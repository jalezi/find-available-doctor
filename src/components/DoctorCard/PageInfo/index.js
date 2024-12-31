import { useState } from 'react';
import { CardContent, Typography, Stack, Alert, Tooltip, ButtonBase, Icon } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { t } from 'i18next';

import { useFilter } from '@/context/filterContext';

import * as Icons from '@/components/Shared/Icons';
import { MAP } from '@/const';

import ReportError from '../ReportError';
import WebsiteLinks from './WebsiteLinks';
import PhoneLinks from './PhoneLinks';
import * as Styled from '../styles';
import * as Shared from '../Shared';

import { AgeGroupTranslate } from '../dicts';
import { DoctorPropType } from '../../../types';

const PageInfo = function PageInfo({ doctor }) {
  const { searchValue } = useFilter();
  const { state } = useLocation();

  const { lng } = useParams();

  const [type, ageGroup] = doctor.type.split('-');

  const emailText = doctor.email;
  const orderformText = doctor.orderform && t('orderform');
  const isReportError = state?.isReportError ?? false;

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/${lng}/`, {
      state: {
        searchValue,
        zoom: state?.zoom ?? MAP.ZOOM,
        center: state?.center ?? MAP.GEO_LOCATION.SL_CENTER,
        type,
        ageGroup: AgeGroupTranslate[ageGroup] ?? 'adults',
      },
    });
  };

  const [isEditing, setIsEditing] = useState(isReportError);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const reportError = () => {
    setIsEditing(true);
    setMessage('');
  };

  if (isEditing) {
    const doctorFormData = {
      name: doctor.name,
      instId: doctor.instId,
      provider: doctor.provider,
      fullAddress: doctor.fullAddress,
      website: doctor.website,
      phone: doctor.phone,
      email: doctor.email,
      orderform: doctor.orderform,
      accepts: doctor.accepts,
      availability: doctor.availability,
      type: doctor.type,
      note: '',
    };
    return (
      <ReportError
        doctorFormData={doctorFormData}
        setIsEditing={setIsEditing}
        setMessage={setMessage}
        isError={isError}
        setIsError={setIsError}
      />
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // todo create component for urls -> website, orderform

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Typography component="h1" variant="h1" translate="no">
          {doctor.name}
        </Typography>
        <Shared.DoubleChip
          type={type}
          ageGroup={ageGroup}
          isExtra={doctor.isExtra}
          isFloating={doctor.isFloating}
          viewType="page"
        />
        <Typography component="h2" variant="h2" translate="no">
          {doctor.provider}
        </Typography>
        <Typography
          component="address"
          variant="body2"
          translate="no"
          sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}
        >
          {doctor.fullAddress}
        </Typography>

        <Stack sx={{ mt: { md: 2 } }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Shared.HeadQuotient
              load={doctor.load}
              note={doctor.note}
              date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
              accepts={doctor.accepts}
              hasOverride={doctor.acceptsOverride || doctor.note ? true : undefined}
            />
            <Shared.Availability
              isFloating={doctor.isFloating}
              availability={doctor.availability}
              date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
              viewType="page"
              hasOverride={doctor.availabilityOverride ? true : undefined}
            />
          </Stack>
        </Stack>

        {!isError && message ? (
          <Alert sx={{ marginTop: '1rem' }} severity="success">
            {message}
          </Alert>
        ) : null}
        {isError && message ? (
          <Alert sx={{ marginTop: '1rem' }} severity="error">
            {message}
          </Alert>
        ) : null}
        <Styled.PageInfo.LinksMenuWrapper>
          {doctor.website && <WebsiteLinks website={doctor.website} />}
          {doctor.phone && <PhoneLinks phone={doctor.phone} />}
          {emailText && (
            <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
              <Typography component="div" variant="body1">
                <Icons.Icon name="Email" />
              </Typography>
              <Shared.ConditionalLink to={`mailto:${emailText}`} variant="body1">
                {emailText}
              </Shared.ConditionalLink>
            </Styled.PageInfo.LinkWrapper>
          )}
          {orderformText && (
            <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
              <Typography component="div" variant="body1">
                <Icons.Icon name="Booking" />
              </Typography>
              <Shared.ConditionalLink to={doctor.orderform} variant="body1">
                {orderformText}
              </Shared.ConditionalLink>
            </Styled.PageInfo.LinkWrapper>
          )}
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="ReportError" />
            </Typography>
            <button type="button" onClick={reportError}>
              {t('reportError.tooltip')}
            </button>
          </Styled.PageInfo.LinkWrapper>
        </Styled.PageInfo.LinksMenuWrapper>
      </div>
      <Styled.PageInfo.ToolbarWrapper>
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Styled.PageInfo.BackWrapper direction="row">
            <ButtonBase onClick={handleBackButton}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Icon sx={{ marginLeft: '-8px' }}>
                  <Icons.Icon name="ArrowBack" />
                </Icon>
                <Typography component="div" variant="body1">
                  {t('backToHome')}
                </Typography>
              </Stack>
            </ButtonBase>
          </Styled.PageInfo.BackWrapper>
          <Styled.PageInfo.PrintIconButton onClick={handlePrint}>
            <PrintIcon />
          </Styled.PageInfo.PrintIconButton>

          {doctor.updatedAt && (
            <Tooltip
              title={
                <Shared.Tooltip.Updated
                  date={doctor.formatUpdatedAt(lng)}
                  note={doctor.note}
                  acceptsOverride={doctor.acceptsOverride}
                  acceptsZZZS={doctor.acceptsZZZS}
                  availabilityOverride={doctor.availabilityOverride}
                  availabilityZZZS={doctor.availabilityZZZS}
                />
              }
              leaveTouchDelay={3000}
              enterTouchDelay={50}
            >
              <Styled.PageInfo.Override direction="row" alignItems="center" gap="0.25rem">
                <Icons.Icon name="Edit" /> {doctor.formatUpdatedAt(lng)}
              </Styled.PageInfo.Override>
            </Tooltip>
          )}
        </Stack>
      </Styled.PageInfo.ToolbarWrapper>
    </CardContent>
  );
};

PageInfo.propTypes = {
  doctor: DoctorPropType,
};

PageInfo.defaultProps = {
  doctor: undefined,
};

export default PageInfo;
