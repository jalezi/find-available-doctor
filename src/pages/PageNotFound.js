import i18n, { t } from 'i18next';
import * as SEO from '@/components/SEO';
import * as Styled from './styles/PageNotFound';
import image from '../assets/doctor-404.png';
import image2x from '../assets/doctor-404@2x.png';

const PageNotFound = function PageNotFound() {
  const currentLanguage = i18n.language;

  const meta = [{ name: 'robots', content: 'noindex' }];

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.notFound')} meta={meta} lang={currentLanguage} />
      <Styled.CustomContainer id="main-content">
        <Styled.PageNotFound>
          <h1>{t('SEO.title.notFound')}</h1>
          <p>{t('pageNotFound.somethingWentWrong')}</p>
          <Styled.Image
            src={image}
            srcSet={`${image2x} 2x`}
            alt={t('pageNotFound.imageDescription')}
          />
          <Styled.BackToHomeBtn to={`/${currentLanguage}/`} end>
            {t('header.home')}
          </Styled.BackToHomeBtn>
        </Styled.PageNotFound>
      </Styled.CustomContainer>
    </>
  );
};

export default PageNotFound;
