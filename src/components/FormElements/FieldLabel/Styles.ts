import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Label = styled.label`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const RequiredIndicator = styled.span`
  color: ${colors.palette.red[600]};
  margin-left: 2px;
`;
