import MdiIcon from '@mdi/react';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.nav`
  background: ${colors.backgroundDark};
  border-top: 1px solid ${colors.border};
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  padding: 8px 0;
`;

export const Icon = styled(MdiIcon)`
  color: ${colors.palette.gray[300]};
`;

export const IconWrapper = styled.div`
  position: relative;
`;

export const Text = styled.span`
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
`;
