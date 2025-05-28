import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getCurrency} from 'api/currencies';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import {getMints} from 'dispatchers/mints';
import {useToggle} from 'hooks';
import MintModal from 'modals/MintModal';
import {getMints as getMintsSelector, getSelf} from 'selectors/state';
import {AppDispatch, Currency, Mint, PaginatedResponse, SFC} from 'types';
import {longDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const mints = useSelector(getMintsSelector);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(true);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);
  const [loadingMints, setLoadingMints] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mintModalIsOpen, toggleMintModal] = useToggle(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getCurrency(parseInt(id));
        setCurrency(data);
      } catch (error) {
        displayErrorToast('Error loading currency');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!currency) return;

    (async () => {
      setLoadingMints(true);
      try {
        const data = await dispatch(getMints({currency: currency.id, page: currentPage}));
        setMintsData(data);
      } catch (error) {
        displayErrorToast('Error loading mints');
      } finally {
        setLoadingMints(false);
      }
    })();
  }, [currency, currentPage, dispatch]);

  const handleMintSuccess = async () => {
    if (!currency) return;
    const data = await dispatch(getMints({currency: currency.id, page: 1}));
    setMintsData(data);
    setCurrentPage(1);
  };

  const handleBack = () => {
    navigate('/currencies/home');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderMintsList = () => {
    if (loadingMints) return <Loader />;

    if (!mintsData || mintsData.results.length === 0) {
      return (
        <S.EmptyMints>
          <S.EmptyMintsText>No minting history yet</S.EmptyMintsText>
          <S.EmptyMintsSubtext>Minted coins will appear here</S.EmptyMintsSubtext>
        </S.EmptyMints>
      );
    }

    const mintsList = Object.values(mints)
      .filter((mint) => mint.currency === currency?.id)
      .sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

    return (
      <>
        <S.MintsTable>
          <S.MintsTableHeader>
            <S.MintsTableRow>
              <S.MintsTableHead>Amount</S.MintsTableHead>
              <S.MintsTableHead>Date</S.MintsTableHead>
            </S.MintsTableRow>
          </S.MintsTableHeader>
          <S.MintsTableBody>
            {mintsList.map((mint) => (
              <S.MintsTableRow key={mint.id}>
                <S.MintsTableData>
                  <S.MintAmount>{mint.amount.toLocaleString()}</S.MintAmount>
                </S.MintsTableData>
                <S.MintsTableData>
                  <S.MintDate>{longDate(mint.created_date)}</S.MintDate>
                </S.MintsTableData>
              </S.MintsTableRow>
            ))}
          </S.MintsTableBody>
        </S.MintsTable>
        {mintsData.count > 20 && (
          <S.Pagination>
            {mintsData.previous && (
              <Button onClick={() => handlePageChange(currentPage - 1)} text="Previous" color={ButtonColor.secondary} />
            )}
            <S.PageInfo>
              Page {currentPage} of {Math.ceil(mintsData.count / 20)}
            </S.PageInfo>
            {mintsData.next && <Button onClick={() => handlePageChange(currentPage + 1)} text="Next" />}
          </S.Pagination>
        )}
      </>
    );
  };

  const isInternalCurrency = currency?.domain === null;
  const isOwner = currency?.owner === self.id;

  if (loading) return <Loader />;
  if (!currency)
    return (
      <EmptyPage
        bottomText="The requested currency could not be found"
        graphic={LeavesEmptyState}
        topText="Currency not found"
      />
    );

  return (
    <>
      <S.Container className={className}>
        <S.Header>
          <S.BackButton onClick={handleBack}>
            <Icon icon={mdiArrowLeft} size={20} />
            <span>Back to Currencies</span>
          </S.BackButton>
        </S.Header>

        <S.Content>
          <S.CurrencyPanel>
            <S.CurrencyLogo logo={currency.logo} width="96px" />
            <S.CurrencyContent>
              <S.CurrencyHeader>
                <S.CurrencyHeaderInfo>
                  <S.CurrencyName>{currency.ticker}</S.CurrencyName>
                  {currency.domain ? (
                    <S.CurrencyDomain>{currency.domain}</S.CurrencyDomain>
                  ) : (
                    <S.TypeBadge $internal={isInternalCurrency}>
                      {isInternalCurrency ? 'Internal' : 'External'}
                    </S.TypeBadge>
                  )}
                  <S.OwnerInfo>Owner ID: {currency.owner}</S.OwnerInfo>
                </S.CurrencyHeaderInfo>
              </S.CurrencyHeader>
            </S.CurrencyContent>
          </S.CurrencyPanel>

          <S.SectionHeader>
            <S.SectionTitle>Minting History</S.SectionTitle>
            {isOwner && isInternalCurrency && <Button onClick={toggleMintModal} text="Mint" />}
          </S.SectionHeader>
          {renderMintsList()}
        </S.Content>
      </S.Container>
      {mintModalIsOpen && currency ? (
        <MintModal close={toggleMintModal} currency={currency} onSuccess={handleMintSuccess} />
      ) : null}
    </>
  );
};

export default Detail;
