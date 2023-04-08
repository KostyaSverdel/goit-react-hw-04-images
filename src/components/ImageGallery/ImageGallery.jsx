import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  const handleImageClick = webformatURL => {
    onImageClick(webformatURL);
  };

  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          onClick={() => handleImageClick(webformatURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
