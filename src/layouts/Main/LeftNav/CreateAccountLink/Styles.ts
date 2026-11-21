import {Link as ULink} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import {navCallToActionStyle, visuallyHidden} from 'layouts/Main/mixins';
import {breakpoints} from 'styles';

export const Icon = styled(UIcon)`
  flex-shrink: 0;
`;

export const Link = styled(ULink)`
  ${navCallToActionStyle};

  &:hover {
    text-decoration: none;
  }
`;

export const Text = styled.span`
  @media (max-width: ${breakpoints.tablet}) {
    ${visuallyHidden};
  }
`;
