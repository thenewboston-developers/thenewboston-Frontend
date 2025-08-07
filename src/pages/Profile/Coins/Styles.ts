import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export const WalletsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
