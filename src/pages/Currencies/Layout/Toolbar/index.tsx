import Button from 'components/Button';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {useToggle} from 'hooks';
import CurrencyModal from 'modals/CurrencyModal';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);

  const renderButton = () => {
    return <Button onClick={toggleCurrencyModal} text="Create Currency" />;
  };

  return (
    <>
      <S.Container className={className}>
        <S.Center>
          <ToolbarMenuLink text="Home" to="/currencies/home" />
          <ToolbarMenuLink text="Learn More" to="/currencies/learn-more" />
        </S.Center>
        <S.ButtonContainer>{renderButton()}</S.ButtonContainer>
      </S.Container>
      {currencyModalIsOpen ? <CurrencyModal close={toggleCurrencyModal} /> : null}
    </>
  );
};

export default Toolbar;
