import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButtonBase from '@mui/material/IconButton';
import MuiStack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar/AppBar';

export { Autocomplete, Popper } from './Autocomplete';
export const StackLarge = styled(MuiStack)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    '& > :not(*:first-of-type)': { marginLeft: theme.spacing(3) },
  },
  '@media print': {
    display: 'none',
  },
}));
export const StackSmall = styled(MuiStack)(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(1),
  '& > *': {
    width: 'min-content',
    minHeight: 'unset',
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const StackSocialLarge = styled(MuiStack)(({ theme }) => ({
  display: 'none',
  svg: {
    height: '24px',
    width: '24px',
    fill: aTheme => aTheme.customColors.link,
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(1),
    marginBlock: 0,
  },
  '@media print': {
    display: 'none',
  },
}));
export const StackSocialSmall = styled(MuiStack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: theme.spacing(3),
  marginTop: 'auto',
  marginBottom: theme.spacing(2),
  svg: {
    height: '1rem',
    width: '1rem',
    fill: aTheme => aTheme.customColors.link,
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const NavMenuItemLink = styled(MenuItem)(({ theme }) => ({
  color: theme.customColors.link,
  fontFamily: '"IBM Plex Sans", sans-serif !important',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: 0,
  position: 'relative',
  padding: 0,
  lineHeight: '30px',
  transition: 'all 0.5s ease',
  outline: 'none',
  '&:focus, :hover': {
    backgroundColor: 'transparent',
    boxShadow: `inset 0px -10px 0 ${theme.customColors.background}`,
    color: theme.customColors.dark,
    opacity: 1,
  },
  '&.active': {
    backgroundColor: 'transparent',
    boxShadow: 'inset 0px -10px 0 rgba(255,255,255,1)',
    color: theme.customColors.dark,
    opacity: 1,
  },
}));

export const NavMenuLink = styled(NavLink)(({ theme }) => ({
  color: theme.customColors.link,
  fontFamily: '"IBM Plex Sans", sans-serif !important',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: 0,
  position: 'relative',
  padding: 0,
  lineHeight: '30px',
  transition: 'all 0.5s ease',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  outline: 'none',
  '&:focus, :hover': {
    backgroundColor: 'transparent',
    boxShadow: `inset 0px -10px 0 ${theme.customColors.background}`,
    color: theme.customColors.dark,
    opacity: 1,
  },
  '&.active': {
    backgroundColor: 'transparent',
    boxShadow: 'inset 0px -10px 0 rgba(255,255,255,1)',
    color: theme.customColors.dark,
    opacity: 1,
  },
}));

export const IconButton = styled(IconButtonBase)(() => ({
  opacity: 0.56,
  padding: '5px',
  '&:focus, :hover': {
    opacity: 1,
  },
}));

export const AppNavBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
  zIndex: 11,
  position: 'sticky',
  backgroundColor: theme.customColors.brand,
  color: theme.customColors.dark,
  boxShadow: 'none',

  [theme.breakpoints.down('md')]: {
    boxShadow: '0 3px 10px 0 rgba(58,83,87,0.24)',
  },
  '@media print': {
    boxShadow: 'none',
    '#hamburger': {
      display: 'none',
    },
  },
}));
