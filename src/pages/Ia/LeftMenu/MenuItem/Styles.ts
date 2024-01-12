import styled from 'styled-components';

export const Container = styled.div<{$isActive: boolean}>`
  background: ${({$isActive}) => ($isActive ? 'rgba(208, 215, 222, 0.32)' : 'transparent')};
  display: flex;
  padding: 8px 12px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;
