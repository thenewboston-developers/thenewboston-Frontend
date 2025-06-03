import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createWallet} from 'dispatchers/wallets';
import {useAvailableWalletCurrencies} from 'hooks';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface WalletCreateModalProps {
  close(): void;
}

const WalletCreateModal: SFC<WalletCreateModalProps> = ({className, close}) => {
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(null);
  const availableWalletCurrencies = useAvailableWalletCurrencies();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleButtonClick = async () => {
    try {
      // TODO: Add loading state for the button
      await dispatch(
        createWallet({
          currency: selectedCurrencyId!,
          owner: self.id!,
        }),
      );
      close();
    } catch (error) {
      displayErrorToast('Error creating wallet');
    }
  };

  const handleRadioCardClick = (currencyId: number) => {
    setSelectedCurrencyId(currencyId === selectedCurrencyId ? null : currencyId);
  };

  const renderRadioCards = () => {
    return availableWalletCurrencies.map((currency) => (
      <S.RadioCardWrapper
        key={currency.id}
        currency={currency}
        isSelected={selectedCurrencyId === currency.id}
        onClick={() => handleRadioCardClick(currency.id)}
      />
    ));
  };

  return (
    <S.Modal className={className} close={close} header="Create Wallet">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
      <S.Button disabled={selectedCurrencyId === null} onClick={handleButtonClick} text="Submit" />
    </S.Modal>
  );
};

export default WalletCreateModal;
