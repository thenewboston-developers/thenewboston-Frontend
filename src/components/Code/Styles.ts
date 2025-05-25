import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  color: ${colors.palette.darkGray['400']};
  font-family: ${fonts.family.default};
  font-size: 12px;
  line-height: 1.5;
  margin: 0 10px;
  padding: 10px;
  white-space: pre-wrap;
`;

export const Obj = styled.div`
  margin-bottom: 2px;
`;
