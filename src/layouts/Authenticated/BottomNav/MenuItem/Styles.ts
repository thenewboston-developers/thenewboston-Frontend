import {Link as ULink} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import {bottomNavItemStyle, bottomNavTextStyle} from 'layouts/Authenticated/mixins';

export const Icon = styled(UIcon)`
  flex-shrink: 0;
`;

export const IconWrapper = styled.span`
  display: flex;
  position: relative;
`;

export const MenuItem = styled(ULink)<{$isActive: boolean}>`
  ${bottomNavItemStyle};
`;

export const Text = styled.span`
  ${bottomNavTextStyle};
`;
