import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getCurrencies} from 'api/currencies';
import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody, ModalFooter} from 'components/Modal';
import RadioCard from 'components/RadioCard';
import {createWallet} from 'dispatchers/wallets';
import {WalletTab} from 'enums';
import {getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, Currency, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface WalletCreateModalProps {
  close(): void;
}

const WalletCreateModal: SFC<WalletCreateModalProps> = ({className, close}) => {
  const [currenciesData, setCurrenciesData] = useState<PaginatedResponse<Currency> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const pageSize = 12;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getCurrencies({no_wallet: true, page: currentPage, page_size: pageSize});
        setCurrenciesData(data);
      } catch (error) {
        displayErrorToast('Error fetching available currencies');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

  const handleButtonClick = async () => {
    setSubmitting(true);
    try {
      const wallet = await dispatch(
        createWallet({
          currency: selectedCurrencyId!,
          owner: self.id!,
        }),
      );
      dispatch(
        updateManager({
          activeWallet: wallet,
          activeWalletTab: WalletTab.TRANSFERS,
        }),
      );
      close();
    } catch (error) {
      displayErrorToast('Error creating wallet');
      setSubmitting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRadioCardClick = (currencyId: number) => {
    setSelectedCurrencyId(currencyId === selectedCurrencyId ? null : currencyId);
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!currenciesData || !currenciesData.results.length) return <EmptyText>No currencies available</EmptyText>;

    return (
      <>
        <S.RadioCardContainer>
          {currenciesData.results.map((currency) => (
            <RadioCard
              currency={currency}
              isSelected={selectedCurrencyId === currency.id}
              key={currency.id}
              onClick={() => handleRadioCardClick(currency.id)}
            />
          ))}
        </S.RadioCardContainer>
        {currenciesData.count > pageSize && (
          <S.Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={Math.ceil(currenciesData.count / pageSize)}
          />
        )}
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Create Wallet">
      <ModalBody>{renderContent()}</ModalBody>
      <ModalFooter>
        <Button
          disabled={selectedCurrencyId === null || submitting}
          isSubmitting={submitting}
          onClick={handleButtonClick}
          text="Submit"
        />
      </ModalFooter>
    </S.Modal>
  );
};

export default WalletCreateModal;
