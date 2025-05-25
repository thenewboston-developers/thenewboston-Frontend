import {CSSProperties, MouseEvent, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useEventListener, useToggle} from 'hooks';
import {GenericVoidFunction, SFC} from 'types';

import Icon from 'components/Icon';

import * as S from './Styles';

export interface DropdownMenuOption {
  label: ReactNode;
  onClick: GenericVoidFunction;
  menuIcon: string;
}

export interface DropdownMenuProps {
  icon: string;
  options: DropdownMenuOption[];
}

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const DropdownMenu: SFC<DropdownMenuProps> = ({className, icon, options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const iconRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  const handleClick = (e: any): void => {
    if (iconRef.current?.contains(e.target)) return;
    if (!iconRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleIconClick = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      if (!iconRef.current) return;

      const {
        height: iconHeight,
        left: iconLeft,
        top: iconTop,
        width: iconWidth,
      } = iconRef.current.getBoundingClientRect();

      const position: CSSProperties = {
        right: window.innerWidth - iconLeft - iconWidth / 2,
        top: iconTop + iconHeight / 2,
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
    <S.DropMenu style={menuPosition}>
      {options.map(({label, onClick: optionOnClick, menuIcon}, index) => (
        <S.MenuOption
          key={index}
          onClick={handleOptionClick(optionOnClick)}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="button"
          $MenuIndex={index}
        >
          <S.Div $label={label!.toString()}>
            {menuIcon !== '' && <Icon icon={menuIcon} />}
            {label}
          </S.Div>
        </S.MenuOption>
      ))}
    </S.DropMenu>
  );

  return (
    <>
      <S.MenuIcon
        className={className}
        icon={icon}
        onClick={handleIconClick}
        ref={iconRef}
        size={24}
        $isOpen={isOpen}
      />
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default DropdownMenu;
