import {
  Wrapper,
  SearchForm,
  SearchInput,
  SearchBtn,
} from './Searchbar.styled';
import { GrFormSearch } from 'react-icons/gr';

export const Searchbar = ({onSubmit}) => {
  return (
    <Wrapper>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <SearchBtn type="submit">
          <GrFormSearch />
        </SearchBtn>
      </SearchForm>
    </Wrapper>
  );
};
