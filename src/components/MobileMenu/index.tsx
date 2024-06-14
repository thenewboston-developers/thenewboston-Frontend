import {mdiMenu} from '@mdi/js';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

interface Menu {
  text: string;
  to: string;
}
interface MobileMenuProps {
  isOpen: boolean;
  menuItems: Menu[];
  onToggle: () => void;
}
const MobileMenu: SFC<MobileMenuProps> = ({isOpen = false, menuItems, onToggle = () => {}}) => {
  return (
    <>
      <S.MenuTitle onClick={onToggle} $open={isOpen}>
        <S.Icon path={mdiMenu} size="20px" />
        <S.MenuItems $open={isOpen}>
          {menuItems.map((item) => (
            <S.MenuItem key={item.text}>
              <ToolbarMenuLink text={item.text} to={item.to} isMobileDevice={true} />
            </S.MenuItem>
          ))}
        </S.MenuItems>
      </S.MenuTitle>
    </>
  );
};

export default MobileMenu;
