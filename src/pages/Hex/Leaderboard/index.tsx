import {mdiTrophyOutline} from '@mdi/js';
import Icon from '@mdi/react';

import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';
import {GameEarningsEntry} from 'types/gameEarnings';

import {EmptyPodium, HexSpinner} from '../Emblems';

import * as S from './Styles';

const MAX_STONES = 5;

// A red stone for each rewarded win, up to five. Rewards come from wins over the computer, where players are Red.
const WinStones = ({wins}: {wins: number}) => (
  <S.WinStones aria-hidden="true">
    {Array.from({length: Math.min(wins, MAX_STONES)}, (_, index) => (
      <i key={index} />
    ))}
  </S.WinStones>
);

const EarnerRow = ({entry}: {entry: GameEarningsEntry}) => {
  const profilePath = `/profile/${entry.user.id}`;
  const wins = entry.rewarded_wins;
  return (
    <S.Row $rank={entry.rank}>
      <td>
        <S.Rank $rank={entry.rank}>
          <span>{entry.rank}</span>
        </S.Rank>
      </td>
      <td>
        <S.Player>
          <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
            <S.AvatarFrame $rank={entry.rank}>
              <S.Avatar size="40px" src={entry.user.avatar} />
            </S.AvatarFrame>
          </S.AvatarLink>
          <S.Identity>
            <S.Username to={profilePath}>{entry.user.username}</S.Username>
            <S.Wins>
              <WinStones wins={wins} />
              {wins.toLocaleString()} rewarded {wins === 1 ? 'win' : 'wins'}
            </S.Wins>
          </S.Identity>
        </S.Player>
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
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings('hex');
  const entries = data?.results ?? [];

  return (
    <S.Board aria-labelledby="hex-earners-title" id="top-earners">
      <S.Header>
        <S.TrophyCell aria-hidden="true">
          <Icon path={mdiTrophyOutline} size="24px" />
        </S.TrophyCell>
        <S.Heading>
          <S.Eyebrow>Hex rewards leaderboard</S.Eyebrow>
          <S.Title id="hex-earners-title">Top connectors</S.Title>
          <S.Description>
            Real wins. Real rewards. All-time TNB paid from the community game fund for Hex victories.
          </S.Description>
        </S.Heading>
        <S.Period>All time</S.Period>
      </S.Header>
      {loading && (
        <S.Message role="status">
          <HexSpinner />
          <span>Loading top earners…</span>
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
          <EmptyPodium />
          <strong>The first spot is up for grabs.</strong>
          <p>Win an eligible computer game with an account to earn TNB while the fund has coins.</p>
        </S.Empty>
      )}
      {!loading && !error && !!entries.length && (
        <>
          <S.Table>
            <caption>TNB rewards paid to players in Hex. Equal earnings share a rank.</caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Player</th>
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
