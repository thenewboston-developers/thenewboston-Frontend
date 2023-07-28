import styled from 'styled-components';

import {toolbarStyle} from 'styles';

export const Container = styled.div`
  ${toolbarStyle};
`;

export const Left = styled.div`
  align-items: center;
  display: flex;
`;

export const Logo = styled.img`
  height: 26px;

  &:hover {
    cursor: pointer;
  }
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;
