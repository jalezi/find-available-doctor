/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { lazy, useLayoutEffect } from 'react';
import { useParams } from 'react-router';

import { cx } from 'class-variance-authority';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './highcharts-options';

import styles from './Analytics.module.css';
import stylesLayout from './Layout.module.css';

import TouchdeviceNotification from './components/TouchDeviceNotification';
import { createChartDataProxy } from './data/create-chart-data-proxy';
import { SECTIONS } from './data/sections';

import { Card, CardHeader } from './components/ui/card';

const ChartCard = lazy(() => import('./Cards/ChartCard'));
const MapCard = lazy(() => import('./Cards/MapCard'));
const RichInfoClick = lazy(() => import('./Cards/RichInfoClick'));
const DataByYearAndAgeGroupCard = lazy(() => import('./Cards/DataByYearAndAgeGroupCard'));
const DashboardCard = lazy(() => import('./Cards/DashboardCard'));
const MotionCard = lazy(() => import('./Cards/MotionCard'));
const InsuredByDefinitionAndByAgeGroup = lazy(() => import('./Cards/prod/TaskC'));
const PivotkeD = lazy(() => import('./Cards/prod/TaskD'));
const TaskA = lazy(() => import('./Cards/prod/TaskA'));

const CARDS = {
  PivotkeD,
  MotionCard,
  ChartCard,
  MapCard,
  RichInfoClick,
  DataByYearAndAgeGroupCard,
  DashboardCard,
  InsuredByDefinitionAndByAgeGroup,
  TaskA,
};

const Analytics = function Analytics() {
  const { lng } = useParams();

  /**
   * TODO fix the fakeHeight hack
   * HACK to remove fakeHeight from article wrappers; this is a temporary solution util we figure out a better way to handle fake heights;
   * The charts are loaded in a lazy way and the fakeHeight is used to prevent layout shift when the chart is loaded;
   * The problem that I want to solve is that the fakeHeight is different for different viewports and the layout shift is still happening;
   * Also I want to have correct scrolling position before chart is loaded.
   * The fakeHeight is removed after the chart is loaded to prevent not consisant space between cards.
   *
   * I might try to wrap only the charts in the RenderOnViewportEntry component and not the whole card.
   */
  useLayoutEffect(() => {
    const articleWrappers = document.querySelectorAll('[data-card-id');
    articleWrappers.forEach(articleWrapper => {
      const article = articleWrapper.querySelector('article');
      if (article) {
        articleWrapper.style = undefined;
      }
    });
  }, []);

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <TouchdeviceNotification />
      <main id="main-content" className={cx(styles.Analytics)}>
        <Sidebar />
        <div className={cx(stylesLayout.Layout, styles.PageContent)}>
          {SECTIONS.map(section => (
            <section
              key={section.sectionTitle}
              className={styles.ChartSection}
              aria-label={section.sectionTitle}
            >
              <h2 className={styles.SectionTitle}>
                {section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)}
              </h2>
              {section.charts.map(chart => {
                const Component = CARDS[chart.componentName];
                const chartProxy = createChartDataProxy(chart);

                return (
                  <div
                    key={chartProxy.id}
                    data-card-id={chartProxy.id}
                    style={{ minHeight: chart.fakeHeight }}
                  >
                    <RenderOnViewportEntry
                      id={`render-on-viewport-entry-${chartProxy.id}`}
                      intersectionObserverInit={{ threshold: 0, rootMargin: '0px 0px 100px 0px' }}
                      srOnlyComponentsBeforeEntered={
                        <Card id={chartProxy.id}>
                          <CardHeader>
                            <div>
                              <h3>{chartProxy.options.title?.text}</h3>
                              <p>{chartProxy.options.subtitle?.text}</p>
                            </div>
                          </CardHeader>
                        </Card>
                      }
                    >
                      <Component id={chartProxy.id} options={chartProxy.options} />
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
