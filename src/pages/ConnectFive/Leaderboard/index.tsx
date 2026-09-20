import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getConnectFiveLeaderboard} from 'api/connectFive';
import Loader from 'components/Loader';
import {getSelf} from 'selectors/state';
import {ConnectFiveLeaderboardEntry, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const PAGE_SIZE = 25;

const ConnectFiveLeaderboard: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState<ConnectFiveLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const self = useSelector(getSelf);

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
        <S.LoaderPanel>
          <Loader />
        </S.LoaderPanel>
      );
    }

    if (!entries.length) {
      return <S.EmptyText>No ranked players yet.</S.EmptyText>;
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
              const isSelf = !!self?.id && entry.user.id === self.id;
              const rank = (currentPage - 1) * PAGE_SIZE + index + 1;
              const record = `${entry.wins}W - ${entry.losses}L`;

              return (
                <S.TableRow $isSelf={isSelf} key={entry.user.id}>
                  <S.TableData>
                    <S.Rank>{`#${rank}`}</S.Rank>
                  </S.TableData>
                  <S.TableData>
                    <S.UserCell>
                      <S.UserLabel
                        avatar={entry.user.avatar}
                        avatarSize="40px"
                        description=""
                        id={entry.user.id}
                        username={entry.user.username}
                      />
                      {isSelf && <S.SelfChip>You</S.SelfChip>}
                    </S.UserCell>
                  </S.TableData>
                  <S.TableData>
                    <S.Elo>{entry.elo}</S.Elo>
                    <S.StackedRecord>{record}</S.StackedRecord>
                  </S.TableData>
                  <S.TableData>
                    <S.Record>{record}</S.Record>
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
