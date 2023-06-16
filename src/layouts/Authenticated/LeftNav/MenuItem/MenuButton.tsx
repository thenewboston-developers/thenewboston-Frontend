import {SFC} from 'types';
import * as S from './Styles';

export interface MenuButtonProps {
  icon: string;
  onClick?: () => void;
  text: string;
}

const MenuButton: SFC<MenuButtonProps> = ({className, icon, onClick, text}) => {
  return (
    <S.MenuButton $isActive={false} className={className} onClick={onClick}>
      <S.Icon path={icon} size="26px" />
      <S.Text>{text}</S.Text>
    </S.MenuButton>
  );
};

export default MenuButton;
