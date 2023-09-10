import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from 'api/api';
import { GlobalStyle } from 'GlobalStyles';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const PER_PAGE = 12;

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [largeImageData, setLargeImageData] = useState({
    largeImageURL: '',
    tags: '',
  });
  const [isLoader, setIsLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const formatQuery = useCallback(() => {
    const index = query.indexOf('/');
    if (index >= 0) {
      return query.slice(index + 1);
    }
    return query;
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();

    if (searchQuery === '') {
      toast.error('Please enter a valid query', {
        duration: 3000,
      });
      return;
    }

    setQuery(`${Date.now()}/${searchQuery}`);
    setImages([]);
    setPage(1);
    setLargeImageData({
      largeImageURL: '',
      tags: '',
    });
    setIsLoader(false);
    setIsModal(false);
    setHasFetchedData(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    setTimeout(() => {
      window.scrollBy({ top: 800, behavior: 'smooth' });
    }, 1000);

    if (images.length + PER_PAGE >= totalImages) {
      toast.error(
        `We are sorry, but you have reached the end of the search results`,
        {
          duration: 3000,
        }
      );
    }
  };

  const handleModalOpen = largeImage => {
    setLargeImageData(largeImage);
    setIsModal(true);
  };

  const handleModalClose = () => {
    setLargeImageData({
      largeImageURL: '',
      tags: '',
    });
    setIsModal(false);
  };

  const fetchData = async () => {
    if (query === '' || page === 0) {
      return;
    }

    setIsLoader(true);

    try {
      const data = await fetchImages(formatQuery(), page, PER_PAGE);

      if (!data.totalHits) {
        setTotalImages(null);
        toast.error(
          `There are no ${formatQuery()} images. Please enter another keyword`,
          {
            duration: 3000,
          }
        );
      } else {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);

        if (!hasFetchedData) {
          toast.success(`Hurray! we found ${data.totalHits} images for you!`, {
            duration: 3000,
          });
          setHasFetchedData(true);
        }
      }
    } catch (error) {
      toast.error('Something went wrong!', {
        duration: 3000,
      });
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={handleModalOpen} />
      )}
      {images.length > 0 &&
        images.length < totalImages &&
        totalImages &&
        images &&
        !isLoader && <Button onClick={handleLoadMore} />}
      {isLoader && <Loader />}
      {isModal && (
        <Modal
          image={largeImageData}
          onClose={handleModalClose}
          isOpen={isModal}
        />
      )}
      <Toaster
        gutter={4}
        containerStyle={{
          top: 0,
        }}
        toastOptions={{
          success: {
            style: {
              minWidth: '280px',
              height: '56px',
              color: 'white',
              background: '#0093dc',
            },
          },
          error: {
            style: {
              minWidth: '280px',
              height: '58px',
              background: '#ffd500',
            },
          },
        }}
      />
      <GlobalStyle />
    </div>
  );
};
