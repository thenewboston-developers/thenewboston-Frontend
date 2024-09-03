import {CSSProperties, MouseEvent, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useEventListener, useToggle} from 'hooks';
import {GenericVoidFunction, SFC} from 'types';
import * as S from './Styles';
import {CONTRIBUTION_DURATION_FILTER_OPTIONS} from '../constants';
import {mdiTuneVariant} from '@mdi/js';
import NotificationDot from 'components/NotificationDot';

export interface DropdownMenuProps {
  onClick: GenericVoidFunction;
  value: number | null;
}

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const Filters: SFC<DropdownMenuProps> = ({onClick: handleFilterClick, value: filterValue}) => {
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

  const renderMenu = () => (
    <S.DropMenu style={menuPosition}>
      <S.DropMenuLabel>Filter By:</S.DropMenuLabel>
      {CONTRIBUTION_DURATION_FILTER_OPTIONS.map(({label, value}, index) => (
        <S.MenuOption
          key={index}
          onClick={() => handleFilterClick(value)}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          $MenuIndex={index}
        >
          <S.Div $label={label!.toString()}>
            <input
              type="radio"
              checked={filterValue == value}
              onClick={() => handleFilterClick(value)}
              name="top-contributors-duration"
            />
            {label}
          </S.Div>
        </S.MenuOption>
      ))}
    </S.DropMenu>
  );

  return (
    <>
      <S.FilterButton onClick={handleIconClick} ref={iconRef} $isOpen={isOpen}>
        <NotificationDot showDot={filterValue != null}>
          <S.Icon icon={mdiTuneVariant} size={15} totalSize="unset" />
          Filter
        </NotificationDot>
      </S.FilterButton>
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default Filters;
