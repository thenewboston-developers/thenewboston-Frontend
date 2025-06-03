import {useState} from 'react';
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
  const [animationType, setAnimationType] = useState<'select' | 'deselect' | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector(getCurrencies);
  const manager = useSelector(getManager);

  const handleCurrencyClick = (currencyId: number) => {
    const currency = currencies[currencyId];
    const isCurrentlySelected = manager.activeCommentCurrency?.id === currencyId;

    if (isCurrentlySelected) {
      // Start deselection
      setAnimationType('deselect');
      dispatch(updateManager({activeCommentCurrency: null}));
      displayToast(`${currency.ticker} deselected`, ToastType.SUCCESS);
    } else {
      // Start selection
      setAnimationType('select');
      dispatch(updateManager({activeCommentCurrency: currency}));
      displayToast(`${currency.ticker} selected`, ToastType.SUCCESS);
    }
  };

  const handleAnimationComplete = () => {
    if (animationType === 'select') {
      // For selection, wait to complete 1 second total
      setTimeout(() => {
        close();
      }, 500);
    } else if (animationType === 'deselect') {
      // For deselection, close faster (0.2s animation + 0.3s delay = 0.5s total)
      setTimeout(() => {
        close();
      }, 300);
    }
    setAnimationType(null);
  };

  const renderRadioCards = () => {
    return (
      <>
        {Object.values(currencies).map((_currency) => {
          return (
            <S.RadioCardWrapper
              currency={_currency}
              isSelected={manager.activeCommentCurrency?.id === _currency.id}
              key={_currency.id}
              onAnimationComplete={handleAnimationComplete}
              onClick={() => handleCurrencyClick(_currency.id)}
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
