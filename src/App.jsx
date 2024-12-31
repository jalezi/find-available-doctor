import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doctorsContext, filterContext, leafletContext, timestampsContext } from '@/context';
import { Accessibility } from '@/components/Shared';
import Header from '@/components/Header';
import i18n, { t } from 'i18next';
import { THEME } from '@/const';
import Router from '@/routes';
import { useLocation } from 'react-router';
import { supportedLanguages } from '@/i18n';

const App = function App() {
  const theme = createTheme(THEME);
  const { pathname } = useLocation();

  const defaultLanguage = import.meta.env.VITE_REACT_APP_DEFAULT_LANGUAGE;
  const currentLanguage = i18n.language;

  const pathnameLocale = pathname.split('/')?.[1].toLocaleLowerCase() ?? defaultLanguage;

  const isLang = supportedLanguages.includes(pathnameLocale);

  const shouldChangeLanguage =
    isLang && currentLanguage !== pathnameLocale && pathnameLocale.length === 2;

  if (shouldChangeLanguage) {
    i18n.changeLanguage(pathnameLocale);
  }

  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">{t('toContent')}</Accessibility.A>
      <Accessibility.H1>{t('findAvailableDoctor')}</Accessibility.H1>
      <timestampsContext.TimestampsProvider>
        <doctorsContext.DoctorsProvider>
          <leafletContext.LeafletProvider>
            <filterContext.FilterProvider>
              <ThemeProvider theme={theme}>
                <Header />
                <Router />
              </ThemeProvider>
            </filterContext.FilterProvider>
          </leafletContext.LeafletProvider>
        </doctorsContext.DoctorsProvider>
      </timestampsContext.TimestampsProvider>
    </>
  );
};

export default App;
