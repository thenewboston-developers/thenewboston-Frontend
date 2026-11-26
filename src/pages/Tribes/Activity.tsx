import {useEffect, useRef, useState} from 'react';
import {ScrollText} from 'lucide-react';

import {getTribesActivity} from 'api/tribes';
import {TribesPanelProps, TribesState} from 'types/tribes';
import {isCancellationError} from 'utils/errors';

import PlayerAvatar from './components/PlayerAvatar';
import {date} from './common';
import * as S from './Styles';

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
                  <strong>{entry.username || 'Season'}</strong> {entry.text}
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
