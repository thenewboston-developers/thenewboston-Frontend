import styled from 'styled-components';
import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  overflow: hidden;
`;

export const LastPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

export const CardsContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);

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

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 16px;
`;
export const ChartBackground = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin: 10px 0px 0px 0px;
  padding: 15px 15px 0px 15px;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
