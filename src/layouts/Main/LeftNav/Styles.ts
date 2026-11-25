import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {navFocusVisible, visuallyHidden} from 'layouts/Main/mixins';
import {breakpoints, colors, fonts, hiddenScroll, radii} from 'styles';

const LOGOUT_LINK_SIZE = 32;
const RAIL_ITEM_SIZE = 40;

export const Avatar = styled(UAvatar)`
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${colors.nav.border};
  flex-shrink: 0;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const Brand = styled(ULink)`
  align-items: center;
  border-radius: 10px;
  color: ${colors.nav.textActive};
  display: flex;
  flex-shrink: 0;
  gap: 10px;
  height: 40px;
  margin-bottom: 24px;
  padding: 0 10px;
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
  height: 28px;
  width: 28px;
`;

export const BrandName = styled.span`
  color: ${colors.nav.textActive};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.02em;
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
  font-family: ${fonts.family.navigation};
  gap: 24px;
  justify-content: space-between;
  min-height: 0;
  overflow-x: hidden;
  padding: 20px 14px 14px;
`;

export const LogoutLink = styled(ULink)`
  align-items: center;
  border-radius: ${radii.small};
  color: ${colors.nav.text};
  display: flex;
  flex-shrink: 0;
  height: ${LOGOUT_LINK_SIZE}px;
  justify-content: center;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  width: ${LOGOUT_LINK_SIZE}px;

  /* Touch devices keep :hover applied after a tap, so the hover visuals are limited to real pointers */
  @media (hover: hover) {
    &:hover {
      background: ${colors.nav.active};
      color: ${colors.nav.textActive};
    }
  }

  ${navFocusVisible};

  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 10px;
    height: ${RAIL_ITEM_SIZE}px;
    width: ${RAIL_ITEM_SIZE}px;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

// Holds the member's profile link and the log out control, which stack into a column in the icon-only rail
export const ProfileCard = styled.div`
  align-items: center;
  border: 1px solid ${colors.nav.border};
  border-radius: ${radii.medium};
  display: flex;
  flex-shrink: 0;
  gap: 4px;
  padding: 6px;

  @media (max-width: ${breakpoints.tablet}) {
    border: none;
    border-radius: 0;
    border-top: 1px solid ${colors.nav.border};
    flex-direction: column;
    padding: 12px 0 0;
  }
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
  border-radius: ${radii.small};
  color: ${colors.nav.text};
  display: flex;
  flex: 1;
  gap: 10px;
  min-width: 0;
  padding: 4px;
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
    border-radius: 10px;
    flex: none;
    gap: 0;
    height: ${RAIL_ITEM_SIZE}px;
    justify-content: center;
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
  letter-spacing: -0.01em;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
