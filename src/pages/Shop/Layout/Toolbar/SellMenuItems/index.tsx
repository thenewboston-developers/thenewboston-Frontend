import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';

const SellMenuItems: SFC = () => {
  return (
    <>
      <ToolbarMenuLink text="Products" to="/shop/sell/products" />
      <ToolbarMenuLink text="Orders" to="/shop/sell/orders" />
    </>
  );
};

export default SellMenuItems;
