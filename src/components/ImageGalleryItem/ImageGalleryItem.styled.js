import { styled } from 'styled-components';

export const GalleryItem = styled.li`
  width: 360px;
  border-radius: 8px;
  overflow: hidden;

  transition: scale 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    scale: 1.05;
  }
`;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: scale 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    scale: 1.3;
  }
`;
