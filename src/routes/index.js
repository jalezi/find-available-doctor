import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Loader } from 'components/Shared';
import { HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';
import i18n from 'i18next';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Faq = lazy(() => import('../pages/Faq'));
const Doctor = lazy(() => import('../pages/Doctor'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const Analytics = lazy(() => import('../pages/Analytics'));

const IsWrongLanguage = function IsWrongLanguage({ isValidLanguage, Component }) {
  const { pathname } = useLocation();
  const splittedPath = pathname.split('/');

  // stupid hack to fix the issue with not active links if pathname doesn't end with "/"
  if (splittedPath.length === 2) {
    return <Navigate to={`/${i18n.language}/`} />;
  }

  return isValidLanguage ? (
    <Suspense fallback={<Loader.Center />}>
      <Component />
    </Suspense>
  ) : (
    <Suspense>
      <PageNotFound />
    </Suspense>
  );
};

IsWrongLanguage.propTypes = {
  isValidLanguage: PropTypes.bool.isRequired,
  Component: PropTypes.elementType.isRequired,
};

const Router = function Router() {
  const { pathname } = useLocation();

  const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE;
  const currentLanguage = i18n.language ?? defaultLanguage;

  const pathnameLocale = pathname.split('/')?.[1].toLocaleLowerCase();

  const supportedLanguages = i18n.languages;
  const isValidLanguage = supportedLanguages.includes(pathnameLocale);

  const langPath = isValidLanguage ? pathnameLocale : currentLanguage;

  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Navigate replace to={`/${langPath}/`} />} />
        <Route path="/faq" element={<Navigate replace to={`/${langPath}/faq/`} />} />
        <Route path="/about" element={<Navigate replace to={`/${langPath}/about/`} />} />
        <Route
          path="/:lng"
          element={
            <IsWrongLanguage isValidLanguage={isValidLanguage} lng={langPath} Component={Home} />
          }
        />
        <Route
          path="/:lng/about"
          element={
            <IsWrongLanguage isValidLanguage={isValidLanguage} lng={langPath} Component={About} />
          }
        />
        <Route
          path="/:lng/analytics"
          element={
            <IsWrongLanguage
              isValidLanguage={isValidLanguage}
              lng={langPath}
              Component={Analytics}
            />
          }
        />
        <Route
          path="/:lng/faq"
          element={
            <IsWrongLanguage isValidLanguage={isValidLanguage} lng={langPath} Component={Faq} />
          }
        />
        <Route
          path="/:lng/:type/:name/:instId"
          element={
            <IsWrongLanguage isValidLanguage={isValidLanguage} lng={langPath} Component={Doctor} />
          }
        />
        <Route
          path="/:lng/404"
          element={
            <Suspense fallback={<Loader.Center />}>
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader.Center />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </HelmetProvider>
  );
};

export default Router;
