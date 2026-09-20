import {CSSProperties, MouseEvent, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {useEventListener, useToggle} from 'hooks';
import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface PopupMenuOption {
  activeIcon?: string;
  icon: string;
  isActive?: boolean;
  label: ReactNode;
  onClick: GenericVoidFunction;
}

export interface PopupMenuProps {
  children: ReactNode;
  isActive?: boolean;
  options: PopupMenuOption[];
}

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const PopupMenu: SFC<PopupMenuProps> = ({children, className, isActive = false, options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (e: any): void => {
    if (buttonRef.current?.contains(e.target)) return;
    if (!buttonRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleOutsideClick, document);

  const handleButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      const position: CSSProperties = {
        bottom: window.innerHeight - rect.top + 8,
        right: window.innerWidth - rect.right,
      };

      setMenuPosition(position);
      toggleIsOpen();
    },
    [toggleIsOpen],
  );

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    toggleIsOpen(false);
  };

  const renderMenu = () => (
    <S.Menu style={menuPosition}>
      {options.map(({activeIcon, icon, isActive: optionIsActive = false, label, onClick: optionOnClick}, index) => (
        <S.MenuOption $isActive={optionIsActive} key={index} onClick={handleOptionClick(optionOnClick)} type="button">
          <S.MenuIcon path={optionIsActive && activeIcon ? activeIcon : icon} size="20px" />
          <S.OptionLabel>{label}</S.OptionLabel>
        </S.MenuOption>
      ))}
    </S.Menu>
  );

  return (
    <>
      <S.MenuItem
        $isActive={isActive}
        aria-expanded={isOpen}
        className={className}
        onClick={handleButtonClick}
        ref={buttonRef}
        type="button"
      >
        {children}
      </S.MenuItem>
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default PopupMenu;
