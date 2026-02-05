import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {colors, fonts} from 'styles';

export const PlayerAvatar = styled(UAvatar)<{$variant: 'black' | 'white'}>`
  margin-right: 12px;
  position: relative;

  &::after {
    background: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
    border-radius: 50%;
    bottom: -2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    content: '';
    height: 12px;
    position: absolute;
    right: -2px;
    width: 12px;
  }
`;

export const PlayerLabel = styled.div`
  align-items: center;
  display: flex;
`;

export const PlayerLabelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PlayerName = styled.span<{$isClickable: boolean}>`
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:hover {
    cursor: ${({$isClickable}) => ($isClickable ? 'pointer' : 'default')};
  }
`;

export const PlayerSideText = styled.span<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.palette.gray[600])};
  font-size: 12px;
`;
