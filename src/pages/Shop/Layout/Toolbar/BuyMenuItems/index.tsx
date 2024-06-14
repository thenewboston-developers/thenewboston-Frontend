import {useState} from 'react';

import {useResizeObserver} from 'hooks';
import MobileMenu from 'components/MobileMenu';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';

import {breakpoints} from 'styles';

const items = [
  {text: 'Home', to: '/shop/buy/catalog'},
  {text: 'My Addresses', to: '/shop/buy/addresses'},
  {text: 'Orders', to: '/shop/buy/orders'},
];

const BuyMenuItems: SFC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  const isMobileDevice = useResizeObserver(breakpoints.mini);
  return (
    <>
      {isMobileDevice ? (
        <MobileMenu menuItems={items} isOpen={menuIsOpen} onToggle={handleMenuToggle} />
      ) : (
        <>
          {items.map((item) => (
            <ToolbarMenuLink key={item.text} text={item.text} to={item.to} />
          ))}
        </>
      )}
    </>
  );
};

export default BuyMenuItems;
