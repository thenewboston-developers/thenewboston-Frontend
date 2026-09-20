import UIcon from '@mdi/react';
import styled from 'styled-components';

import {bottomNavTextStyle} from 'layouts/Authenticated/mixins';
import {colors} from 'styles';

export const Container = styled.nav`
  background: ${colors.nav.background};
  border-top: 1px solid ${colors.nav.border};
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  padding: 0 4px env(safe-area-inset-bottom, 0);
`;

export const Icon = styled(UIcon)`
  flex-shrink: 0;
`;

export const IconWrapper = styled.span`
  display: flex;
  position: relative;
`;

export const Text = styled.span`
  ${bottomNavTextStyle};
`;
