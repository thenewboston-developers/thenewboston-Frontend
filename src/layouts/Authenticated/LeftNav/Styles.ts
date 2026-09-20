import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {navFocusVisible, visuallyHidden} from 'layouts/Authenticated/mixins';
import {breakpoints, colors, fonts, hiddenScroll, radii} from 'styles';

const RAIL_ITEM_SIZE = 44;

export const Avatar = styled(UAvatar)`
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${colors.nav.border};
  flex-shrink: 0;
`;

export const Bottom = styled.div`
  border-top: 1px solid ${colors.nav.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 4px;
  padding-top: 12px;
`;

export const Brand = styled(ULink)`
  align-items: center;
  border-radius: ${radii.medium};
  color: ${colors.nav.textActive};
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  height: 48px;
  margin-bottom: 12px;
  padding: 0 8px;
  position: relative;

  &:hover {
    text-decoration: none;
  }

  ${navFocusVisible};

  @media (max-width: ${breakpoints.tablet}) {
    gap: 0;
    justify-content: center;
    padding: 0;
    width: ${RAIL_ITEM_SIZE}px;
  }
`;

export const BrandLogo = styled.img`
  border-radius: ${radii.small};
  flex-shrink: 0;
  height: 32px;
  width: 32px;
`;

export const BrandName = styled.span`
  color: ${colors.nav.textActive};
  font-size: 17px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
    ${visuallyHidden};
  }
`;

export const Container = styled.div`
  ${hiddenScroll};
  background: ${colors.nav.background};
  border-right: 1px solid ${colors.nav.border};
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
  min-height: 0;
  overflow-x: hidden;
  padding: 16px 12px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px 14px;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const UserCaption = styled.span`
  color: ${colors.nav.text};
  font-size: 12px;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserCard = styled(ULink)`
  align-items: center;
  border-radius: ${radii.medium};
  color: ${colors.nav.text};
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  min-height: 48px;
  padding: 6px 8px;
  position: relative;
  transition: background 0.15s ease;

  &:hover {
    text-decoration: none;
  }

  /* Touch devices keep :hover applied after a tap, so the hover background is limited to real pointers */
  @media (hover: hover) {
    &:hover {
      background: ${colors.nav.hover};
    }
  }

  ${navFocusVisible};

  @media (max-width: ${breakpoints.tablet}) {
    gap: 0;
    height: ${RAIL_ITEM_SIZE}px;
    justify-content: center;
    min-height: 0;
    padding: 0;
    width: ${RAIL_ITEM_SIZE}px;
  }
`;

export const UserDetails = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;

  @media (max-width: ${breakpoints.tablet}) {
    ${visuallyHidden};
  }
`;

export const Username = styled.span`
  color: ${colors.nav.textActive};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
