import { styled } from 'styled-components';

export const LoadMoreBtn = styled.button`
  margin: 0 auto 24px;
  padding: 0 0 0 12px;

  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 12px;

  height: 32px;

  border: none;
  border-radius: 16px;

  background-color: #ffd500;

  overflow: hidden;

  cursor: pointer;
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    padding: 6px;

    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: white;
    background-color: #3fbfff;

    transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
      rotate 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background-color: #ffc800;
  }

  &:hover svg {
    rotate: 180deg;
    background-color: #00aaff;
  }
`;
