import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  top: 0;
  justify-content: center;
  padding: 12px 0;
  width: 100%;

  border-bottom: 3px solid #ffd500;
  background-color: #17b2ffe0;
`;

export const SearchForm = styled.form`
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
`;

export const SearchInput = styled.input`
  padding: 0 44px 0 12px;
  width: 280px;
  height: 32px;
  border: none;
  outline: none;
`;

export const SearchBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  padding: 4px;

  cursor: pointer;

  border: none;
  border-radius: 50%;

  background-color: #ffd500;
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    rotate 200ms cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 24px;
    height: 24px;

    path {
      stroke: black;
      stroke-width: 1.5;
    }
  }

  &:hover {
    background-color: #ffc800;
    rotate: 90deg;
  }
`;
