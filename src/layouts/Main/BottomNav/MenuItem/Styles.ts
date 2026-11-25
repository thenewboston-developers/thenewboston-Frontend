import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {bottomNavIconStyle, bottomNavItemStyle, bottomNavTextStyle} from 'layouts/Main/mixins';

export const IconWrapper = styled.span<{$isActive: boolean}>`
  ${bottomNavIconStyle};
`;

export const MenuItem = styled(ULink)<{$isActive: boolean}>`
  ${bottomNavItemStyle};
`;

export const Text = styled.span`
  ${bottomNavTextStyle};
`;
