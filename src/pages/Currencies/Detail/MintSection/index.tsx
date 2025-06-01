import {useSelector} from 'react-redux';

import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import Loader from 'components/Loader';
import {getMints as getMintsSelector} from 'selectors/state';
import {CurrencyReadDetailSerializer, Mint, PaginatedResponse, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

interface MintSectionProps {
  currency: CurrencyReadDetailSerializer;
  mintsData: PaginatedResponse<Mint> | null;
  loadingMints: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onMintSuccess: () => void;
}

const MintSection: SFC<MintSectionProps> = ({
  className,
  currency,
  mintsData,
  loadingMints,
  currentPage,
  onPageChange,
  onMintSuccess,
}) => {
  const mints = useSelector(getMintsSelector);

  const renderMintsList = () => {
    if (loadingMints) return <Loader />;

    if (!mintsData || mintsData.results.length === 0) {
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
          <S.Pagination>
            {mintsData.previous && (
              <Button onClick={() => onPageChange(currentPage - 1)} text="Previous" color={ButtonColor.secondary} />
            )}
            <S.PageInfo>
              Page {currentPage} of {Math.ceil(mintsData.count / 20)}
            </S.PageInfo>
            {mintsData.next && <Button onClick={() => onPageChange(currentPage + 1)} text="Next" />}
          </S.Pagination>
        )}
      </>
    );
  };

  return <S.Container className={className}>{renderMintsList()}</S.Container>;
};

export default MintSection;
