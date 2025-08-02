import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Loader from 'components/Loader';
import RadioCard from 'components/RadioCard';
import {getCurrencies} from 'dispatchers/currencies';
import {ToastType} from 'enums';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, Currency, PaginatedResponse, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface CurrencySelectModalProps {
  close(): void;
}

const CurrencySelectModal: SFC<CurrencySelectModalProps> = ({className, close}) => {
  const [animationType, setAnimationType] = useState<'select' | 'deselect' | null>(null);
  const [currenciesData, setCurrenciesData] = useState<PaginatedResponse<Currency> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const pageSize = 10;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await dispatch(getCurrencies({page: currentPage, page_size: pageSize}));
        setCurrenciesData(data);
      } catch (error) {
        displayErrorToast('Error fetching currencies');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, dispatch]);

  const handleCurrencyClick = (currency: Currency) => {
    const isCurrentlySelected = manager.activeCommentCurrency?.id === currency.id;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!currenciesData || !currenciesData.results.length) return <div>No currencies available</div>;

    return (
      <>
        <S.RadioCardContainer>
          {currenciesData.results.map((_currency) => {
            return (
              <RadioCard
                currency={_currency}
                isSelected={manager.activeCommentCurrency?.id === _currency.id}
                key={_currency.id}
                onAnimationComplete={handleAnimationComplete}
                onClick={() => handleCurrencyClick(_currency)}
              />
            );
          })}
        </S.RadioCardContainer>
        <S.Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(currenciesData.count / pageSize)}
        />
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Currencies">
      {renderContent()}
    </S.Modal>
  );
};

export default CurrencySelectModal;
