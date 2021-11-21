import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { doctorsContext, filterContext, leafletContext } from 'context';
import Header from 'components/Header';
import Filters from 'components/Filters';
import Doctors from 'components/Doctors/';

import { Loader } from 'components/Shared';
import { Accessibility } from 'components/Shared';
import { MainScrollTop as ScrollTop } from 'components/Shared/ScrollTop';

import { styled } from '@mui/material/styles';

import { DOCTORS } from 'const';

const Main = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  backgroundColor: theme.customColors.background,
}));

function App() {
  const { isFetching, errors } = doctorsContext.useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  if (hasError) {
    return <div>Nekaj je narobe!</div>;
  }

  return (
    <>
      <Header />
      <Toolbar id="back-to-top-anchor" />
      {isFetching && !hasError ? (
        <Loader.Center />
      ) : (
        <>
          {/* <Filters /> */}
          <Main id="main-content" component="main">
            <leafletContext.LeafletProvider>
              <Doctors itemsPerPage={DOCTORS.PER_PAGE} />
            </leafletContext.LeafletProvider>
          </Main>
        </>
      )}
      <ScrollTop />
    </>
  );
}

function AppWrapper() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IBM Plex Sans', 'Roboto', 'sans-serif'].join(','),
    },
    customColors: {
      accent: '#09AFDA',
      brand: '#95C83F',
      danger: '#DC3435',
      dark: '#212529',
      lightGrey: '#CDCDCD',
      background: '#F0F0E8',
      text: 'rgba(0,0,0,.56)',
      link: 'rgba(33,37,41,0.56);',
    },
    customOpacity: {
      half: 0.56,
    },
  });
  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">Na vsebino</Accessibility.A>
      <Accessibility.H1>Najdi prostega zdravnika</Accessibility.H1>
      <doctorsContext.DoctorsProvider>
        <filterContext.FilterProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </filterContext.FilterProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default AppWrapper;
