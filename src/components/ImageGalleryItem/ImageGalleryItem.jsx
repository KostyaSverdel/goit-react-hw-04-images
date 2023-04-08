import React from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick }) => {
  const handleClick = () => {
    onClick(src);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleClick}>
      <img className={css.ImageGalleryItemImage} src={src} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
