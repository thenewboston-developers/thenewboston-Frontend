import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';
import {GameEarningsEntry} from 'types/gameEarnings';

import {AnchorInsignia, RadarScope} from '../Emblems';
import {FLEET} from '../utils';

import * as S from './Styles';

const hullCells = (length: number) => Array.from({length}, (_, index) => <i key={index} />);

// The top five ranks command the fleet's five ships, from the carrier down to the destroyer
const Command = ({rank}: {rank: number}) => {
  const ship = FLEET[rank - 1];
  if (!ship) return <S.Escort>Escort</S.Escort>;
  return (
    <S.Ship>
      <S.Hull $rank={rank} aria-hidden="true">
        {hullCells(ship.length)}
      </S.Hull>
      <span>{ship.name}</span>
    </S.Ship>
  );
};

const EarnerRow = ({entry}: {entry: GameEarningsEntry}) => {
  const profilePath = `/profile/${entry.user.id}`;
  const wins = entry.rewarded_wins;
  return (
    <S.Row $rank={entry.rank}>
      <td>
        <S.Rank $rank={entry.rank}>#{entry.rank}</S.Rank>
      </td>
      <td>
        <S.Commander>
          <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
            <S.Avatar $rank={entry.rank} size="40px" src={entry.user.avatar} />
          </S.AvatarLink>
          <S.Identity>
            <S.Username to={profilePath}>{entry.user.username}</S.Username>
            <S.Wins>
              {wins.toLocaleString()} rewarded {wins === 1 ? 'win' : 'wins'}
            </S.Wins>
          </S.Identity>
        </S.Commander>
      </td>
      <td>
        <Command rank={entry.rank} />
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
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings('battleship');
  const entries = data?.results ?? [];

  return (
    <S.Board aria-labelledby="battleship-earners-title" id="top-earners">
      <S.Header>
        <AnchorInsignia />
        <S.Heading>
          <S.Eyebrow>Fleet rewards leaderboard</S.Eyebrow>
          <S.Title id="battleship-earners-title">Top admirals</S.Title>
          <S.Description>
            Real wins. Real rewards. All-time TNB paid from the community game fund for Battleship victories.
          </S.Description>
        </S.Heading>
        <S.Period>All time</S.Period>
      </S.Header>
      {loading && (
        <S.Message role="status">
          <RadarScope size="small" />
          <span>Scanning for top earners…</span>
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
          <S.Berths aria-hidden="true">
            {FLEET.map((ship) => (
              <S.Hull key={ship.id}>{hullCells(ship.length)}</S.Hull>
            ))}
          </S.Berths>
          <strong>The first spot is up for grabs.</strong>
          <p>Win an eligible computer game with an account to earn TNB while the fund has coins.</p>
        </S.Empty>
      )}
      {!loading && !error && !!entries.length && (
        <>
          <S.Table>
            <caption>
              TNB rewards paid to players in Battleship. Equal earnings share a rank, and the top five ranks command the
              fleet’s ships.
            </caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Commander</th>
                <th scope="col">Command</th>
                <th scope="col">TNB earned</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <EarnerRow entry={entry} key={entry.user.id} />
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
