import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';

import enAbout from '@/content/en/about.md';
import slAbout from '@/content/sl/about.md';
import * as SEO from '@/components/SEO';
import * as Styled from './styles/Markdown';
import FooterInfoCard from '../components/Shared/FooterInfo';

const MD = {
  en: enAbout,
  sl: slAbout,
};

const About = function About() {
  const { lng } = useParams();
  const markdown = MD?.[lng] ?? slAbout;
  const aboutRef = useRef();

  // append attribute target="blank" to all external links
  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.querySelectorAll('a').forEach(el => {
        if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
          el.setAttribute('target', '_blank');
        }
      });
    }
  }, [aboutRef, markdown]);

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.about')} lang={lng} />
      <Styled.CustomContainer id="main-content" ref={aboutRef}>
        <Styled.StaticPageWrapper>
          <span>
            <Styled.Markdown>{markdown}</Styled.Markdown>
          </span>
        </Styled.StaticPageWrapper>
      </Styled.CustomContainer>
      <FooterInfoCard isDrPage />
    </>
  );
};

export default About;
