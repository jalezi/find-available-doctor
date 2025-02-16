import { useEffect, useRef, useState } from 'react';

import { t } from 'i18next';
import Modal from '../Modal';
import styles from './TouchDeviceNotification.module.css';

const TouchdeviceNotification = function TouchDeviceNotification() {
  const [showModal, setShowModal] = useState(false);
  /** @type {React.RefObject<HTMLInputElement | undefined>} */
  const ref = useRef();
  const checkboxElement = ref.current;
  const tTouchDevice = t('analytics.touchDevice', { returnObjects: true });

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    const doNotShowTouchDeviceAlert = sessionStorage.getItem('doNotShowTouchDeviceAlert');
    if (isTouchDevice && doNotShowTouchDeviceAlert !== 'true') {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    sessionStorage.setItem('doNotShowTouchDeviceAlert', checkboxElement.checked);
    setShowModal(false);
  };

  return (
    <Modal
      modalOpen={showModal}
      onCancel={handleCloseModal}
      className={styles.TouchDeviceNotification}
    >
      <p>{tTouchDevice.text}</p>
      <label htmlFor="checkbox">
        <input ref={ref} id="checkbox" type="checkbox" />
        {tTouchDevice.checkboxLabel}
      </label>
    </Modal>
  );
};

export default TouchdeviceNotification;
