import { useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, TextField, Toolbar } from '@mui/material';
import * as Icons from 'components/Shared/Icons';
import { useTranslation } from 'react-i18next';
import { useFilter } from 'context/filterContext';
import { languages } from 'i18n';

import TemporaryDrawer from './Drawer';
import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';
import * as Styled from './styles';
import Popper from './Popper';

const Header = function Header() {
  const { doctorType, setDoctorType, accept, setAccept, searchValue, setSearchValue } = useFilter();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  const eventHandler = event => {
    const { target } = event;
    const navLinks = ref.current?.children;

    const [active] = [...navLinks].filter(link => link.classList.contains('active'));
    if (active && target?.id && active !== target) {
      active.classList.remove('active');
      target.classList.add('active');
    }

    if (!target.id) {
      target.blur();
    }
  };

  const handleHamburger = () => setOpen(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLocale = (e, newValue) => {
    e.preventDefault();
    const lang = newValue?.code;
    changeLanguage(lang);
    navigate(`/${lang}/${location.pathname.substring(4)}`);
  };

  const goHome = event => {
    event.preventDefault();
    if (doctorType !== 'gp') setDoctorType('gp');
    if (accept !== 'vsi') setAccept('vsi');
    if (searchValue) setSearchValue('');
    navigate(`/${language}/`);
  };

  return (
    <Styled.AppNavBar>
      <Toolbar
        sx={{
          'a.logo': {
            height: '40px',
          },
        }}
      >
        <NavLink to={`/${language}/`} className="logo" onClick={goHome}>
          <Icons.Icon name="Logo" style={{ height: '40px' }} />
        </NavLink>
        <Styled.StackLarge ref={ref} id="nav-links" onClick={eventHandler}>
          <NavLinks containerId="nav-links" />
        </Styled.StackLarge>
        <Styled.StackSocialLarge>
          <SocialLinks />
        </Styled.StackSocialLarge>
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{
            mr: 2,
            marginInline: 'auto 0',
            display: { xs: 'inline-flex', md: 'none' },
          }}
          onClick={handleHamburger}
        >
          <Icons.MenuIcon />
        </IconButton>
        <Styled.Autocomplete
          id="language-switcher"
          size="small"
          sx={{
            pl: 2,
            width: 80,
            display: { xs: 'none', md: 'flex' },
          }}
          options={languages}
          disableClearable
          value={languages.find(l => l.code === language)}
          getOptionLabel={option => {
            const code = option?.code;
            return typeof code === 'undefined' ? '' : code.toUpperCase();
          }}
          onChange={handleChangeLocale}
          renderOption={(props, option) => {
            const { name } = option;
            return (
              <span style={{ display: 'flex', justifyContent: 'end' }} {...props}>
                {name}
              </span>
            );
          }}
          renderInput={params => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          disablePortal // not sure if needed
          PopperComponent={Popper}
        />
      </Toolbar>
      <TemporaryDrawer open={open} setOpen={setOpen} />
    </Styled.AppNavBar>
  );
};

export default Header;
