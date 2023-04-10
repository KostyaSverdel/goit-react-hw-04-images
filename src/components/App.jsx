import { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from '../components/App.module.css';

const API_KEY = '33346847-49a68cc77b2127185fe21774e';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const fetchImages = useCallback(() => {
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    setIsLoading(true);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setImages(prevImages => {
          const newImages = data.hits.filter(
            hit => !prevImages.find(img => img.id === hit.id)
          );
          return [...prevImages, ...newImages];
        });
      })
      .catch(error => {
        console.error('Error fetching images', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onChangeQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const openModal = imageUrl => {
    setIsModalOpen(true);
    setModalImageUrl(imageUrl);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl('');
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onChangeQuery} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {isLoading && <Loader />}

      {shouldRenderLoadMoreButton && <Button onClick={handleLoadMore} />}

      {isModalOpen && (
        <Modal onClose={closeModal} modalImageUrl={modalImageUrl} alt="">
          <img src={modalImageUrl} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
