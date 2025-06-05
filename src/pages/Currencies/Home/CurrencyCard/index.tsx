import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import {getCurrency} from 'api/currencies';
import CurrencyLogo from 'components/CurrencyLogo';
import DropdownMenu from 'components/DropdownMenu';
import Line from 'components/Line';
import {deleteCurrency} from 'dispatchers/currencies';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import CurrencyEditModal from 'modals/CurrencyEditModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Currency, CurrencyReadDetailSerializer, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency}) => {
  const [currencyEditModalIsOpen, toggleCurrencyEditModal] = useToggle(false);
  const [fullCurrency, setFullCurrency] = useState<CurrencyReadDetailSerializer | null>(null);
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

  const handleEditClick = async () => {
    try {
      const data = await getCurrency(currency.id);
      setFullCurrency(data);
      toggleCurrencyEditModal();
    } catch (error) {
      displayErrorToast('Error loading currency details');
    }
  };

  const handleTickerClick = () => {
    navigate(`/currencies/${currency.id}`);
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: handleEditClick,
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
            {currency.domain ? <S.Domain>{currency.domain}</S.Domain> : <S.InternalBadge>Internal</S.InternalBadge>}
          </S.DomainRow>
        </S.LabelContainer>
      </S.Container>
      {currencyEditModalIsOpen && fullCurrency && (
        <CurrencyEditModal close={toggleCurrencyEditModal} currency={fullCurrency} />
      )}
    </>
  );
};

export default CurrencyCard;
