import styled from 'styled-components';

import {colors} from 'styles';

export const Anchor = styled.a`
  color: ${colors.palette.blue['400']};

  &:hover {
    color: ${colors.palette.blue['500']};
    cursor: pointer;
  }
`;
