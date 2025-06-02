import {useEffect, useState} from 'react';

import {getCurrencyBalances} from 'api/currencyBalances';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import Loader from 'components/Loader';
import UserLabel from 'components/UserLabel';
import {CurrencyBalance, CurrencyReadDetailSerializer, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface BalancesSectionProps {
  currency: CurrencyReadDetailSerializer;
}

const BalancesSection: SFC<BalancesSectionProps> = ({className, currency}) => {
  const [balancesData, setBalancesData] = useState<PaginatedResponse<CurrencyBalance> | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getCurrencyBalances({
          currency: currency.id,
          page: currentPage,
          page_size: 20,
        });
        setBalancesData(data);
      } catch (error) {
        displayErrorToast('Error loading balances');
      } finally {
        setLoading(false);
      }
    })();
  }, [currency.id, currentPage]);

  const handlePageButtonClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderBalancesList = () => {
    if (loading) return <Loader />;

    if (!balancesData || balancesData.results.length === 0) {
      return (
        <S.EmptyState>
          <S.EmptyText>No balances yet</S.EmptyText>
          <S.EmptySubtext>User balances will appear here</S.EmptySubtext>
        </S.EmptyState>
      );
    }

    return (
      <>
        <S.Table>
          <S.TableHeader>
            <S.TableRow>
              <S.TableHead>User</S.TableHead>
              <S.TableHead>Balance</S.TableHead>
            </S.TableRow>
          </S.TableHeader>
          <S.TableBody>
            {balancesData.results.map((currencyBalance) => (
              <S.TableRow key={currencyBalance.owner.id}>
                <S.TableData>
                  <UserLabel
                    avatar={currencyBalance.owner.avatar}
                    description=""
                    id={currencyBalance.owner.id}
                    username={currencyBalance.owner.username}
                  />
                </S.TableData>
                <S.TableData>
                  <S.Balance>{currencyBalance.balance.toLocaleString()}</S.Balance>
                </S.TableData>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
        {balancesData.count > 20 && (
          <S.Pagination>
            {balancesData.previous && (
              <Button
                color={ButtonColor.secondary}
                onClick={() => handlePageButtonClick(currentPage - 1)}
                text="Previous"
              />
            )}
            <S.PageInfo>
              Page {currentPage} of {Math.ceil(balancesData.count / 20)}
            </S.PageInfo>
            {balancesData.next && <Button onClick={() => handlePageButtonClick(currentPage + 1)} text="Next" />}
          </S.Pagination>
        )}
      </>
    );
  };

  return <S.Container className={className}>{renderBalancesList()}</S.Container>;
};

export default BalancesSection;
