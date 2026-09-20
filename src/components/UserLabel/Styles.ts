import {Link as ULink} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import {colors, fonts, shadows} from 'styles';

export const Avatar = styled(UAvatar)`
  flex-shrink: 0;
`;

// Removed from the tab order in favor of the adjacent username link, which leads to the same profile
export const AvatarLink = styled(ULink)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 0;
`;

export const Description = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.4;
  margin-top: 2px;
  overflow-wrap: break-word;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Username = styled.div<{$isClickable: boolean}>`
  align-self: flex-start;
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({$isClickable}) =>
    $isClickable &&
    css`
      border-radius: 4px;
      cursor: pointer;

      &:focus-visible {
        box-shadow: ${shadows.focusRing};
        outline: none;
      }

      &:hover {
        text-decoration: underline;
      }
    `}
`;
