import styles from '../styles/Layout.module.css';

const LayoutVisualizer = function LayoutVisualizer() {
  return (
    <div className={styles.Layout}>
      <div className={styles.Full} style={{ background: 'rgba(255, 0, 0, 1)' }}>
        FULL
      </div>
      <div className={styles.FullStart} style={{ background: 'rgba(255, 0, 0, 0.8)' }}>
        FULL START
      </div>
      <div className={styles.FullEnd} style={{ background: 'rgba(255, 0, 0, 0.6)' }}>
        FULL END
      </div>
      <div className={styles.Popout} style={{ background: 'rgba(255, 255, 0, 1)' }}>
        POPUT
      </div>
      <div className={styles.PopoutStart} style={{ background: 'rgba(255, 255, 0, 0.8)' }}>
        POPUT START
      </div>
      <div className={styles.PopoutEnd} style={{ background: 'rgba(255, 255, 0, 0.6)' }}>
        POPUT END
      </div>
      <div className={styles.Content} style={{ background: 'rgba(0, 255, 0, 1)' }}>
        CONTENT
      </div>
      <div className={styles.ContentStart} style={{ background: 'rgba(0, 255, 0, 0.8)' }}>
        CONTENT START
      </div>
      <div className={styles.ContentEnd} style={{ background: 'rgba(0, 255, 0, 0.6)' }}>
        CONTENT END
      </div>

      <div className={styles.Narrow} style={{ background: 'rgba(0, 255, 255, 1)' }}>
        NARROW
      </div>
      <div
        className={styles.NarrowStart}
        style={{ background: 'rgba(0, 255, 255, 0.8)', display: 'grid' }}
      >
        NARROW START
      </div>
      <div
        className={styles.NarrowEnd}
        style={{ background: 'rgba(0, 255, 255, 0.6)', display: 'grid' }}
      >
        NARROW END
      </div>
      <div className={styles.FullWidth} style={{ background: 'rgba(0, 0, 255, 1)' }}>
        FULL WIDTH
      </div>
      <div className={styles.FullContent} style={{ background: 'rgba(0, 0, 255, 0.8)' }}>
        FULL CONTENT
      </div>
      <div
        className={styles.FullContentNoPad}
        style={{
          background: 'rgba(0, 0, 255, 0.6)',
        }}
      >
        FULL CONTENT NO PAD
      </div>
    </div>
  );
};

export default LayoutVisualizer;
