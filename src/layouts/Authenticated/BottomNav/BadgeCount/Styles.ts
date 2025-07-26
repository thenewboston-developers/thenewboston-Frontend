import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const BadgeCount = styled.div`
  background-color: #e53e3e;
  border-radius: 50%;
  color: ${colors.white};
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  height: 16px;
  line-height: 16px;
  min-width: 16px;
  padding: 0 4px;
  position: absolute;
  right: -4px;
  text-align: center;
  top: -4px;
`;
