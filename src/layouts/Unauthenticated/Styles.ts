import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts, radii} from 'styles';

export const Brand = styled(ULink)`
  align-items: center;
  border-radius: ${radii.medium};
  color: ${colors.white};
  display: flex;
  gap: 8px;
  margin-bottom: 32px;

  &:hover {
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.nav.text};
    outline-offset: 4px;
  }
`;

export const BrandLogo = styled.img`
  border-radius: ${radii.small};
  height: 32px;
  width: 32px;
`;

export const BrandName = styled.span`
  font-size: 17px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
`;

/* The page itself does not scroll, so the container does to keep the whole form reachable on short screens */
export const Container = styled.div`
  background: ${colors.backgroundDark};
  display: flex;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 16px;

  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

/* The auto margin centers the content while there is room and lets it scroll from the top once there is not */
export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
`;
