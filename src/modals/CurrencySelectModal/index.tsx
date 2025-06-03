import {useDispatch, useSelector} from 'react-redux';

import {ToastType} from 'enums';
import {getCurrencies, getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface CurrencySelectModalProps {
  close(): void;
}

const CurrencySelectModal: SFC<CurrencySelectModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector(getCurrencies);
  const manager = useSelector(getManager);

  const handleCurrencyClick = (currencyId: number) => {
    const currency = currencies[currencyId];
    const isCurrentlySelected = manager.activeCommentCurrency?.id === currencyId;

    if (isCurrentlySelected) {
      dispatch(updateManager({activeCommentCurrency: null}));
      displayToast(`${currency.ticker} deselected`, ToastType.SUCCESS);
      close();
    } else {
      dispatch(updateManager({activeCommentCurrency: currency}));
      displayToast(`${currency.ticker} selected`, ToastType.SUCCESS);

      setTimeout(() => {
        close();
      }, 1000);
    }
  };

  const renderRadioCards = () => {
    return (
      <>
        {Object.values(currencies).map((_currency) => {
          return (
            <S.RadioCardWrapper
              key={_currency.id}
              currency={_currency}
              isSelected={manager.activeCommentCurrency?.id === _currency.id}
              onClick={() => handleCurrencyClick(_currency.id)}
              showAnimation={true}
            />
          );
        })}
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Currencies">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
    </S.Modal>
  );
};

export default CurrencySelectModal;
