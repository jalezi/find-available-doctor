import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { t } from 'i18next';

import { useTimestamps } from '@/context/timestampsContext';

export const FooterInfo = styled('div')(({ theme }) => ({
  fontSize: '12px',
  padding: '0 24px 50px',
  color: theme.customColors.textLight,

  '&.is-dr-page': {
    borderTop: '1px dashed #CDCDCD',
    marginTop: '24px',
    paddingTop: '16px',
    paddingBottom: '16px',
    width: '100%',
  },

  strong: {
    color: theme.customColors.dark,
  },

  a: {
    color: theme.customColors.links,
    fontWeight: 'bold',
    textDecoration: 'none',
  },
}));

const FooterInfoCard = function FooterInfoCard({ isDrPage = false }) {
  const { drTs } = useTimestamps();

  const date = t('timestamps.datetime', {
    val: new Date(drTs),
    formatParams: {
      val: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
  });

  const time = t('timestamps.datetime', {
    val: new Date(drTs),
    formatParams: {
      val: { hour: 'numeric', minute: 'numeric', hour12: false },
    },
  });

  const updatedAt = `${date} ${t('timestamps.at')} ${time}`;

  return (
    <FooterInfo className={(isDrPage && 'is-dr-page') || ''}>
      {t('footer.dataSource')}:{' '}
      <a href="https://www.zzzs.si" target="_blank" rel="noreferrer">
        ZZZS
      </a>
      ,{' '}
      <a
        href="https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/"
        target="_blank"
        rel="noreferrer"
      >
        GURS
      </a>
      <br />
      {t('footer.lastChange')}: <strong>{updatedAt}</strong>.
      <br />© 2021-{new Date().getFullYear()} <strong>Sledilnik.org</strong>
    </FooterInfo>
  );
};

FooterInfoCard.defaultProps = {
  isDrPage: false,
};

FooterInfoCard.propTypes = {
  isDrPage: PropTypes.bool,
};

export default FooterInfoCard;
