import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  margin-bottom: 8px;
`;

export const RequiredIndicator = styled.span`
  color: ${colors.palette.red[600]};
  margin-left: 2px;
`;
