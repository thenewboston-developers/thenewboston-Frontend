import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Counter = styled.span<{$isOverLimit?: boolean}>`
  color: ${({$isOverLimit}) => ($isOverLimit ? colors.palette.red[600] : colors.secondary)};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
`;
