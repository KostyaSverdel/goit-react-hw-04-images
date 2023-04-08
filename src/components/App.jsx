import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from '../components/App.module.css';

const API_KEY = '33346847-49a68cc77b2127185fe21774e';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  useEffect(() => {
    if (query !== '') {
      fetchImages();
    } // eslint-disable-next-line
  }, [query, page]);

  const fetchImages = () => {
    setIsLoading(true);
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newImages = data.hits.filter(
          hit => !images.find(img => img.id === hit.id)
        );
        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images', error);
        setIsLoading(false);
      });
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

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
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
}

export default App;
