import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';

import AddressCard from 'components/AddressCard';
import Button from 'components/Button';
import EmptyAddress from 'assets/empty-address.svg';
import EmptyProduct from 'assets/empty-product.svg';
import EmptyParticipants from 'assets/default-participants.svg';
import DropdownMenu from 'components/DropdownMenu';
import UserLabel from 'components/UserLabel';
import EmptyPage from 'components/EmptyPage';
import {updateManager} from 'store/manager';
import {useActiveOrderAddress, useCartSeller, useToggle} from 'hooks';
import AddressSelectModal from 'modals/AddressSelectModal';
import BuyAddressDetailsModal from 'modals/BuyAddressDetailsModal';
import {getCartProducts, getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import CartProduct from './CartProduct';
import PaymentDetails from './PaymentDetails';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [addressEditModalIsOpen, setAddressEditModalIsOpen] = useToggle(false);
  const [addressSelectModalIsOpen, toggleAddressSelectModal] = useToggle(false);
  const activeOrderAddress = useActiveOrderAddress();
  const cartProducts = useSelector(getCartProducts);
  const cartSeller = useCartSeller();
  const self = useSelector(getSelf);

  const cartProductList = useMemo(() => {
    return Object.values(cartProducts);
  }, [cartProducts]);

  const renderAddress = () => {
    let content;
    if (activeOrderAddress) {
      content = <AddressCard address={activeOrderAddress} rightContent={renderAddressDropdownMenu()} />;
    } else {
      content = (
        <S.AddressContent>
          <EmptyPage
            bottomText="Add your address to display."
            graphic={EmptyAddress}
            topText="Sorry! You haven’t add your address yet."
            size={200}
          />
        </S.AddressContent>
      );
    }
    return (
      <>
        <S.Address>
          <S.Box>
            <S.Heading>Address</S.Heading>
            <div>
              <Button onClick={toggleAddressSelectModal} text="Change Address" />
            </div>
          </S.Box>
          {content}
        </S.Address>
        {addressEditModalIsOpen ? <BuyAddressDetailsModal close={setAddressEditModalIsOpen} isCheckout={true} /> : null}
      </>
    );
  };

  const handleEditClick = () => {
    dispatch(updateManager({activeAddress: activeOrderAddress}));
    setAddressEditModalIsOpen();
  };

  const renderAddressDropdownMenu = () => {
    const menuOptions = [{label: 'Edit', menuIcon: mdiSquareEditOutline, onClick: handleEditClick}];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderCartProducts = () => {
    const _cartProducts = cartProductList.map((cartProduct) => (
      <CartProduct cartProduct={cartProduct} key={cartProduct.id} />
    ));
    return <S.CartProducts>{_cartProducts}</S.CartProducts>;
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.LeftTop>
          {renderAddress()}
          {renderParticipants()}
        </S.LeftTop>
        {renderProducts()}
      </S.Left>
    );
  };

  const renderParticipants = () => {
    const content = !!cartProductList.length ? (
      <S.User>
        <UserLabel avatar={self.avatar} description="BUYER" id={self.id} username={self.username!} />
        {cartSeller && (
          <S.UserLabel
            avatar={cartSeller.avatar}
            description="SELLER"
            id={cartSeller.id}
            username={cartSeller.username}
          />
        )}
      </S.User>
    ) : (
      <>
        <EmptyPage graphic={EmptyParticipants} topText="No buyer or seller to display." bottomText="" size={200} />
      </>
    );

    return (
      <S.Participants>
        <S.Heading>Participants</S.Heading>
        {content}
      </S.Participants>
    );
  };

  const renderProducts = () => {
    const content = !!cartProductList.length ? (
      renderCartProducts()
    ) : (
      <EmptyPage
        bottomText="Add products to sell."
        graphic={EmptyProduct}
        topText="Sorry! You haven’t add products yet."
        size={300}
      />
    );

    return (
      <>
        <S.Div>
          <S.Heading>
            Products — <span>{cartProductList.length}</span>
          </S.Heading>
          {content}
        </S.Div>
      </>
    );
  };

  const renderRight = () => {
    return (
      <S.Right>
        <S.Heading>Order Summary</S.Heading>
        <PaymentDetails />
      </S.Right>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderLeft()}
        {renderRight()}
      </S.Container>
      {addressSelectModalIsOpen ? <AddressSelectModal close={toggleAddressSelectModal} /> : null}
    </>
  );
};

export default BuyCheckout;
