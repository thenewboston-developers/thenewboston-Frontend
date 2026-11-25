import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';
import {GameEarningsEntry} from 'types/gameEarnings';

import {RollingDice} from '../Emblems';
import {backgammon} from '../theme';
import {INITIAL_BOARD} from '../utils';

import * as S from './Styles';

// Like the match board, a point shows five checkers at most and the top one carries the full count
const MAX_POINT_CHECKERS = 5;

// Rewarded wins as checkers stacked on a point; the points alternate coral and ivory down the table
const WinsPoint = ({coral, wins}: {coral: boolean; wins: number}) => {
  const shown = Math.min(wins, MAX_POINT_CHECKERS);
  return (
    <S.WinsPoint aria-hidden="true" focusable="false" viewBox="0 0 124 28">
      <path d="M0 0v28l124-14Z" fill={coral ? backgammon.coral : backgammon.ivory} fillOpacity={0.9} />
      {Array.from({length: shown}, (_, index) => (
        <g key={index} transform={`translate(${12 + index * 19} 14)`}>
          <circle fill={coral ? '#f4ead4' : backgammon.forest} r="10" stroke={coral ? '#8f7c55' : '#0c231f'} />
          <circle fill="none" r="6.2" stroke={coral ? '#b9a77d' : '#6f8f80'} />
          {index === shown - 1 && wins > MAX_POINT_CHECKERS && (
            <text
              dominantBaseline="central"
              fill={coral ? '#3c443c' : '#f5ead0'}
              fontSize={wins > 99 ? 7.5 : 9}
              fontWeight="700"
              textAnchor="middle"
            >
              {wins > 999 ? '999+' : wins}
            </text>
          )}
        </g>
      ))}
    </S.WinsPoint>
  );
};

const EarnerRow = ({entry, index}: {entry: GameEarningsEntry; index: number}) => {
  const profilePath = `/profile/${entry.user.id}`;
  const wins = entry.rewarded_wins;
  const winsLabel = `${wins.toLocaleString()} rewarded ${wins === 1 ? 'win' : 'wins'}`;
  return (
    <S.Row $rank={entry.rank}>
      <td>
        <S.RankChecker $rank={entry.rank}>{entry.rank}</S.RankChecker>
      </td>
      <td>
        <S.Player>
          <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
            <S.Avatar $rank={entry.rank} size="40px" src={entry.user.avatar} />
          </S.AvatarLink>
          <S.Identity>
            <S.Username to={profilePath}>{entry.user.username}</S.Username>
            <S.WinsNote>{winsLabel}</S.WinsNote>
          </S.Identity>
        </S.Player>
      </td>
      <td>
        <S.Wins>
          <WinsPoint coral={index % 2 === 0} wins={wins} />
          <span>{wins.toLocaleString()}</span>
        </S.Wins>
      </td>
      <td>
        <S.Amount>
          {entry.total_earned.toLocaleString()}
          <small>TNB</small>
        </S.Amount>
      </td>
    </S.Row>
  );
};

const Leaderboard = () => {
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings('backgammon');
  const entries = data?.results ?? [];

  return (
    <S.Board aria-labelledby="backgammon-earners-title" id="top-earners">
      <S.Header>
        <S.HeaderCube value={64} />
        <S.Heading>
          <S.Eyebrow>Backgammon rewards leaderboard</S.Eyebrow>
          <S.Title id="backgammon-earners-title">Top of the tables</S.Title>
          <S.Description>
            Real wins. Real rewards. All-time TNB paid from the community game fund for Backgammon wins. Every checker
            on a point is a rewarded win.
          </S.Description>
        </S.Heading>
        <S.Period>All time</S.Period>
      </S.Header>
      {loading && (
        <S.Message role="status">
          <RollingDice />
          <span>Counting the pips…</span>
        </S.Message>
      )}
      {!loading && error && (
        <S.Message role="alert">
          <span>We couldn’t load the leaderboard.</span>
          <S.Retry onClick={retry} type="button">
            Try again
          </S.Retry>
        </S.Message>
      )}
      {!loading && !error && !entries.length && (
        <S.Empty>
          <S.EmptyBoard board={INITIAL_BOARD} />
          <S.EmptyCopy>
            <strong>The first spot is up for grabs.</strong>
            <p>
              Every checker is still on its starting point. Win an eligible computer game with an account to earn TNB
              while the fund has coins.
            </p>
          </S.EmptyCopy>
        </S.Empty>
      )}
      {!loading && !error && !!entries.length && (
        <>
          <S.Table>
            <caption>
              TNB rewards paid to players in Backgammon. Equal earnings share a rank. Each checker on a point is a
              rewarded win.
            </caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Player</th>
                <th scope="col">Rewarded wins</th>
                <th scope="col">TNB earned</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <EarnerRow entry={entry} index={index} key={entry.user.id} />
              ))}
            </tbody>
          </S.Table>
          <S.Footer>
            <S.Note>Paid rewards only. Guest games and player stakes aren’t included.</S.Note>
            <S.Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
          </S.Footer>
        </>
      )}
    </S.Board>
  );
};

export default Leaderboard;
