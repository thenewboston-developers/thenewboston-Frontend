import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getConnectFiveLeaderboard} from 'api/connectFive';
import {getSelf} from 'selectors/state';
import {ConnectFiveLeaderboardEntry, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import {StandingsBoard, StandingsPlayer, StandingsRank} from '../Standings';
import * as Standings from '../Standings/Styles';
import {StoneLoader, StoneRow} from '../Stones';
import {getWinningLineLinks, isInWinningLine} from '../Stones/utils';

import * as S from './Styles';

const PAGE_SIZE = 25;

const ConnectFiveLeaderboard: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState<ConnectFiveLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const self = useSelector(getSelf);

  // The list is ordered by ELO, so a player's rank is their position across the pages
  const ranks = entries.map((_, index) => (currentPage - 1) * PAGE_SIZE + index + 1);
  const links = getWinningLineLinks(ranks);

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

  const renderStandings = () => {
    if (isLoading) {
      return (
        <Standings.Message role="status">
          <StoneLoader />
          <span>Counting the stones…</span>
        </Standings.Message>
      );
    }

    if (!entries.length) {
      return (
        <Standings.Empty>
          <StoneRow filled={0} size={16} />
          <strong>No ranked players yet.</strong>
          <p>Win a ranked match against another member to take the first spot.</p>
        </Standings.Empty>
      );
    }

    return (
      <Standings.Table>
        <caption>
          Players ranked by the ELO of their ranked multiplayer matches. The top five ranks form the winning line.
        </caption>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Player</th>
            <S.EloHead scope="col">ELO</S.EloHead>
            <S.RecordHead scope="col">Record</S.RecordHead>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => {
            const inLine = isInWinningLine(ranks[index]);
            const record = `${entry.wins}W – ${entry.losses}L`;

            return (
              <Standings.Row $inLine={inLine} $isSelf={!!self?.id && entry.user.id === self.id} key={entry.user.id}>
                <StandingsRank lineAbove={links[index].above} lineBelow={links[index].below} rank={ranks[index]} />
                <td>
                  <StandingsPlayer inLine={inLine} isSelf={!!self?.id && entry.user.id === self.id} user={entry.user} />
                </td>
                <S.EloCell>
                  <S.Elo $inLine={inLine}>{entry.elo}</S.Elo>
                  <S.StackedRecord>{record}</S.StackedRecord>
                </S.EloCell>
                <S.RecordCell>{record}</S.RecordCell>
              </Standings.Row>
            );
          })}
        </tbody>
      </Standings.Table>
    );
  };

  return (
    <S.Container className={className}>
      <S.Content>
        <StandingsBoard
          description="Ranked multiplayer matches move your rating. The five highest rated players form the winning line."
          eyebrow="Ranked multiplayer"
          isPageTitle
          title="ELO leaderboard"
          titleId="connect-five-elo-title"
        >
          {renderStandings()}
          {totalPages > 1 && (
            <Standings.Footer>
              <Standings.Note>
                Page {currentPage} of {totalPages}
              </Standings.Note>
              <Standings.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
            </Standings.Footer>
          )}
        </StandingsBoard>
      </S.Content>
    </S.Container>
  );
};

export default ConnectFiveLeaderboard;
