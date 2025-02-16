/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// Modal as a separate component
import { useEffect, useRef } from 'react';

import { cx } from 'class-variance-authority';
import { t } from 'i18next';

import styles from './Modal.module.css';

/**
 * @typedef {Object} ModalCustomProps - The custom properties of the Modal component.
 * @property {boolean} modalOpen - The visibility state of the modal.
 */

/**
 * @typedef {(React.ComponentPropsWithoutRef<"dialog">  & React.AriaAttributes)} DialogProps
 */

/**
 * Modal component that manages visibility and interaction with modal content.
 * @param {(DialogProps & ModalCustomProps)} props - The properties of the Modal component.
 * @returns {React.JSX.Element} A modal component with customizable content and behavior.
 */
const Modal = function Modal({ modalOpen, className, children, ...props }) {
  /** @type {React.RefObject<HTMLDialogElement | undefined>} */
  const ref = useRef();

  useEffect(() => {
    if (modalOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [modalOpen]);

  const handleOnCancel = () => {
    props?.onCancel();
  };

  return (
    <dialog ref={ref} {...props} className={cx(styles.CustomDialog, className)}>
      {children}
      <button type="button" onClick={handleOnCancel} className={styles.CloseButton}>
        {t('analytics.common.buttons.close')}
      </button>
    </dialog>
  );
};

export default Modal;
