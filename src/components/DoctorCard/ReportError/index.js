import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CardContent,
  Typography,
  Stack,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { t } from 'i18next';

import * as SEO from '@/components/SEO';
import slugify from 'slugify';
import * as Shared from '../Shared';
import { SelectEdit, TextareaEdit } from './InlineEdit';
import { toPercent } from '../utils';
import { HIDDEN_FIELDS, getChangedValue, getGSheetFormUrl, makeInputNames } from './utils';
import { useInputs } from './useInputs';

const ReportError = function ReportError({
  doctorFormData,
  setIsEditing,
  setMessage,
  isError,
  setIsError,
}) {
  const { lng } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const formRef = useRef();

  const meta = [{ name: 'robots', content: 'noindex' }];

  const isAccepting = doctorFormData.accepts === 'y';
  const [type, ageGroup] = doctorFormData.type.split('-');
  const availabilityText = toPercent(doctorFormData.availability, lng);

  const drPath = doctorFormData.type;
  const slug = slugify(doctorFormData?.name?.toLowerCase());
  const { instId } = doctorFormData;
  const path = `/${lng}/${drPath}/${slug}/${instId}`;

  /** @type {import('./useInputs.jsx').InitialValues} */
  const initialValues = {
    address: doctorFormData.fullAddress,
    accepts: isAccepting ? 'y' : 'n',
    availability: availabilityText,
    phone: doctorFormData.phone,
    website: doctorFormData.website,
    email: doctorFormData.email,
    orderform: doctorFormData.orderform,
    note: doctorFormData.note,
  };

  const inputs = useInputs(initialValues);
  const getIsSame = () => Object.keys(inputs).every(key => inputs[key][0] === initialValues[key]);

  const postForm = async formData => {
    const formUrl = getGSheetFormUrl();

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'unsafe-url', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData, // body data type must match "Content-Type" header
      });
      setMessage(t('reportError.reportReceived'));
    } catch (err) {
      setIsError(true);
      setMessage(t('reportError.reportError'));
    } finally {
      setOpenDialog(false);
      setIsEditing(false);
      if (isError) {
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const submit = e => {
    e.preventDefault();
    const isSame = getIsSame();
    if (isSame) {
      setMessage(t('reportError.reportNoChange'));
      setIsEditing(false);
      setTimeout(() => {
        setMessage('');
      }, 5000);
      return;
    }
    setOpenDialog(true);
  };

  const resetInputs = () => {
    inputs.address[1](initialValues.address);
    inputs.accepts[1](initialValues.accepts);
    inputs.availability[1](initialValues.availability);
    inputs.phone[1](initialValues.phone);
    inputs.website[1](initialValues.website);
    inputs.email[1](initialValues.email);
    inputs.orderform[1](initialValues.orderform);
    inputs.note[1](initialValues.note);
  };

  const resetForm = () => {
    setIsEditing(false);
    setMessage('');
    if (isError) {
      setIsError(false);
    }
    resetInputs();
    navigate(path);
  };

  const handleOK = async () => {
    const currentFormData = new FormData(formRef.current);
    const formData = new FormData();
    const inputNames = makeInputNames();
    const hiddenInputNames = Object.entries(inputNames).filter(([key]) =>
      HIDDEN_FIELDS.includes(key),
    );
    const visibleInputNames = Object.entries(inputNames).filter(
      ([key]) => !HIDDEN_FIELDS.includes(key),
    );

    hiddenInputNames.forEach(([key, value]) => {
      formData.set(value, currentFormData.get(key));
    });

    visibleInputNames.forEach(([key, value]) => {
      const changedValue = getChangedValue(inputs[key][0], initialValues[key]);
      if (typeof changedValue === 'string') {
        formData.set(value, changedValue);
      }
    });

    await postForm(formData);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const defaultUrl = import.meta.env.VITE_REACT_APP_URL + path;

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.home')} meta={meta} lang={lng} />
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <form id="report-error-form" ref={formRef} onSubmit={submit}>
          <Typography component="h1" variant="h1" translate="no">
            {doctorFormData.name}
          </Typography>
          <Shared.DoubleChip type={type} ageGroup={ageGroup} />
          <Typography component="h2" variant="h2" translate="no">
            {doctorFormData.provider}
          </Typography>
          <Alert severity="info" sx={{ marginY: '1rem' }}>
            {t('reportError.text')}
          </Alert>

          <input hidden name="name" defaultValue={doctorFormData.name} />
          <input hidden name="url" defaultValue={defaultUrl} />
          <input hidden name="type" defaultValue={doctorFormData.type} />
          <input hidden name="instId" defaultValue={doctorFormData.instId} />
          <input hidden name="provider" defaultValue={doctorFormData.provider} />
          <TextareaEdit
            name="address"
            value={inputs.address[0]}
            setValue={inputs.address[1]}
            placeholder={t('reportError.placeholder.address')}
            translate="no"
            required
          />
          <TextareaEdit
            name="website"
            value={inputs.website[0]}
            setValue={inputs.website[1]}
            placeholder={t('reportError.placeholder.website')}
          />
          <TextareaEdit
            name="phone"
            value={inputs.phone[0]}
            setValue={inputs.phone[1]}
            placeholder={t('reportError.placeholder.phone')}
          />
          <TextareaEdit
            name="email"
            value={inputs.email[0]}
            setValue={inputs.email[1]}
            placeholder={t('reportError.placeholder.email')}
          />
          <TextareaEdit
            name="orderform"
            value={inputs.orderform[0]}
            setValue={inputs.orderform[1]}
            placeholder={t('reportError.placeholder.orderform')}
          />
          <SelectEdit name="accepts" value={inputs.accepts[0]} setValue={inputs.accepts[1]} />
          <TextareaEdit
            name="availability"
            value={inputs.availability[0]}
            setValue={inputs.availability[1]}
            placeholder={t('reportError.placeholder.availability')}
          />
          <TextareaEdit
            name="note"
            value={inputs.note[0]}
            setValue={inputs.note[1]}
            placeholder={t('reportError.placeholder.note')}
          />
          <Stack
            sx={{
              marginTop: '1em',
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
            }}
          >
            <Button variant="text" type="reset" size="small" onClick={resetInputs} color="inherit">
              {t('reportError.reset')}
            </Button>
            <Button variant="outlined" onClick={resetForm} size="small" color="error">
              {t('reportError.cancel')}
            </Button>

            <Button variant="contained" type="submit" size="small" sx={{ marginLeft: 'auto' }}>
              {t('reportError.send')}
            </Button>
          </Stack>
        </form>
      </CardContent>
      <Dialog id="dialog" open={openDialog}>
        <DialogTitle>{t('reportError.confirmation.title')}</DialogTitle>
        <DialogContent>
          <Alert severity="warning">{t('reportError.confirmation.warningText')}</Alert>
          <DialogContentText sx={{ paddingBlock: '1rem' }}>
            {t('reportError.confirmation.text')}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="text" type="button" autoFocus onClick={handleCancel}>
            {t('reportError.cancel')}
          </Button>
          <Button variant="contained" type="button" onClick={handleOK} sx={{ marginLeft: 'auto' }}>
            {t('reportError.send')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ReportError.propTypes = {
  doctorFormData: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    instId: PropTypes.string,
    provider: PropTypes.string,
    fullAddress: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    orderform: PropTypes.string,
    accepts: PropTypes.string,
    availability: PropTypes.string,
    availabilityText: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  setIsError: PropTypes.func.isRequired,
};
export default ReportError;
