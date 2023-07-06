import {SFC} from 'types';
import * as S from './Styles';

export interface BadgeProps {
  badgeStyle: BadgeStyle;
  text: string;
}

export enum BadgeStyle {
  danger = 'danger',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
}

const Badge: SFC<BadgeProps> = ({badgeStyle, className, text}) => {
  return (
    <S.Container badgeStyle={badgeStyle} className={className}>
      {text}
    </S.Container>
  );
};

export default Badge;
