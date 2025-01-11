import { useMediaQuery } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

import * as Icons from 'components/Shared/Icons';
import Modal from '../Modal';

import { createChartDataProxy } from '../../data/create-chart-data-proxy';
import { SECTIONS } from '../../data/sections';
import styles from './Sidebar.module.css';

/**
 * Renders sidebar groups with section titles and chart links.
 *
 * @param {Function} [closeHandler] - The function to call when a sidebar link is clicked. Can be undefined.
 * @returns {JSX.Element[]} An array of JSX elements representing the sidebar groups.
 */
const renderSidebarGroups = closeHandler =>
  SECTIONS.map(section => (
    <div key={section.sectionTitle} className={styles.SidebarGroup}>
      <h3 className={styles.SidebarGroupTitle}>{section.sectionTitle}</h3>
      {section.charts.map(chart => {
        const chartProxy = createChartDataProxy(chart);
        return (
          <a
            key={chartProxy.id}
            href={`#${chartProxy.id}`}
            onClick={closeHandler}
            className={styles.SidebarLink}
          >
            {chartProxy.options.title.text}
          </a>
        );
      })}
    </div>
  ));

const Sidebar = function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 900px)');
  const navRef = useRef(null);

  const shouldModalBeClosed = mediaQuery && modalOpen;
  useEffect(() => {
    if (shouldModalBeClosed) {
      setModalOpen(false);
    }
    return () => setModalOpen(false); // Ensure modal is closed when component unmounts
  }, [shouldModalBeClosed]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <aside className={styles.Sidebar} name="sidebar">
      {mediaQuery ? (
        <div className={styles.SidebarDesktop}>
          <h2 className={styles.SidebarTitle}>Grafi</h2>
          <nav
            ref={navRef}
            className={styles.SidebarGroupsWrapper}
            aria-label="Chart Navbar Desktop"
          >
            {renderSidebarGroups(undefined)}
          </nav>
        </div>
      ) : (
        <div className={styles.SidebarMobile}>
          <button
            type="button"
            onClick={openModal}
            aria-label="show links to charts"
            aria-expanded={modalOpen}
          >
            <Icons.Icon name="Chart" />
          </button>
          <Modal
            className={styles.SidebarModal}
            modalOpen={modalOpen}
            onCancel={closeModal}
            aria-labelledby="go-to-graph"
          >
            <h2 id="go-to-graph" className={styles.SidebarTitle}>
              Pojdi na graf
            </h2>
            <nav
              ref={navRef}
              className={styles.SidebarGroupsWrapper}
              aria-label="Chart Navbar Mobile"
            >
              {renderSidebarGroups(closeModal)}
            </nav>
          </Modal>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
