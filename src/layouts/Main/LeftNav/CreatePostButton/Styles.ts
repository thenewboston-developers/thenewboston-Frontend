import styled from 'styled-components';

import {navCallToActionStyle, visuallyHidden} from 'layouts/Main/mixins';
import {breakpoints} from 'styles';

export const Button = styled.button`
  ${navCallToActionStyle};
`;

export const Text = styled.span`
  @media (max-width: ${breakpoints.tablet}) {
    ${visuallyHidden};
  }
`;
