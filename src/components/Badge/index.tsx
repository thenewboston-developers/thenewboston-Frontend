import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

export interface BadgeProps {
  badgeStyle: BadgeStyle;
  children: ReactNode;
}

export enum BadgeStyle {
  danger = 'danger',
  info = 'info',
  lightGreen = 'lightGreen',
  lightRed = 'lightRed',
  neutral = 'neutral',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
}

const Badge: SFC<BadgeProps> = ({badgeStyle, className, children}) => {
  return (
    <S.Container $badgeStyle={badgeStyle} className={className}>
      <S.Text> {children}</S.Text>
    </S.Container>
  );
};

export default Badge;
