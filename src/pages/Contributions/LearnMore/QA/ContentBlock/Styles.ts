import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';
import {colors} from 'styles';

const QA_IMAGE_SIZE = 50;

export const Box = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  display: flex;
  flex-direction: column;
  grid-column: span 4;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: ${'1310px'}) {
    grid-column: span 6;
  }
`;

export const Text = styled.div`
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const Img = styled.img`
  height: ${QA_IMAGE_SIZE}px;
  width: ${QA_IMAGE_SIZE}px;
`;

export const DashLine = styled.img`
  width: 100%;
  min-width: 38%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  width: 100%;
`;

export const Link = styled(ULink)`
  color: ${colors.gray};
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Heading = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const Div = styled.div`
  display: flex;
  flex-grow: 1;
`;
