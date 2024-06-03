import styled from 'styled-components';

import {breakpoints} from 'styles';

export const CardsContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  padding: 24px 32px;
`;

export const CodeContainer = styled.div`
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 24px 32px;
`;

export const ListContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ListItem = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const ListLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  padding-top: 5px;
  width: 100%;
`;

export const RoleNumber = styled.div`
  align-items: center;
  background-color: #064d8d;
  border-radius: 50%;
  color: white;
  display: flex;
  height: 30px;
  justify-content: center;
  position: relative;
  width: 30px;
  z-index: 1;
`;

export const ContentTitle = styled.div`
  font-size: 50;
  font-weight: bold;
  margin-left: 20px;
`;

export const ContentDetail = styled.div`
  margin-left: 25px;
`;

export const Detail = styled.div`
  font-size: 17px;
  margin-left: 25px;
`;

export const Line = styled.div`
  background: repeating-linear-gradient(to bottom, transparent, transparent 5px, #007bff 5px, #007bff 10px);
  height: 90%;
  left: 15px;
  position: absolute;
  top: 30px;
  width: 2px;
  z-index: 0;
`;

export const Code = styled.pre`
  background-color: white;
  border-radius: 10px;
  font-size: 15px;
  padding: 15px;
`;

export const Img = styled.img`
  height: 40px;
  width: 40px;
`;

export const Span = styled.span`
  color: 'red',
  fontWeight: 'bold',
`;
