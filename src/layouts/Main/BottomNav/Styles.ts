import styled from 'styled-components';

import {bottomNavIconStyle, bottomNavTextStyle} from 'layouts/Main/mixins';
import {colors} from 'styles';

export const Container = styled.nav`
  background: ${colors.nav.background};
  border-top: 1px solid ${colors.nav.border};
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  padding: 0 4px env(safe-area-inset-bottom, 0);
`;

export const IconWrapper = styled.span<{$isActive: boolean}>`
  ${bottomNavIconStyle};
`;

export const Text = styled.span`
  ${bottomNavTextStyle};
`;
