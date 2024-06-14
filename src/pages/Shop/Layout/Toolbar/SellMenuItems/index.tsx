import {useState} from 'react';

import {useResizeObserver} from 'hooks';
import MobileMenu from 'components/MobileMenu';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {breakpoints} from 'styles';

import {SFC} from 'types';

const items = [
  {text: 'Products', to: '/shop/sell/products'},
  {text: 'Orders', to: '/shop/sell/orders'},
];

const SellMenuItems: SFC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isMobileDevice = useResizeObserver(breakpoints.mini);

  const handleMenuToggle = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  return (
    <>
      {isMobileDevice ? (
        <>
          <MobileMenu menuItems={items} isOpen={menuIsOpen} onToggle={handleMenuToggle} />
        </>
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

export default SellMenuItems;
