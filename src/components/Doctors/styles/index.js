import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { SIZES } from '@/const';
import { Card } from '@mui/material';

export const Wrapper = styled('div')(({ theme, show }) => {
  const isMap = show === 'map';
  const isCards = show === 'cards';

  // ? zIndex must change on show change otherwise map events are not working (zoom, drag)

  return {
    position: 'relative',
    scrollBehavior: 'smooth',
    backgroundColor: theme.customColors.backgroundLight,
    zIndex: 1,
    height: SIZES.MAP_HEIGHT.default,
    overflowX: 'hidden',

    '.map, .cards': {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      transition: '0.2s all ease-in',
    },

    '.map': {
      opacity: isMap ? 1 : 0,
      transform: isMap ? 'scale(1)' : 'scale(0.9)',
      zIndex: isMap ? 2 : 1,
    },

    '.cards': {
      opacity: isCards ? 1 : 0,
      zIndex: isCards ? 2 : 1,
      transform: isCards ? 'translateX(0)' : 'translateX(100%)',
    },

    [theme.breakpoints.up('sm')]: {
      height: SIZES.MAP_HEIGHT.upSmall,
    },

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gap: '0',
      gridTemplateColumns: '1fr 450px',
      height: SIZES.MAP_HEIGHT.upMedium,

      '.map, .cards': { position: 'relative', opacity: 1, zIndex: 1 },
      '.map': { transform: 'scale(1)' },
      '.cards': { transform: 'translateX(0)' },
    },
  };
});

export const ButtonWrapper = styled('div')(() => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

// some css values in WrapperInfinite are overiden with class "cards" in Wrapper
export const WrapperInfinite = styled('div')(({ theme }) => ({
  width: '100%',
  height: `${SIZES.MAP_HEIGHT.default}`,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 500,
  position: 'relative',
  boxShadow: '0 0 15px 0 rgba(0,0,0,0.18)',

  [theme.breakpoints.up('sm')]: {
    height: `${SIZES.MAP_HEIGHT.upSmall}`,
  },
  [theme.breakpoints.up('md')]: {
    height: `${SIZES.MAP_HEIGHT.upMedium}`,
  },
}));
export const InfiniteScroll = styled(BaseInfiniteScroll)(({ theme }) => ({
  marginTop: '0',
  display: 'grid',
  width: '100%',

  '> *:last-child': {
    marginBottom: theme.spacing(2),
  },
}));

export const InfoCard = styled(Card)(({ theme }) => ({
  justifySelf: 'center',
  width: '100%',
  padding: '0',
  background: 'transparent',
  boxShadow: 'none',
  position: 'relative',
  '&:hover': {
    '&:before': {
      width: '4px',
    },
  },
  '.MuiTypography-h2': {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.customColors.doctor.colors.name,
    marginBottom: theme.spacing(0),
  },
  '.MuiTypography-h3': {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: theme.customColors.doctor.colors.provider,
  },
  'address.MuiTypography-body2': {
    color: theme.customColors.doctor.colors.address,
    fontSize: '0.75rem',
    lineHeight: '0.75rem',
    fontStyle: 'normal',
  },
  '.MuiCardContent-root': {
    padding: '15px 15px 5px 15px',
  },
  '.MuiCardActions-root': {
    position: 'absolute',
    right: '0',
    bottom: '0',
  },
  '.icon--disabled': {
    svg: {
      opacity: 0.3,
    },
  },
}));

export const TotalResults = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px 24px 7px',
  borderBottom: `1px solid ${theme.customColors.borderLight}`,
  color: theme.customColors.nickel,
  fontSize: '0.75rem',
  lineHeight: '0.75rem',
}));

export const MapTotalResults = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: '800',
  top: '10px',
  right: '10px',
  padding: '5px',
  backgroundColor: 'white',
  borderRadius: '2px',
  border: '2px solid rgba(black,0.2)',
  backgroundClip: 'padding-box',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
