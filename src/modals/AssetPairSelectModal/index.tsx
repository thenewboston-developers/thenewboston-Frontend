import {useEffect, useState} from 'react';

import {getAssetPairs} from 'api/assetPairs';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody} from 'components/Modal';
import RadioCard from 'components/RadioCard';
import {ToastType} from 'enums';
import {AssetPair, PaginatedResponse, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface AssetPairSelectModalProps {
  close(): void;
  activeAssetPair: AssetPair | null;
  handleChange(assetPairId: string): void;
}

const AssetPairSelectModal: SFC<AssetPairSelectModalProps> = ({className, close, activeAssetPair, handleChange}) => {
  const [animationType, setAnimationType] = useState<'select' | 'deselect' | null>(null);
  const [assetPairsData, setAssetPairsData] = useState<PaginatedResponse<AssetPair> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 12;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getAssetPairs({page: currentPage, page_size: pageSize});
        setAssetPairsData(data);
      } catch (error) {
        displayErrorToast('Error fetching asset pairs');
        setAssetPairsData(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

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

  const handleAssetPairClick = (assetPair: AssetPair) => {
    setAnimationType('select');
    displayToast(`${assetPair.primary_currency.ticker} selected`, ToastType.SUCCESS);
    handleChange(assetPair.id.toString());
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!assetPairsData || !assetPairsData.results.length) return <EmptyText>No asset pairs available</EmptyText>;

    return (
      <>
        <S.RadioCardContainer>
          {assetPairsData.results.map((_assetPair) => {
            return (
              <RadioCard
                currency={_assetPair.primary_currency}
                isSelected={activeAssetPair?.id === _assetPair.id}
                key={_assetPair.id}
                onAnimationComplete={handleAnimationComplete}
                onClick={() => handleAssetPairClick(_assetPair)}
              />
            );
          })}
        </S.RadioCardContainer>
        <S.Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(assetPairsData.count / pageSize)}
        />
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Asset Pairs">
      <ModalBody>{renderContent()}</ModalBody>
    </S.Modal>
  );
};

export default AssetPairSelectModal;
