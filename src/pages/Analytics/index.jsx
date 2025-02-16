import { lazy } from 'react';
import { useParams } from 'react-router';

import { cx } from 'class-variance-authority';
import { t } from 'i18next';
import './highcharts-options';

import * as SEO from 'components/SEO';

import { CircularProgress } from '@mui/material';
import Footer from './components/Footer';
import RenderOnViewportEntry from './components/RenderOnViewportEntry';
import TouchdeviceNotification from './components/TouchDeviceNotification';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { SECTIONS, sectionTranslationKeys } from './data/sections';
import { createCardDataProxy } from './utils/create-card-data-proxy';

import styles from './styles/Analytics.module.css';
import stylesLayout from './styles/Layout.module.css';
import Sidebar from './components/Sidebar';

const TaskD = lazy(() => import('./Cards/TaskD'));
const TaskA = lazy(() => import('./Cards/TaskA'));
const TaskSpecial = lazy(() => import('./Cards/TaskSpecial'));
const TaskATrend = lazy(() => import('./Cards/TaskATrend'));

const CARDS = {
  TaskD,
  TaskA,
  TaskATrend,
  TaskSpecial,
};

// TODO move RenderOnViewPortEntry to Components; If we move to Components there will be no need for srOnlyComponentsBeforeEntered

const Analytics = function Analytics() {
  const { lng } = useParams();

  const sections = SECTIONS.map(section => ({
    ...section,
    sectionTitle: t(sectionTranslationKeys[section.sectionTitle]),
  }));

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <TouchdeviceNotification />
      <Sidebar />
      <main id="main-content" className={cx(styles.Analytics)}>
        <div className={cx(stylesLayout.Layout, styles.PageContent)}>
          {sections.map(section => (
            <section
              key={section.sectionTitle}
              className={styles.ChartSection}
              aria-label={section.sectionTitle}
            >
              <h2 className={styles.SectionTitle}>
                {section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)}
              </h2>
              {section.cards.map(card => {
                const Component = CARDS[card.componentName];
                const title = t(card.titleTranslationKey);

                const chartProxy = createCardDataProxy({ ...card, title });

                return (
                  <div key={chartProxy.id}>
                    <RenderOnViewportEntry
                      id={`render-on-viewport-entry-${chartProxy.id}`}
                      intersectionObserverInit={{ threshold: 0, rootMargin: '0px 0px 100px 0px' }}
                      srOnlyComponentsBeforeEntered={
                        <Card
                          id={chartProxy.id}
                          style={{
                            display: 'grid',
                            gridTemplateRows: 'auto 1fr',
                            height: card.fakeHeight,
                          }}
                        >
                          <CardHeader>
                            <div>
                              <h3>{title}</h3>
                            </div>
                          </CardHeader>
                          <CardContent style={{ display: 'grid', placeItems: 'center' }}>
                            <CircularProgress />
                          </CardContent>
                        </Card>
                      }
                    >
                      <Component id={chartProxy.id} />
                    </RenderOnViewportEntry>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </main>
      <Footer lng={lng} />
    </>
  );
};

export default Analytics;
