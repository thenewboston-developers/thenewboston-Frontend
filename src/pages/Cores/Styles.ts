import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);
  padding: 24px 16px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div``;
