import {useEffect, useRef, useState} from 'react';
import {ScrollText} from 'lucide-react';

import {getTribesActivity} from 'api/tribes';
import {TribesPanelProps, TribesState} from 'types/tribes';
import {isCancellationError} from 'utils/errors';

import PlayerAvatar from './components/PlayerAvatar';
import {date, memberName, tribeName} from './common';
import * as S from './Styles';

type Entry = TribesState['activity'][number];

const USING: Record<string, string> = {personal: 'their pack and wallet', tribe: 'the warehouse and treasury'};

// Entries recorded before the pack and warehouse had settled names carry the internal account codes ("personal",
// "tribe"). They are reworded as they are shown, so the record reads the same from its first line to its last.
export const reword = (entry: Entry, state: TribesState) => {
  const {text} = entry;
  const transfer = text.match(/^Transferred (\d+) (\S+) to (.+) \((personal|tribe), player (\d+)\)\.$/);
  if (transfer) {
    const [, quantity, item, recipient, account, player] = transfer;
    const goods = `${quantity} ${item.replace(/_/g, ' ')}`;
    if (account === 'tribe')
      return recipient === tribeName(state, entry.tribe_id)
        ? `Stored ${goods} in the warehouse.`
        : `Sent ${goods} to ${recipient}.`;
    return Number(player) === entry.user_id
      ? `Took ${goods} into their pack.`
      : `Gave ${goods} to ${memberName(state, Number(player))}.`;
  }
  const treasury = text.match(/^treasury (deposit|withdraw): (\d+) TNB\.$/);
  if (treasury)
    return treasury[1] === 'deposit'
      ? `Deposited ${treasury[2]} TNB from their wallet into the treasury.`
      : `Withdrew ${treasury[2]} TNB from the treasury into their wallet.`;
  return text
    .replace(
      /^(Listed (?:sell|buy) order #\d+: .+ TNB each) from (personal|tribe)\.$/,
      (_, start, account) => `${start}, using ${USING[account]}.`,
    )
    .replace(/^(Cancelled order #\d+: .+); escrow returned to (?:personal|tribe)\.$/, '$1; escrow returned.')
    .replace(
      /^(Filled order #\d+ .+ TNB), (personal|tribe)\)\.$/,
      (_, start, account) => `${start}, using ${USING[account]}).`,
    )
    .replace(
      /^(Order #\d+ filled by .+ TNB) \((personal|tribe)\)\.$/,
      (_, start, account) => `${start} (using ${account === 'tribe' ? USING.tribe : 'the owner’s pack and wallet'}).`,
    );
};

const Activity = ({state}: Pick<TribesPanelProps, 'state'>) => {
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{scope: string; rows: TribesState['activity']; before: number | null} | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const scope = `${state.season.id}:${state.viewer?.id}:${state.viewer?.tribe_id}`;
  const activeScope = useRef(scope);
  activeScope.current = scope;
  const older = history?.scope === scope ? history : null;
  const entries = Array.from(
    new Map([...state.activity, ...(older?.rows ?? [])].map((entry) => [entry.id, entry])).values(),
  ).sort((a, b) => b.id - a.id);
  const canLoad = older ? older.before !== null : state.activity.length >= 200;

  useEffect(() => {
    controller.current?.abort();
    controller.current = null;
    setHistory(null);
    setLoading(false);
    setError('');
    return () => {
      controller.current?.abort();
      controller.current = null;
    };
  }, [scope]);

  const handleLoad = async () => {
    if (controller.current || !entries.length) return;
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setError('');
    try {
      const page = await getTribesActivity(
        state.season.id,
        older?.before ?? entries[entries.length - 1].id,
        request.signal,
      );
      if (!request.signal.aborted && activeScope.current === scope)
        setHistory({scope, rows: [...entries, ...page.results], before: page.next_before});
    } catch (failure) {
      if (!isCancellationError(failure) && activeScope.current === scope)
        setError('Earlier activity could not be loaded. Please try again.');
    } finally {
      if (controller.current === request) {
        controller.current = null;
        setLoading(false);
      }
    }
  };

  return (
    <S.Card>
      <S.Eyebrow>
        <ScrollText size={14} /> The record
      </S.Eyebrow>
      <h2>Tribe activity</h2>
      <S.Muted>A permanent record of your team's decisions.</S.Muted>
      {!entries.length && <S.Empty>Your tribe's story starts here.</S.Empty>}
      {!!entries.length && (
        <S.Feed>
          {entries.map((entry) => (
            <S.FeedItem key={entry.id}>
              {entry.user_id ? (
                <PlayerAvatar avatar={entry.avatar} name={entry.username} size={26} />
              ) : (
                <S.Avatar $color="#9a6a17" $size={26} aria-hidden>
                  ★
                </S.Avatar>
              )}
              <div>
                <p>
                  <strong>{entry.username || 'Season'}</strong> {reword(entry, state)}
                </p>
                <small>{date(entry.created_at)}</small>
              </div>
            </S.FeedItem>
          ))}
        </S.Feed>
      )}
      {error && <S.Error role="alert">{error}</S.Error>}
      {canLoad && (
        <S.Button $secondary $size="small" disabled={loading} onClick={handleLoad} style={{marginTop: 14}}>
          {loading ? 'Loading activity…' : 'Load earlier activity'}
        </S.Button>
      )}
    </S.Card>
  );
};

export default Activity;
