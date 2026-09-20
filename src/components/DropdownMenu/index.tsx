import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {createPortal} from 'react-dom';
import MdiIcon from '@mdi/react';

import {useEventListener, useToggle} from 'hooks';
import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface DropdownMenuOption {
  label: ReactNode;
  onClick: GenericVoidFunction;
}

export interface DropdownMenuProps {
  icon: string;
  options: DropdownMenuOption[];
}

interface MenuPosition {
  right: number;
  top: number;
}

const DESTRUCTIVE_LABEL = 'Delete';

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const DropdownMenu: SFC<DropdownMenuProps> = ({className, icon, options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const shouldFocusFirstOptionRef = useRef(false);

  const handleButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      if (!buttonRef.current) return;

      const {
        height: buttonHeight,
        left: buttonLeft,
        top: buttonTop,
        width: buttonWidth,
      } = buttonRef.current.getBoundingClientRect();

      const position: MenuPosition = {
        right: window.innerWidth - buttonLeft - buttonWidth / 2,
        top: buttonTop + buttonHeight / 2,
      };

      // A click without pointer detail was triggered from the keyboard, so focus should move into the menu
      shouldFocusFirstOptionRef.current = e.detail === 0;
      setMenuPosition(position);
      toggleIsOpen();
    },
    [toggleIsOpen],
  );

  useEffect(() => {
    if (!isOpen) return;

    if (shouldFocusFirstOptionRef.current) {
      shouldFocusFirstOptionRef.current = false;
      optionsRef.current[0]?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      toggleIsOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, toggleIsOpen]);

  // The menu opens leftwards from the trigger, so a trigger close to the left edge would push it off screen. The
  // rendered width is measured before the first paint and the menu is shifted right just enough to stay in view.
  useLayoutEffect(() => {
    if (!isOpen || !menuPosition || !menuRef.current) return;

    const {width: menuWidth} = menuRef.current.getBoundingClientRect();
    const maxRight = window.innerWidth - menuWidth - S.MENU_VIEWPORT_MARGIN;
    if (menuPosition.right <= maxRight) return;

    setMenuPosition({...menuPosition, right: maxRight});
  }, [isOpen, menuPosition]);

  const focusOption = (index: number): void => {
    const optionElements = optionsRef.current.slice(0, options.length);
    if (!optionElements.length) return;

    const nextIndex = (index + optionElements.length) % optionElements.length;
    optionElements[nextIndex]?.focus();
  };

  const handleButtonKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>): void => {
    // Focus returns to the trigger after an option is activated, so a held key must not immediately reopen the menu
    if (e.repeat && (e.key === 'Enter' || e.key === ' ')) e.preventDefault();
  };

  const handleClick = (e: any): void => {
    if (buttonRef.current?.contains(e.target)) return;
    if (!dropDown.contains(e.target)) toggleIsOpen(false);
  };

  const handleMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>): void => {
    const currentIndex = optionsRef.current.findIndex((optionElement) => optionElement === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOption(currentIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusOption(currentIndex - 1);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      toggleIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    toggleIsOpen(false);
  };

  const handleOptionKeyDown =
    (optionOnClick: GenericVoidFunction) =>
    async (e: ReactKeyboardEvent<HTMLDivElement>): Promise<void> => {
      if (e.repeat || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      await handleOptionClick(optionOnClick)();

      // Closing the menu would drop keyboard focus onto <body>, so it goes back to the trigger (which no longer exists
      // when the option deleted this item). Focus that already moved somewhere else in the meantime is left alone.
      const {activeElement} = document;
      if (activeElement && activeElement !== document.body && !dropDown.contains(activeElement)) return;
      buttonRef.current?.focus();
    };

  useEventListener('mousedown', handleClick, document);

  const renderMenu = () => (
    <S.Menu onKeyDown={handleMenuKeyDown} ref={menuRef} role="menu" style={menuPosition}>
      {options.map(({label, onClick: optionOnClick}, index) => (
        <S.MenuOption
          $isDestructive={label!.toString() === DESTRUCTIVE_LABEL}
          key={index}
          onClick={handleOptionClick(optionOnClick)}
          onKeyDown={handleOptionKeyDown(optionOnClick)}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="menuitem"
          tabIndex={0}
        >
          {label}
        </S.MenuOption>
      ))}
    </S.Menu>
  );

  return (
    <>
      <S.MenuButton
        $isOpen={isOpen}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open menu"
        className={className}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        type="button"
      >
        <MdiIcon path={icon} size="20px" />
      </S.MenuButton>
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default DropdownMenu;
