import {CSSProperties, MouseEvent, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {useEventListener, useToggle} from 'hooks';
import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface PopupMenuOption {
  icon: string;
  label: ReactNode;
  onClick: GenericVoidFunction;
}

export interface PopupMenuProps {
  children: ReactNode;
  options: PopupMenuOption[];
}

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const PopupMenu: SFC<PopupMenuProps> = ({children, className, options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any): void => {
    if (buttonRef.current?.contains(e.target)) return;
    if (!buttonRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleButtonClick = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
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
    <S.Menu $isOpen={isOpen} style={menuPosition}>
      {options.map(({icon, label, onClick: optionOnClick}, index) => (
        <S.MenuOption key={index} onClick={handleOptionClick(optionOnClick)} role="button">
          <S.MenuIcon path={icon} size="20px" />
          <S.OptionLabel>{label}</S.OptionLabel>
        </S.MenuOption>
      ))}
    </S.Menu>
  );

  return (
    <>
      <S.MenuItem $isActive={false} className={className} onClick={handleButtonClick} ref={buttonRef}>
        {children}
      </S.MenuItem>
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default PopupMenu;
