import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Bottom = styled.div``;

export const Container = styled.div`
  background: ${colors.backgroundDark};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  padding: 24px 16px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NotificationBadge = styled.div`
  align-items: center;
  background: ${colors.palette.red['400']};
  border-radius: 12px;
  color: ${colors.white};
  display: flex;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  height: 18px;
  justify-content: center;
  min-width: 18px;
  padding: 0 6px;
`;
