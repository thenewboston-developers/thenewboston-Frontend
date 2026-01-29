import {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {getConnectFiveLeaderboard} from 'api/connectFive';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ConnectFiveLeaderboardEntry, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const PAGE_SIZE = 25;

const ConnectFiveLeaderboard: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState<ConnectFiveLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const loadLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getConnectFiveLeaderboard({page: currentPage});
      setEntries(response.results);
      setTotalPages(Math.max(Math.ceil(response.count / PAGE_SIZE), 1));
    } catch (error) {
      displayErrorToast('Unable to load leaderboard.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const renderLeaderboardTable = () => {
    if (isLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }

    if (!entries.length) {
      return <EmptyText>No ranked players yet.</EmptyText>;
    }

    return (
      <S.TableWrapper>
        <S.Table>
          <S.TableHeader>
            <S.TableRow>
              <S.TableHead>Rank</S.TableHead>
              <S.TableHead>Player</S.TableHead>
              <S.TableHead>Elo</S.TableHead>
              <S.TableHead>Record</S.TableHead>
            </S.TableRow>
          </S.TableHeader>
          <S.TableBody>
            {entries.map((entry, index) => {
              const rank = (currentPage - 1) * PAGE_SIZE + index + 1;

              return (
                <S.TableRow key={entry.user.id}>
                  <S.TableData>{`#${rank}`}</S.TableData>
                  <S.TableData>
                    <S.UserCell>
                      <Link to={`/profile/${entry.user.id}`}>
                        <S.Avatar size="40px" src={entry.user.avatar} />
                      </Link>
                      <S.Username as={Link} to={`/profile/${entry.user.id}`}>
                        {entry.user.username}
                      </S.Username>
                    </S.UserCell>
                  </S.TableData>
                  <S.TableData>{entry.elo}</S.TableData>
                  <S.TableData>
                    <S.Record>{`${entry.wins}W - ${entry.losses}L`}</S.Record>
                  </S.TableData>
                </S.TableRow>
              );
            })}
          </S.TableBody>
        </S.Table>
      </S.TableWrapper>
    );
  };

  return (
    <S.Container className={className}>
      <S.Content>
        {renderLeaderboardTable()}
        <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </S.Content>
    </S.Container>
  );
};

export default ConnectFiveLeaderboard;
