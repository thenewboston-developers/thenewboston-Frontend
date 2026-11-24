import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';

import {StandingsBoard, StandingsPlayer, StandingsRank} from '../../Standings';
import * as Standings from '../../Standings/Styles';
import {StoneLoader, StoneRow} from '../../Stones';
import {getWinningLineLinks, isInWinningLine} from '../../Stones/utils';

import * as S from './Styles';

// The lobby's rewards leaderboard. Its top five ranks are the gold stones of one winning line.
const TopEarners = () => {
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings('connect_five');
  const entries = data?.results ?? [];
  const links = getWinningLineLinks(entries.map((entry) => entry.rank));

  const renderStandings = () => {
    if (loading) {
      return (
        <Standings.Message role="status">
          <StoneLoader />
          <span>Counting the stones…</span>
        </Standings.Message>
      );
    }

    if (error) {
      return (
        <Standings.Message role="alert">
          <span>We couldn’t load the leaderboard.</span>
          <Standings.Retry onClick={retry} type="button">
            Try again
          </Standings.Retry>
        </Standings.Message>
      );
    }

    if (!entries.length) {
      return (
        <Standings.Empty>
          <StoneRow filled={0} size={16} />
          <strong>The first spot is up for grabs.</strong>
          <p>Win an eligible computer game with an account to earn TNB while the fund has coins.</p>
        </Standings.Empty>
      );
    }

    return (
      <>
        <Standings.Table>
          <caption>
            TNB rewards paid to players in Connect Five. Equal earnings share a rank, and the top five ranks form the
            winning line.
          </caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Player</th>
              <S.AmountHead scope="col">TNB earned</S.AmountHead>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              const inLine = isInWinningLine(entry.rank);
              const wins = entry.rewarded_wins;

              return (
                <Standings.Row $inLine={inLine} key={entry.user.id}>
                  <StandingsRank lineAbove={links[index].above} lineBelow={links[index].below} rank={entry.rank} />
                  <td>
                    <StandingsPlayer
                      description={`${wins.toLocaleString()} rewarded ${wins === 1 ? 'win' : 'wins'}`}
                      inLine={inLine}
                      user={entry.user}
                    />
                  </td>
                  <td>
                    <S.Amount>
                      {entry.total_earned.toLocaleString()}
                      <small>TNB</small>
                    </S.Amount>
                  </td>
                </Standings.Row>
              );
            })}
          </tbody>
        </Standings.Table>
        <Standings.Footer>
          <Standings.Note>Paid rewards only. Guest games and player stakes aren’t included.</Standings.Note>
          <Standings.Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
        </Standings.Footer>
      </>
    );
  };

  return (
    <StandingsBoard
      description="Real wins. Real rewards. All-time TNB paid from the community game fund for Connect Five wins."
      eyebrow="Top earners"
      id="top-earners"
      period="All time"
      title="The winning line"
      titleId="connect-five-earners-title"
    >
      {renderStandings()}
    </StandingsBoard>
  );
};

export default TopEarners;
