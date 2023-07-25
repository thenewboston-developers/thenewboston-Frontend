import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  color: ${colors.palette.blue['400']};

  &:hover {
    color: ${colors.palette.blue['500']};
    cursor: pointer;
    text-decoration: underline;
  }
`;
