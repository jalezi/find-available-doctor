/* eslint-disable react/prop-types */

import { cx } from 'class-variance-authority';
import { t } from 'i18next';

import * as Icons from 'components/Shared/Icons';

import styles from './Footer.module.css';

import stylesLayout from '../../styles/Layout.module.css';

/**
 * Footer component for the Analytics page.
 *
 * This component renders the footer section which includes:
 * - The Sledilnik logo.
 * - Navigation links to different sections of the site.
 * - Links to other projects.
 * - Social media links.
 * - Contact information and copyright notice.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.lng - The language code for the links.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = function Footer({ lng }) {
  const tHeader = t('header', { returnObjects: true });
  const tFooter = t('analytics.footer', { returnObjects: true });
  return (
    <footer className={cx(stylesLayout.Layout, styles.Footer)}>
      <div className={cx(stylesLayout.FullContent, styles.FooterTopContainer)}>
        <div className={styles.FooterContent}>
          <Icons.Icon id="zdravniki-sledilnik-logo-footer" name="Logo" className={styles.Logo} />
        </div>
        <div className={styles.FooterContent}>
          <h2>{t('SEO.title.home')}</h2>
          <nav aria-label="zdravniki">
            <a href={`/${lng}/`}>{tHeader.home}</a>
            <a href={`/${lng}/faq/`}>{tHeader.faq}</a>
            <a href={`/${lng}/about/`}>{tHeader.about}</a>
            <a href={`/${lng}/analytics`}>{tHeader.analytics}</a>
          </nav>
        </div>
        <div className={styles.FooterContent}>
          <h2>{t('footer.ourProjects')}</h2>
          <nav aria-label="our projects">
            <a href={`https://covid-19.sledilnik.org/${lng}/`} target="_blank" rel="noreferrer">
              Covid-19 Sledilnik
            </a>
            <a href={`https://zdravniki.sledilnik.org/${lng}/`} target="_blank" rel="noreferrer">
              {tFooter.doctors}
            </a>
          </nav>
        </div>
        <div className={styles.FooterContent}>
          <h2>{t('footer.links')}</h2>
          <nav aria-label="social links">
            <a href="https://www.facebook.com/Sledilnik" target="_blank" rel="noreferrer">
              <Icons.Icon name="Facebook" className={styles.Icon} />
              Facebook
            </a>
            <a href="https://x.com/sledilnik" target="_blank" rel="noreferrer">
              <Icons.Icon name="Twitter" className={styles.Icon} />X
            </a>
            <a href="https://github.com/sledilnik" target="_blank" rel="noreferrer">
              <Icons.Icon name="GitHub" className={styles.Icon} />
              GitHub
            </a>
            <a
              href={`https://covid-19.sledilnik.org/${lng}/donate`}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.Icon name="Euro" className={styles.Icon} /> {tHeader.support}
            </a>
          </nav>
        </div>
      </div>
      <div className={cx(stylesLayout.FullContent, styles.SledilnikInfo)}>
        <div className={styles.SledilnikContent}>
          <div>
            © 2021-{new Date().getFullYear()} <strong>Sledilnik.org</strong>
          </div>
          <div>
            <a href="mailto:info@sledilnik.org">info@sledilnik.org</a>
            <a href="https://sledilnik.org" target="_blank" rel="noreferrer">
              sledilnik.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
