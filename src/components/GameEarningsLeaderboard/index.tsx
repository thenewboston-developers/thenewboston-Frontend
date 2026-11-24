import {mdiTrophyOutline} from '@mdi/js';
import Icon from '@mdi/react';

import Pagination from 'components/Pagination';
import UserLabel from 'components/UserLabel';
import {RewardGame} from 'types/gameEarnings';

import * as Backgammon from './BackgammonStyles';
import * as S from './Styles';
import useGameEarnings from './useGameEarnings';

type LeaderboardProps = {game: RewardGame; variant?: 'backgammon'};

const Leaderboard = ({game, variant}: LeaderboardProps) => {
  const {data, error, loading, page, retry, setPage, totalPages} = useGameEarnings(game);
  const Card = variant === 'backgammon' ? Backgammon.Card : S.Card;
  const Rank = variant === 'backgammon' ? Backgammon.Rank : S.Rank;

  return (
    <Card aria-labelledby={`${game}-earners-title`} id="top-earners">
      <S.Header>
        <S.Trophy aria-hidden="true">
          <Icon path={mdiTrophyOutline} size="28px" />
        </S.Trophy>
        <div>
          <S.Eyebrow>{variant === 'backgammon' ? 'THE BACKGAMMON HONORS BOARD' : 'THE REWARDS LEADERBOARD'}</S.Eyebrow>
          <S.Heading id={`${game}-earners-title`}>Top earners</S.Heading>
          <S.Description>
            Real wins. Real rewards. All-time TNB paid from the community game fund in this game.
          </S.Description>
        </div>
        <S.Period>All time</S.Period>
      </S.Header>
      {loading && <S.Message role="status">Loading top earners…</S.Message>}
      {!loading && error && (
        <S.Message role="alert">
          We couldn’t load the leaderboard.
          <S.Retry onClick={retry} type="button">
            Try again
          </S.Retry>
        </S.Message>
      )}
      {!loading && !error && !data?.results.length && (
        <S.Message>
          <strong>The first spot is up for grabs.</strong>
          <span>Win an eligible computer game with an account to earn TNB while the fund has coins.</span>
        </S.Message>
      )}
      {!loading && !error && !!data?.results.length && (
        <>
          <S.Table>
            <caption>TNB rewards paid to players in this game. Equal earnings share a rank.</caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Player</th>
                <th scope="col">TNB earned</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((entry) => (
                <tr key={entry.user.id}>
                  <td>
                    <Rank $podium={entry.rank <= 3}>#{entry.rank}</Rank>
                  </td>
                  <td>
                    <UserLabel
                      avatar={entry.user.avatar}
                      avatarSize="36px"
                      description={`${entry.rewarded_wins.toLocaleString()} rewarded ${entry.rewarded_wins === 1 ? 'win' : 'wins'}`}
                      id={entry.user.id}
                      username={entry.user.username}
                    />
                  </td>
                  <td>
                    <S.Amount>
                      {entry.total_earned.toLocaleString()}
                      <small>TNB</small>
                    </S.Amount>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
          <S.Footer>
            <S.Description>Paid rewards only. Guest games and player stakes aren’t included.</S.Description>
            <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
          </S.Footer>
        </>
      )}
    </Card>
  );
};

const GameEarningsLeaderboard = ({game, variant}: LeaderboardProps) => (
  <Leaderboard game={game} key={game} variant={variant} />
);

export default GameEarningsLeaderboard;
