import { useEffect, useState, useRef } from 'react';
import enAbout from 'content/en/about.md';
import slAbout from 'content/sl/about.md';
import * as Styled from './styles/Markdown';

const MD = {
  en: enAbout,
  sl: slAbout,
};

const About = function About() {
  const aboutRef = useRef();
  const [postMarkdown, setPostMarkdown] = useState('');
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style = null;
    };
  }, []);

  useEffect(() => {
    const theTextFile = MD?.[lng] ?? slAbout;

    fetch(theTextFile)
      .then(response => response.text())
      .then(text => {
        setPostMarkdown(text);
      });
  }, [lng]);

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
    <Styled.CustomContainer id="main-content">
      <Styled.StaticPageWrapper ref={aboutRef}>
        <span>
          <Styled.Markdown>{postMarkdown}</Styled.Markdown>
        </span>
      </Styled.StaticPageWrapper>
    </Styled.CustomContainer>
  );
};

export default About;
