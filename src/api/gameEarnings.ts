import axios from 'axios';

import {GameEarningsPage, RewardGame} from 'types/gameEarnings';

export const getGameEarnings = async (
  game: RewardGame,
  page: number,
  pageSize: number,
  signal?: AbortSignal,
): Promise<GameEarningsPage> => {
  const response = await axios.get<GameEarningsPage>(`${process.env.REACT_APP_API_URL}/api/game-rewards/leaderboard`, {
    params: {game, page, page_size: pageSize},
    signal,
  });
  return response.data;
};
