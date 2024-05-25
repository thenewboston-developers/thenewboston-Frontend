import styled from 'styled-components';

import {breakpoints} from 'styles';

export const CardsContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  padding: 24px 32px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const RoleNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  margin-left: 20px;
`;

export const Line = styled.div`
  position: absolute;
  left: 20px;
  width: 2px;
  height: calc(100% - 20px);
  background: repeating-linear-gradient(to bottom, transparent, transparent 5px, #007bff 5px, #007bff 10px);
  z-index: 0;
`;
