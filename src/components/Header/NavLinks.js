import { useEffect, useRef } from 'react';
import i18next, { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '@/context/filterContext';
import * as Styled from './styles';
import SledilnikOrgLinks from './SledilnikOrgLinks';

const NavLinks = function NavLinks() {
  const navigate = useNavigate();
  const { doctorType, setDoctorType, accept, setAccept, searchValue, setSearchValue } = useFilter();
  const lng = i18next.language;
  const homeLinkRef = useRef();
  useEffect(() => {
    i18next.changeLanguage(lng);
  }, [lng]);

  const goHome = event => {
    event.preventDefault();
    if (doctorType !== 'gp') setDoctorType('gp');
    if (accept !== 'vsi') setAccept('vsi');
    if (searchValue) setSearchValue('');
    navigate(`/${lng}/`);
  };

  return (
    <>
      <Styled.NavMenuLink ref={homeLinkRef} to={`/${lng}/`} end onClick={goHome}>
        {t('header.home')}
      </Styled.NavMenuLink>

      <Styled.NavMenuLink to={`/${lng}/faq`}>{t('header.faq')}</Styled.NavMenuLink>
      <Styled.NavMenuLink to={`/${lng}/about`}>{t('header.about')}</Styled.NavMenuLink>
      <SledilnikOrgLinks />
    </>
  );
};

export default NavLinks;
