import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

const Modal = ({ modalImageUrl, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!modalImageUrl) {
    return null;
  }

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={modalImageUrl} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
