import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';
import * as SEO from '@/components/SEO';
import { Loader } from '@/components/Shared';
import * as Styled from '../styles/Markdown';
import Section from './Section';
import FooterInfoCard from '../../components/Shared/FooterInfo';

const baseUrl = import.meta.env.VITE_REACT_APP_CONTENT_ENDPOINT_BASE;

console.log('baseUrl', baseUrl);

const Faq = function Faq() {
  const { lng } = useParams();
  const faqRef = useRef();
  const [response, setResponse] = useState();

  // fetch data
  useEffect(() => {
    fetch(`${baseUrl}/faq/3/?lang=${lng}`)
      .then(r => r.json())
      .then(json => {
        setResponse(json);
      });
  }, [lng]);

  useEffect(() => {
    if (faqRef.current) {
      // append 'data-definition' attribute with glossary definition to each element with attribute 'data-term'
      faqRef.current.querySelectorAll('span[data-term]').forEach(el => {
        // eslint-disable-next-line no-restricted-syntax
        for (const term of response.glossary) {
          if (term.slug === el.getAttribute('data-term')) {
            // TODO: is it possible to render term.definition as Markdown text?
            el.setAttribute('data-definition', term.definition.replace(/<[^>]*>?/gm, ''));
            el.setAttribute('tabindex', 0);
          }
        }
      });
      // append attribute target="_blank" to all external links
      if (faqRef.current) {
        faqRef.current.querySelectorAll('a').forEach(el => {
          if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
            el.setAttribute('target', '_blank');
          }
        });
      }
    }
  }, [faqRef, response]);

  if (response == null) {
    return <Loader.Center />;
  }

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.faq')} lang={lng} />
      <Styled.CustomContainer className="custom-container">
        <Styled.StaticPageWrapper className="static-page-wrapper" ref={faqRef}>
          <h1>{t('faq.title')}</h1>
          <p>{t('faq.description')}</p>
          <br />
          <Section data={response?.faq ?? []} />
          <h2>{t('faq.glossary')}</h2>
          <Section data={response?.glossary ?? []} />
        </Styled.StaticPageWrapper>
      </Styled.CustomContainer>
      <FooterInfoCard isDrPage />
    </>
  );
};

export default Faq;
