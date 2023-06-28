import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createWallet} from 'dispatchers/wallets';
import {useAvailableWalletCores} from 'hooks';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import RadioCard from './RadioCard';
import * as S from './Styles';

export interface CreateWalletModalProps {
  close(): void;
}

const CreateWalletModal: SFC<CreateWalletModalProps> = ({className, close}) => {
  const [selectedCoreId, setSelectedCoreId] = useState<number | null>(null);
  const availableWalletCores = useAvailableWalletCores();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleButtonClick = async () => {
    try {
      await dispatch(
        createWallet({
          core: selectedCoreId!,
          owner: self.id!,
        }),
      );
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating wallet');
    }
  };

  const handleRadioCardClick = (coreId: number) => {
    setSelectedCoreId(coreId === selectedCoreId ? null : coreId);
  };

  const renderRadioCards = () => {
    return availableWalletCores.map((core) => (
      <RadioCard
        activeCoreId={selectedCoreId}
        core={core}
        handleRadioCardClick={() => handleRadioCardClick(core.id)}
        key={core.id}
      />
    ));
  };

  return (
    <S.Modal className={className} close={close} header="Create Wallet">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
      <S.ButtonContainer>
        <S.Button disabled={selectedCoreId === null} onClick={handleButtonClick} text="Submit" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default CreateWalletModal;
