import {useSelector} from 'react-redux';

import Loader from 'components/Loader';
import {getMints as getMintsSelector} from 'selectors/state';
import {Currency, Mint, PaginatedResponse, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

interface MintSectionProps {
  currency: Currency;
  currentPage: number;
  loadingMints: boolean;
  mintsData: PaginatedResponse<Mint> | null;
  onPageChange: (page: number) => void;
}

const MintSection: SFC<MintSectionProps> = ({
  className,
  currency,
  currentPage,
  loadingMints,
  mintsData,
  onPageChange,
}) => {
  const mints = useSelector(getMintsSelector);

  const renderMintsList = () => {
    if (loadingMints) return <Loader />;

    if (!mintsData || mintsData.results.length === 0) {
      const isExternalCurrency = currency.domain !== null;

      if (isExternalCurrency) {
        return (
          <S.EmptyState>
            <S.EmptyText>External currency</S.EmptyText>
            <S.EmptySubtext>Minting is managed by {currency.domain}</S.EmptySubtext>
          </S.EmptyState>
        );
      }

      return (
        <S.EmptyState>
          <S.EmptyText>No minting history yet</S.EmptyText>
          <S.EmptySubtext>Minted coins will appear here</S.EmptySubtext>
        </S.EmptyState>
      );
    }

    const mintsList = Object.values(mints)
      .filter((mint) => mint.currency === currency.id)
      .sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

    return (
      <>
        <S.Table>
          <S.TableHeader>
            <S.TableRow>
              <S.TableHead>Amount</S.TableHead>
              <S.TableHead>Date</S.TableHead>
            </S.TableRow>
          </S.TableHeader>
          <S.TableBody>
            {mintsList.map((mint) => (
              <S.TableRow key={mint.id}>
                <S.TableData>
                  <S.Amount>{mint.amount.toLocaleString()}</S.Amount>
                </S.TableData>
                <S.TableData>
                  <S.Date>{longDate(mint.created_date)}</S.Date>
                </S.TableData>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
        {mintsData.count > 20 && (
          <S.Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={Math.ceil(mintsData.count / 20)}
          />
        )}
      </>
    );
  };

  return <S.Container className={className}>{renderMintsList()}</S.Container>;
};

export default MintSection;
