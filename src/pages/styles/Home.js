import MuiBox from '@mui/material/Box';
import { darken, styled } from '@mui/material/styles';

import { SIZES } from '@/const';

export const Main = styled(MuiBox)(() => ({
  '@media print': {
    marginTop: '88px',
  },
}));

export const Box = styled(MuiBox)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  '& .leaflet-container': {
    height: SIZES.MAP_HEIGHT.default,
  },
  '.marker-cluster-small div, .marker-cluster-medium div, .marker-cluster-large div': {
    backgroundColor: 'inherit',
    span: {
      backgroundColor: 'inherit',
      display: 'block',
      borderRadius: 100,
      textShadow: '0 0 3px #ffffff90',
    },
  },

  '.marker-cluster-accepts-0': {
    backgroundColor: '#d32f2f54',
    span: {
      color: darken('#d32f2f', 0.6),
    },
  },
  '.marker-cluster-accepts-25': {
    backgroundColor: '#EF741F54',
    span: {
      color: darken('#EF741F', 0.6),
    },
  },
  '.marker-cluster-accepts-50': {
    backgroundColor: '#FFA80054',
    span: {
      color: darken('#FFA800', 0.6),
    },
  },
  '.marker-cluster-accepts-75': {
    backgroundColor: '#AEB11854',
    span: {
      color: darken('#AEB118', 0.6),
    },
  },
  '.marker-cluster-accepts-100': {
    backgroundColor: '#2e7d3257',
    span: {
      color: darken('#2e7d32', 0.6),
    },
  },

  [theme.breakpoints.up('sm')]: {
    '& .leaflet-container': {
      height: SIZES.MAP_HEIGHT.upSmall,
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .leaflet-container': {
      height: SIZES.MAP_HEIGHT.upMedium,
    },
  },
}));
