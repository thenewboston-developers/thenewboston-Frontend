import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';
import {GameEarningsEntry} from 'types/gameEarnings';

import {CornerEmblem, CornersBoard, FlipLoader} from '../Emblems';

import {getHolding, getHoldingLabel, Holding} from './holdings';
import * as S from './Styles';

// Four by four squares cut from the board: the frame shows which corner or edge the rank holds, and its disk sits on
// that square. The center shows the four disks every game starts with.
const GLYPH_DISKS: Record<Exclude<Holding, 'center'>, {x: number; y: number}> = {
  a1: {x: 5, y: 5},
  a8: {x: 5, y: 35},
  edge: {x: 15, y: 5},
  h1: {x: 35, y: 5},
  h8: {x: 35, y: 35},
};

const GLYPH_FRAMES: Record<Holding, string | null> = {
  a1: 'M1 40V1H40',
  a8: 'M1 0V39H40',
  center: null,
  edge: 'M0 1H40',
  h1: 'M0 1H39V40',
  h8: 'M0 39H39V0',
};

const START_DISKS = [
  {side: 'white', x: 15, y: 15},
  {side: 'black', x: 25, y: 15},
  {side: 'black', x: 15, y: 25},
  {side: 'white', x: 25, y: 25},
] as const;

const Square = ({rank}: {rank: number}) => {
  const holding = getHolding(rank);
  const frame = GLYPH_FRAMES[holding];
  return (
    <S.SquareLabel>
      <S.Glyph aria-hidden="true" viewBox="0 0 40 40">
        <rect fill="#0a1730" height="40" width="40" />
        <path d="M10 0V40M20 0V40M30 0V40M0 10H40M0 20H40M0 30H40" stroke="#78edff" strokeOpacity="0.2" />
        {frame && <path d={frame} fill="none" stroke="#78edff" strokeOpacity="0.8" strokeWidth="2" />}
        {holding === 'center' ? (
          START_DISKS.map(({side, x, y}) => <S.StartDisk $side={side} cx={x} cy={y} key={`${x}-${y}`} r="3.6" />)
        ) : (
          <S.HeldDisk $holding={holding} $rank={rank} cx={GLYPH_DISKS[holding].x} cy={GLYPH_DISKS[holding].y} r="3.9" />
        )}
      </S.Glyph>
      <span>{getHoldingLabel(holding)}</span>
    </S.SquareLabel>
  );
};

const EarnerRow = ({entry}: {entry: GameEarningsEntry}) => {
  const profilePath = `/profile/${entry.user.id}`;
  const wins = entry.rewarded_wins;
  return (
    <S.Row $rank={entry.rank}>
      <td>
        <S.RankDisk $rank={entry.rank}>{entry.rank}</S.RankDisk>
      </td>
      <td>
        <S.Player>
          <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
            <S.Avatar $rank={entry.rank} size="40px" src={entry.user.avatar} />
          </S.AvatarLink>
          <S.Identity>
            <S.Username to={profilePath}>{entry.user.username}</S.Username>
            <S.Wins>
              {wins.toLocaleString()} rewarded {wins === 1 ? 'win' : 'wins'}
            </S.Wins>
          </S.Identity>
        </S.Player>
      </td>
      <td>
        <Square rank={entry.rank} />
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
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings('reversi');
  const entries = data?.results ?? [];

  return (
    <S.Board aria-labelledby="reversi-earners-title" id="top-earners">
      <S.Header>
        <CornerEmblem />
        <S.Heading>
          <S.Eyebrow>Reversi rewards leaderboard</S.Eyebrow>
          <S.Title id="reversi-earners-title">Masters of the board</S.Title>
          <S.Description>
            Real wins. Real rewards. All-time TNB paid from the community game fund for Reversi wins. The top four hold
            the corners.
          </S.Description>
        </S.Heading>
        <S.Period>All time</S.Period>
      </S.Header>
      {loading && (
        <S.Message role="status">
          <FlipLoader />
          <span>Flipping through top earners…</span>
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
          <CornersBoard />
          <S.EmptyCopy>
            <strong>The first spot is up for grabs.</strong>
            <p>
              All four corners are open. Win an eligible computer game with an account to earn TNB while the fund has
              coins.
            </p>
          </S.EmptyCopy>
        </S.Empty>
      )}
      {!loading && !error && !!entries.length && (
        <>
          <S.Table>
            <caption>
              TNB rewards paid to players in Reversi. Equal earnings share a rank, and the top four ranks hold the
              corners of the board.
            </caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Player</th>
                <th scope="col">Square</th>
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
