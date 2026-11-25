import {mdiTrophyOutline} from '@mdi/js';
import Icon from '@mdi/react';

import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';
import {GameEarningsEntry} from 'types/gameEarnings';

import {BoxSpinner, EmptyPodium} from '../Emblems';

import * as S from './Styles';

const MAX_CHAIN = 5;

// A chain of blue boxes, one for each rewarded win up to five. Rewards come from wins over the computer, where
// players are blue.
const WinChain = ({wins}: {wins: number}) => (
  <S.WinChain aria-hidden="true">
    {Array.from({length: Math.min(wins, MAX_CHAIN)}, (_, index) => (
      <i key={index} />
    ))}
  </S.WinChain>
);

const EarnerRow = ({entry}: {entry: GameEarningsEntry}) => {
  const profilePath = `/profile/${entry.user.id}`;
  const wins = entry.rewarded_wins;
  return (
    <S.Row $rank={entry.rank}>
      <td>
        <S.Rank $rank={entry.rank}>{entry.rank}</S.Rank>
      </td>
      <td>
        <S.Player>
          <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
            <S.AvatarBox $rank={entry.rank}>
              <S.Avatar size="40px" src={entry.user.avatar} />
            </S.AvatarBox>
          </S.AvatarLink>
          <S.Identity>
            <S.Username to={profilePath}>{entry.user.username}</S.Username>
            <S.Wins>
              <WinChain wins={wins} />
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
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings('dots_and_boxes');
  const entries = data?.results ?? [];

  return (
    <S.Board aria-labelledby="dots-and-boxes-earners-title" id="top-earners">
      <S.Header>
        <S.TrophyBox aria-hidden="true">
          <Icon path={mdiTrophyOutline} size="24px" />
        </S.TrophyBox>
        <S.Heading>
          <S.Eyebrow>Dots and Boxes rewards leaderboard</S.Eyebrow>
          <S.Title id="dots-and-boxes-earners-title">Box office</S.Title>
          <S.Description>
            Real wins. Real rewards. All-time TNB paid from the community game fund for Dots and Boxes victories.
          </S.Description>
        </S.Heading>
        <S.Period>All time</S.Period>
      </S.Header>
      {loading && (
        <S.Message role="status">
          <BoxSpinner />
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
            <caption>TNB rewards paid to players in Dots and Boxes. Equal earnings share a rank.</caption>
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
