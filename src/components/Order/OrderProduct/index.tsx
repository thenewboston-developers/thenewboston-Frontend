import ShopProductListDetails from 'components/ShopProductListDetails';
import Thumbnail from 'components/Thumbnail';
import {OrderProduct as TOrderProduct, SFC} from 'types';

export interface OrderProductProps {
  orderProduct: TOrderProduct;
}

const OrderProduct: SFC<OrderProductProps> = ({orderProduct}) => {
  return (
    <>
      <Thumbnail thumbnailUrl={orderProduct.image} />
      <ShopProductListDetails
        coreId={orderProduct.price_core}
        description={orderProduct.description}
        isOrderProduct={true}
        name={orderProduct.name}
        price={orderProduct.price_amount}
      />
    </>
  );
};

export default OrderProduct;
