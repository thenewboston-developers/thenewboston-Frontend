import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import CurrencyLogo from 'components/CurrencyLogo';
import DropdownMenu from 'components/DropdownMenu';
import Line from 'components/Line';
import {deleteCurrency} from 'dispatchers/currencies';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import CurrencyModal from 'modals/CurrencyModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Currency, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency}) => {
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCurrency(currency.id));
      displayToast('Currency deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting currency');
    }
  };

  const handleTickerClick = () => {
    navigate(`/currencies/${currency.id}`);
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: toggleCurrencyModal,
    },
    {
      label: 'Delete',
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
        <S.LabelContainer>
          <S.Box>
            <S.BoxLeft>
              <CurrencyLogo logo={currency.logo} />
              <S.Text>
                <S.Ticker onClick={handleTickerClick}>{currency.ticker}</S.Ticker>
              </S.Text>
            </S.BoxLeft>
            {renderDropdownMenu()}
          </S.Box>
          <Line />
          <S.DomainRow>
            <S.Domain>{currency.domain || 'Internal Currency'}</S.Domain>
            {currency.domain === null && <S.InternalBadge>Internal</S.InternalBadge>}
          </S.DomainRow>
        </S.LabelContainer>
      </S.Container>
      {currencyModalIsOpen ? <CurrencyModal close={toggleCurrencyModal} currency={currency} /> : null}
    </>
  );
};

export default CurrencyCard;
