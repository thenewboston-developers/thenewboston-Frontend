import styled from 'styled-components';
import UIcon from '@mdi/react';

import {colors} from 'styles';

export const ArrowContainer = styled.div`
  display: flex;
`;

export const Container = styled.div``;

export const Icon = styled(UIcon)``;

export const IconContainer = styled.div`
  align-items: center;
  background: none;
  border-radius: 50%;
  cursor: default;
  display: flex;
  font-size: 24px;

  &:hover {
    background: ${colors.whiteHover};
  }
`;

export const Img = styled.img`
  margin-bottom: 16px;
  max-width: 100%;
`;

export const PositionIndicator = styled.span`
  font-size: 13px;
  margin-left: 12px;
`;

export const Toolbar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ToolbarLeft = styled.div`
  align-items: center;
  display: flex;
`;

export const ToolbarRight = styled.div``;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 600;
`;
