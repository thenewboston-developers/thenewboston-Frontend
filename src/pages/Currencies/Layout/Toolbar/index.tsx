import Button from 'components/Button';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {useToggle} from 'hooks';
import CurrencyModal from 'modals/CurrencyModal';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);

  return (
    <>
      <S.Container className={className}>
        <S.MenuItems>
          <ToolbarMenuLink text="Home" to="/currencies/home" />
          <ToolbarMenuLink text="Learn More" to="/currencies/learn-more" />
        </S.MenuItems>
        <Button onClick={toggleCurrencyModal} text="Create Currency" />
      </S.Container>
      {currencyModalIsOpen ? <CurrencyModal close={toggleCurrencyModal} /> : null}
    </>
  );
};

export default Toolbar;
