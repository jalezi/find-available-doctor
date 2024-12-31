import i18n, { t } from 'i18next';

import Filters from '@/components/Filters';
import Doctors from '@/components/Doctors';
import { Loader } from '@/components/Shared';
import * as SEO from '@/components/SEO';

import { doctorsContext } from '@/context';

import { DOCTORS } from '@/const';
import { useState } from 'react';
import * as Styled from './styles/Home';

const defaultLang = import.meta.env.VITE_REACT_APP_DEFAULT_LANGUAGE;

const Home = function Home() {
  const lng = i18n.language;
  const [show, setShow] = useState('map');
  const { isFetching, errors } = doctorsContext.useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  if (hasError) {
    return <div>{t('pageNotFound.somethingWentWrong')}</div>;
  }

  const useShow = () => [show, setShow];

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.home')} lang={lng ?? defaultLang} />
      {isFetching && !hasError ? (
        <Loader.Center component="main" />
      ) : (
        <Styled.Main id="main-content" component="main" key={lng}>
          <Filters useShow={useShow} />
          <Styled.Box>
            <Doctors itemsPerPage={DOCTORS.PER_PAGE} useShow={useShow} />
          </Styled.Box>
        </Styled.Main>
      )}
    </>
  );
};

export default Home;
