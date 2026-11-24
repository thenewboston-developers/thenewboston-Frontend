import {ConnectFiveMatch} from 'types';

export const getConnectFiveWinnerName = (match: ConnectFiveMatch): string | null => {
  if (match.winner_side === 'b' && match.mode === 'computer') return 'Computer';
  if (!match.winner) return null;
  return match.winner === match.player_a.id ? match.player_a.username : (match.player_b?.username ?? 'Computer');
};

export const isOlderConnectFiveMatch = (
  previous: ConnectFiveMatch | undefined,
  incoming: ConnectFiveMatch,
): boolean => {
  if (!previous) return false;
  const previousVersion = previous.version ?? -1;
  const incomingVersion = incoming.version ?? -1;
  if (previousVersion !== incomingVersion) return previousVersion > incomingVersion;
  return (
    Date.parse(previous.server_time ?? String(previous.modified_date)) >
    Date.parse(incoming.server_time ?? String(incoming.modified_date))
  );
};
