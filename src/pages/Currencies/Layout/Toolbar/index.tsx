import Button from 'components/Button';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {useToggle} from 'hooks';
import CurrencyCreateModal from 'modals/CurrencyCreateModal';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  const [currencyCreateModalIsOpen, toggleCurrencyCreateModal] = useToggle(false);

  const renderButton = () => {
    return <Button onClick={toggleCurrencyCreateModal} text="Create Currency" />;
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
      {currencyCreateModalIsOpen ? <CurrencyCreateModal close={toggleCurrencyCreateModal} /> : null}
    </>
  );
};

export default Toolbar;
