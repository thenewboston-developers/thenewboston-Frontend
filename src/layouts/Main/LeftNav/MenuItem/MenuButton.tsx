import {SFC} from 'types';

import useIsRail from '../useIsRail';

import * as S from './Styles';

export interface MenuButtonProps {
  icon: string;
  onClick?: () => void;
  text: string;
}

const MenuButton: SFC<MenuButtonProps> = ({className, icon, onClick, text}) => {
  const isRail = useIsRail();

  return (
    <S.MenuButton
      $isActive={false}
      className={className}
      onClick={onClick}
      title={isRail ? text : undefined}
      type="button"
    >
      <S.Icon path={icon} size="22px" />
      <S.Text>{text}</S.Text>
    </S.MenuButton>
  );
};

export default MenuButton;
