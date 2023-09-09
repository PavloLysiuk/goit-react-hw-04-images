import { Component } from 'react';
import { fetchImages } from 'api/api';
import { GlobalStyle } from 'GlobalStyles';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    perPage: 12,
    totalImages: null,
    largeImageData: {
      largeImageURL: '',
      tags: '',
    },
    isLoader: false,
    isModal: false,
    hasFetchedData: false,
  };

  formatQuery() {
    const { query } = this.state;
    const index = query.indexOf('/');
    if (index >= 0) {
      return query.slice(index + 1);
    }
    return query;
  }

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();

    if (searchQuery === '') {
      toast.error('Please enter a valid query', {
        duration: 3000,
      });
      return;
    }

    this.setState({
      query: `${Date.now()}/${e.target.elements.searchQuery.value}`,
      images: [],
      page: 1,
      largeImageData: {
        largeImageURL: '',
        tags: '',
      },
      isLoader: false,
      isModal: false,
      hasFetchedData: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    setTimeout(() => {
      window.scrollBy({ top: 800, behavior: 'smooth' });
    }, 1000);

    const { images, perPage, totalImages } = this.state;

    if (images.length + perPage >= totalImages) {
      toast.error(
        `We are sorry, but you have reached the end of the search results`,
        {
          duration: 3000,
        }
      );
    }
  };

  handleModalOpen = largeImage => {
    this.setState({ largeImageData: largeImage, isModal: true });
  };

  handleModalClose = () => {
    this.setState({ largeImage: '', isModal: false });
  };

  async componentDidUpdate(_, prevState) {
    const { page, perPage, query, hasFetchedData } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoader: true });

      try {
        const data = await fetchImages(this.formatQuery(), page, perPage);

        if (!data.totalHits) {
          this.setState({ totalImages: null });
          toast.error(
            `There are no ${this.formatQuery()} images. Please enter another keyword`,
            {
              duration: 3000,
            }
          );
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalImages: data.totalHits,
          }));

          if (!hasFetchedData) {
            toast.success(
              `Hurray! we found ${data.totalHits} images for you!`,
              {
                duration: 3000,
              }
            );

            this.setState({ hasFetchedData: true });
          }
        }
      } catch (error) {
        toast.error('Something went wrong!', {
          duration: 3000,
        });
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  render() {
    const { images, totalImages, largeImageData, isLoader, isModal } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.handleModalOpen} />
        )}
        {images.length > 0 &&
          images.length < totalImages &&
          totalImages &&
          images &&
          !isLoader && <Button onClick={this.handleLoadMore} />}
        {isLoader && <Loader />}
        {isModal && (
          <Modal
            image={largeImageData}
            onClose={this.handleModalClose}
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
  }
}
