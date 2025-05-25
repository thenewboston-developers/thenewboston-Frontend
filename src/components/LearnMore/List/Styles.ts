import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const DottedLine = styled.div`
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 5px,
    ${colors.lightBlue} 5px,
    ${colors.lightBlue} 10px
  );
  height: 88%;
  left: 14px;
  position: absolute;
  top: 30px;
  width: 2px;
  z-index: 0;
`;

export const ListContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ListDetail = styled.div``;

export const ListTitle = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;

export const ListItem = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const ListLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  margin-left: 20px;
  padding-top: 5px;
  width: 100%;
`;

export const ListItemNumber = styled.div`
  align-items: center;
  background-color: ${colors.lightBlue};
  border-radius: 50%;
  color: white;
  display: flex;
  height: 35px;
  justify-content: center;
  position: relative;
  width: 35px;
  z-index: 0;
`;
