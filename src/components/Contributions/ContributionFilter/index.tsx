import React, {CSSProperties, MouseEvent, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useEventListener, useToggle} from 'hooks';
import {Menu, Option, RadioOption, Button, Span} from './Style';
import {GenericVoidFunction, SFC} from 'types';
import Icon from '../../Icon';
import {mdiSwapHorizontal} from '@mdi/js';
import {CodiconCircleFilled} from '../../Icon/CircleIcon';

export interface ContributionFilterOption {
  label: ReactNode;
  onClick?: GenericVoidFunction;
  radio?: boolean;
  radioName?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  icon: string;
  title: string;
  options: ContributionFilterOption[];
}

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const ContributionFilterMenu: SFC<DropdownMenuProps> = ({options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const iconRef = useRef<HTMLButtonElement>(null); // Updated to HTMLButtonElement
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const [isActive, setIsActive] = useState(false);
  const handleClick = (e: any): void => {
    if (iconRef.current?.contains(e.target)) return;
    if (!iconRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleIconClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      if (!iconRef.current) return;

      const {
        height: iconHeight,
        left: iconLeft,
        top: iconTop,
        width: iconWidth,
      } = iconRef.current.getBoundingClientRect();

      const position: CSSProperties = {
        right: window.innerWidth - iconLeft - iconWidth / 1,
        top: iconTop + iconHeight / 0.75,
        width: 150,
      };

      setMenuPosition(position);
      toggleIsOpen();
      setIsActive(!isOpen);
    },
    [toggleIsOpen, isOpen],
  );

  const handleOptionClick =
    (optionOnClick: GenericVoidFunction = () => {}): GenericVoidFunction =>
    async (): Promise<void> => {
      await optionOnClick();
      setTimeout(() => {
        toggleIsOpen(false);
        setIsActive(false);
      }, 2000);
    };

  const renderMenu = () => (
    <Menu style={menuPosition}>
      {options.map(({label, onClick: optionOnClick, radio, radioName, disabled, checked}, index) => (
        <Option
          key={index}
          onClick={!disabled ? handleOptionClick(optionOnClick) : undefined}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="button"
          aria-disabled={disabled}
          style={{color: disabled ? '#a3acb9' : 'inherit', cursor: disabled ? 'not-allowed' : 'pointer'}}
        >
          {radio ? (
            <RadioOption>
              <input type="radio" name={radioName} checked={checked} readOnly disabled={disabled} />
              {label}
            </RadioOption>
          ) : (
            label
          )}
        </Option>
      ))}
    </Menu>
  );

  return (
    <>
      <Button onClick={handleIconClick} ref={iconRef} $isActive={isActive}>
        <Icon icon={mdiSwapHorizontal}></Icon>
        Filter
        {options.some((option) => option.checked && option.radioName === 'timeFilter' && option.label !== 'None') && (
          <Span>
            <CodiconCircleFilled />
          </Span>
        )}
      </Button>
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default ContributionFilterMenu;
