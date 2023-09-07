import { LoadMoreBtn } from './Button.styled';
import { TbReload } from 'react-icons/tb';

export const Button = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      <TbReload />
      Load more
    </LoadMoreBtn>
  );
};
