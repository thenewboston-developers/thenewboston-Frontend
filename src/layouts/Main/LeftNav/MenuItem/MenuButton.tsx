import {LucideIcon} from 'lucide-react';

import {SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';

import useIsRail from '../useIsRail';

import * as S from './Styles';

export interface MenuButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  text: string;
}

const MenuButton: SFC<MenuButtonProps> = ({className, icon: Icon, onClick, text}) => {
  const isRail = useIsRail();

  return (
    <S.MenuButton
      {...analyticsTarget(text)}
      $isActive={false}
      className={className}
      onClick={onClick}
      title={isRail ? text : undefined}
      type="button"
    >
      <Icon aria-hidden size={S.ICON_SIZE} strokeWidth={1.75} />
      <S.Text>{text}</S.Text>
    </S.MenuButton>
  );
};

export default MenuButton;
