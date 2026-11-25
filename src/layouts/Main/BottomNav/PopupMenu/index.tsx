import {CSSProperties, MouseEvent, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {LucideIcon} from 'lucide-react';

import {useEventListener, useToggle} from 'hooks';
import {GenericVoidFunction, SFC} from 'types';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

export interface PopupMenuOption {
  icon: LucideIcon;
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
    <S.Menu {...analyticsArea('navigation')} style={menuPosition}>
      {options.map(({icon: Icon, isActive: optionIsActive = false, label, onClick: optionOnClick}, index) => (
        <S.MenuOption
          {...(typeof label === 'string' ? analyticsTarget(label) : {})}
          $isActive={optionIsActive}
          key={index}
          onClick={handleOptionClick(optionOnClick)}
          type="button"
        >
          <Icon aria-hidden size={20} strokeWidth={optionIsActive ? 2 : 1.75} />
          <S.OptionLabel>{label}</S.OptionLabel>
        </S.MenuOption>
      ))}
    </S.Menu>
  );

  return (
    <>
      <S.MenuItem
        {...analyticsTarget('more')}
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
