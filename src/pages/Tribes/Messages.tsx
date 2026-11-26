import {useEffect, useRef, useState} from 'react';

import {getTribesMessages} from 'api/tribes';
import {TribesPanelProps, TribesState} from 'types/tribes';
import {isCancellationError} from 'utils/errors';

import {ActionForm, date, tribeName} from './common';
import * as S from './Styles';

const Messages = ({act, busy, now, state, tribe}: TribesPanelProps) => {
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{scope: string; rows: TribesState['messages']; before: number | null} | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState('tribe');
  const controller = useRef<AbortController | null>(null);
  const scope = `${state.season.id}:${state.viewer?.id}:${state.viewer?.tribe_id}`;
  const activeScope = useRef(scope);
  activeScope.current = scope;
  const older = history?.scope === scope ? history : null;
  const records = Array.from(
    new Map([...state.messages, ...(older?.rows ?? [])].map((entry) => [entry.id, entry])).values(),
  ).sort((a, b) => a.id - b.id);
  const canLoad = older ? older.before !== null : state.messages.length >= 200;
  const recipientId = recipient === 'tribe' ? tribe?.id : Number(recipient);
  const canMessage = !!tribe && state.season.status !== 'finished' && now < new Date(state.season.ends_at).getTime();
  const messages = records.filter((message) =>
    recipient === 'tribe'
      ? message.from_tribe_id === tribe?.id && message.to_tribe_id === tribe?.id
      : (message.from_tribe_id === recipientId && message.to_tribe_id === tribe?.id) ||
        (message.to_tribe_id === recipientId && message.from_tribe_id === tribe?.id),
  );
  useEffect(() => {
    controller.current?.abort();
    controller.current = null;
    setHistory(null);
    setLoading(false);
    setError('');
    setRecipient('tribe');
    return () => {
      controller.current?.abort();
      controller.current = null;
    };
  }, [scope]);

  const handleLoad = async () => {
    if (controller.current || !records.length) return;
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setError('');
    try {
      const page = await getTribesMessages(state.season.id, older?.before ?? records[0].id, request.signal);
      if (!request.signal.aborted && activeScope.current === scope)
        setHistory({scope, rows: [...records, ...page.results], before: page.next_before});
    } catch (failure) {
      if (!isCancellationError(failure) && activeScope.current === scope)
        setError('Earlier messages could not be loaded. Please try again.');
    } finally {
      if (controller.current === request) {
        controller.current = null;
        setLoading(false);
      }
    }
  };

  return (
    <S.Grid>
      <S.Card>
        <S.PanelTitle>
          <div>
            <S.Eyebrow>COMMUNICATIONS</S.Eyebrow>
            <h2>{recipient === 'tribe' ? 'Around the campfire' : tribeName(state, recipientId)}</h2>
          </div>
          <S.Badge>Private correspondence</S.Badge>
        </S.PanelTitle>
        <S.Field>
          Conversation
          <select onChange={(event) => setRecipient(event.target.value)} value={recipient}>
            <option value="tribe">Our tribe · private chat</option>
            {state.tribes
              .filter((team) => team.id !== tribe?.id)
              .map((team) => (
                <option key={team.id} value={team.id}>
                  {team.emblem} {team.name}
                </option>
              ))}
          </select>
        </S.Field>
        {error && <S.Error role="alert">{error}</S.Error>}
        {canLoad && (
          <S.Button $secondary disabled={loading} onClick={handleLoad} style={{marginTop: 16}}>
            {loading ? 'Loading correspondence…' : 'Load earlier correspondence'}
          </S.Button>
        )}
        <div style={{maxHeight: 500, overflowY: 'auto', marginTop: 18}}>
          {!messages.length && (
            <S.Empty>
              {recipient === 'tribe'
                ? 'Say hello. Share a plan. Build something together.'
                : 'Open a conversation. An ally may be one message away.'}
            </S.Empty>
          )}
          {messages.map((message) => (
            <S.Message key={message.id}>
              <strong>{message.username}</strong>
              {recipient !== 'tribe' && (
                <S.Badge style={{marginLeft: 8}}>{tribeName(state, message.from_tribe_id)}</S.Badge>
              )}
              <p>{message.text}</p>
              <small>{date(message.created_at)}</small>
            </S.Message>
          ))}
        </div>
        <ActionForm
          act={act}
          action="message"
          disabled={busy || !canMessage}
          fixed={{to_tribe_id: recipientId ?? null}}
          key={recipient}
          submit="Send message"
        >
          <S.Field>
            Your message
            <textarea
              maxLength={2000}
              name="text"
              placeholder={recipient === 'tribe' ? 'What should we work on next?' : 'Write a letter to this tribe…'}
              required
            />
          </S.Field>
        </ActionForm>
      </S.Card>
      <S.Card>
        <S.Eyebrow>THE ART OF DIPLOMACY</S.Eyebrow>
        <h2>Trust is a strategy.</h2>
        <S.Muted>
          Negotiate trade, coordinate attacks, or agree to leave each other in peace. Every member of both tribes can
          read and respond to your correspondence.
        </S.Muted>
        <S.Row>
          <strong>Our tribe chat</strong>
          <span>Only your teammates</span>
        </S.Row>
        <S.Row>
          <strong>Diplomatic letters</strong>
          <span>Both participating tribes</span>
        </S.Row>
        <S.Row>
          <strong>Promises & alliances</strong>
          <span>Not enforced by the game</span>
        </S.Row>
        <S.Muted style={{marginTop: 16}}>
          The final battle reveals every target. Your decisions become part of the world's history.
        </S.Muted>
      </S.Card>
    </S.Grid>
  );
};

export default Messages;
