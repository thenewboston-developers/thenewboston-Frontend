import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  position: absolute;
  right: 0;
  transition: all 0.15s;

  &:hover {
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
  }
`;
