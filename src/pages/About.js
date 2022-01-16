import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import enAbout from 'content/en/about.md';
import slAbout from 'content/sl/about.md';
import * as SEO from 'components/SEO';
import * as Styled from './styles/Markdown';
import FooterInfoCard from '../components/Shared/FooterInfo';

const MD = {
  en: enAbout,
  sl: slAbout,
};

const About = function About() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [postMarkdown, setPostMarkdown] = useState('');
  const aboutRef = useRef();

  useEffect(() => {
    const theTextFile = MD?.[language] ?? slAbout;

    fetch(theTextFile)
      .then(response => response.text())
      .then(text => {
        setPostMarkdown(text);
      });
  }, [language]);

  // append attribute target="blank" to all external links
  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.querySelectorAll('a').forEach(el => {
        if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
          el.setAttribute('target', '_blank');
        }
      });
    }
  }, [aboutRef, postMarkdown]);

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.about')} lang={lng} />
      <Styled.CustomContainer id="main-content" ref={aboutRef}>
        <Styled.StaticPageWrapper>
          <span>
            <Styled.Markdown>{postMarkdown}</Styled.Markdown>
          </span>
        </Styled.StaticPageWrapper>
      </Styled.CustomContainer>
      <FooterInfoCard isDrPage />
    </>
  );
};

export default About;
