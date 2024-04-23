import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';

const BuyMenuItems: SFC = () => {
  return (
    <>
      <ToolbarMenuLink text="Home" to="/shop/buy/catalog" />
      <ToolbarMenuLink text="My Addresses" to="/shop/buy/addresses" />
      <ToolbarMenuLink text="Orders" to="/shop/buy/orders" />
    </>
  );
};

export default BuyMenuItems;
