import styled from 'styled-components';

import Icon from 'components/Icon';

export const Container = styled(Icon)`
  background: #333;
  border-radius: unset;
  color: #aaa;
  padding: 4px;

  &:hover {
    background: #40444a;
    cursor: pointer;
  }
`;
