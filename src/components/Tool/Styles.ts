import styled from 'styled-components';

import Icon from 'components/Icon';

export const Container = styled(Icon)`
  background: #eff2f4;
  border-radius: unset;
  color: #aaa;
  padding: 4px;

  &:hover {
    background: #40444a;
    cursor: pointer;
  }
`;
