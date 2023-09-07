import {GalleryList} from './ImageGallery.styled'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryList>
      <ImageGalleryItem images={images} openModal={openModal} />
    </GalleryList>
  );
};
