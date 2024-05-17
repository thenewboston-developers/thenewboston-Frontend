import {SFC} from 'types';
import * as S from './Styles';

export interface BadgeProps {
  badgeStyle: BadgeStyle;
  children: React.ReactNode;
}

export enum BadgeStyle {
  danger = 'danger',
  draft = 'draft',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
  lightGreen = 'lightGreen',
  lightRed = 'lightRed',
}

const Badge: SFC<BadgeProps> = ({badgeStyle, className, children}) => {
  return (
    <S.Container $badgeStyle={badgeStyle} className={className}>
      <S.Text> {children}</S.Text>
    </S.Container>
  );
};

export default Badge;
