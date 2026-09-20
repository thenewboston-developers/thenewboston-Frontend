import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {Img as AvatarImg} from 'components/Avatar/Styles';
import {colors, fonts} from 'styles';

import {COMPACT_PLAYER_ROW_QUERY, linkFocusStyle} from '../../mixins';

const COMPACT_AVATAR_SIZE = 36;

// The ring in the color of the page separates the piece from the avatar, the inset line keeps a white piece visible
export const PlayerAvatar = styled(UAvatar)<{$variant: 'black' | 'white'}>`
  flex-shrink: 0;
  position: relative;

  &::after {
    background: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
    border: 2px solid ${colors.background};
    border-radius: 50%;
    bottom: -3px;
    box-shadow: ${({$variant}) => ($variant === 'white' ? `inset 0 0 0 1px ${colors.borderDarker}` : 'none')};
    content: '';
    height: 16px;
    position: absolute;
    right: -3px;
    width: 16px;
  }
`;

// Removed from the tab order in favor of the adjacent username link, which leads to the same profile
export const PlayerAvatarLink = styled(ULink)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
`;

export const PlayerElo = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const PlayerLabel = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 12px;
  grid-area: player;
  min-width: 0;

  @media ${COMPACT_PLAYER_ROW_QUERY} {
    gap: 8px;

    ${AvatarImg} {
      height: ${`${COMPACT_AVATAR_SIZE}px`};
      width: ${`${COMPACT_AVATAR_SIZE}px`};
    }
  }
`;

export const PlayerLabelDetails = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const PlayerMeta = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 12px;
  gap: 6px;
  line-height: 1.4;
  max-width: 100%;
  min-width: 0;
`;

export const PlayerName = styled(ULink)`
  ${linkFocusStyle};
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PlayerSideText = styled.span`
  white-space: nowrap;
`;
