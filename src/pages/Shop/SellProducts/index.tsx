import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import SectionHeading from 'components/SectionHeading';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const SellProducts: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    dispatch(updateManager({activeProduct: null}));
    navigate('/shop/sell/createEditProduct');
  };

  const renderButton = () => {
    return <Button onClick={handleButtonClick} text="Add" />;
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="Products" rightContent={renderButton()} />
    </S.Container>
  );
};

export default SellProducts;
