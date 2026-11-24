import styled from 'styled-components';

export const Button = styled.button`
  align-items: center;
  background: #f1f4f8;
  border: 1px solid #d4deea;
  border-radius: 12px;
  color: #243b53;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  min-height: 40px;
  padding: 8px 12px;
  transition: background 150ms;
  white-space: nowrap;

  &:hover {
    filter: brightness(0.93);
  }

  &:focus-visible {
    outline: 3px solid #587db5;
    outline-offset: 3px;
  }
`;
