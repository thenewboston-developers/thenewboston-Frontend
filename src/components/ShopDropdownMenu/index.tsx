import {CSSProperties, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useNavigate} from 'react-router-dom';

import {useEventListener, useToggle} from 'hooks';
import {Menu, Option} from 'styles/components/DropMenuStyle';
import {SFC} from 'types';
import * as S from './Styles';

const dropDown = document.getElementById('dropdown-root') as HTMLElement;

const ShopDropdownMenu: SFC = ({className}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const iconRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/shop/buyer/catalog');
    toggleIsOpen(false);
  };

  const handleClick = (e: any): void => {
    if (iconRef.current?.contains(e.target)) return;
    if (!iconRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleImgClick = useCallback((): void => {
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
  }, [toggleIsOpen]);

  const handleSellClick = () => {
    navigate('/shop/seller/orders');
    toggleIsOpen(false);
  };

  const renderMenu = () => {
    return (
      <Menu style={menuPosition}>
        <Option onClick={handleBuyClick}>Buy</Option>
        <Option onClick={handleSellClick}>Sell</Option>
      </Menu>
    );
  };

  return (
    <>
      <S.Img
        alt="avatar"
        className={className}
        onClick={handleImgClick}
        ref={iconRef}
        src="https://avatars.githubusercontent.com/u/8547538?v=4"
      />
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default ShopDropdownMenu;
