import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <GalleryItem key={id} onClick={() => openModal({ largeImageURL, tags })}>
      <GalleryImage src={webformatURL} alt={tags} />
    </GalleryItem>
  ));
};
