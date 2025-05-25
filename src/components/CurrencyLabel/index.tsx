import {useDispatch, useSelector} from 'react-redux';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';
import {deleteCurrency} from 'dispatchers/currencies';
import {useToggle} from 'hooks';
import CurrencyModal from 'modals/CurrencyModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Currency, SFC} from 'types';

import CurrencyLogo from 'components/CurrencyLogo';
import DropdownMenu from 'components/DropdownMenu';
import Line from 'components/Line';

import * as S from './Styles';

export interface CurrencyDetailProps {
  currency: Currency;
}

const CurrencyDetail: SFC<CurrencyDetailProps> = ({className, currency}) => {
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleDelete = async () => {
    await dispatch(deleteCurrency(currency.id));
  };

  const menuOptions = [
    {
      label: 'Edit',
      menuIcon: mdiSquareEditOutline,
      onClick: toggleCurrencyModal,
    },
    {
      label: 'Delete',
      menuIcon: mdiDeleteOutline,
      onClick: handleDelete,
    },
  ];

  const renderDropdownMenu = () => {
    if (currency.owner !== self.id) return null;
    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };
  return (
    <>
      <S.Container className={className}>
        <S.Box>
          <S.BoxLeft>
            <CurrencyLogo logo={currency.logo} />
            <S.Text>
              <S.Ticker>{currency.ticker}</S.Ticker>
            </S.Text>
          </S.BoxLeft>
          {renderDropdownMenu()}
        </S.Box>
        <Line />
        <S.Domain>{currency.domain}</S.Domain>
      </S.Container>
      {currencyModalIsOpen ? <CurrencyModal close={toggleCurrencyModal} currency={currency} /> : null}
    </>
  );
};

export default CurrencyDetail;
