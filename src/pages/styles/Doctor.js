import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

export const Main = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '24px',

  '@media print': {
    marginTop: '88px',
  },

  a: {
    color: theme.customColors.links,
    fontWeight: 'bold',
    textDecoration: 'none',
  },
}));
