import {KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Handshake, Lock, Send} from 'lucide-react';

import {getTribesMessages} from 'api/tribes';
import {TribesPanelProps, TribesState} from 'types/tribes';
import {isCancellationError} from 'utils/errors';

import {ActionForm, date, tribeName} from '../common';
import Emblem from '../components/Emblem';
import PlayerAvatar from '../components/PlayerAvatar';
import {useAlert} from '../notices';

import * as S from './Styles';

const Messages = ({act, busy, now, state, tribe}: TribesPanelProps) => {
  const [history, setHistory] = useState<{scope: string; rows: TribesState['messages']; before: number | null} | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState('tribe');
  const alert = useAlert();
  const controller = useRef<AbortController | null>(null);
  const thread = useRef<HTMLDivElement>(null);
  const scope = `${state.tournament.id}:${state.viewer?.id}:${state.viewer?.tribe_id}`;
  const activeScope = useRef(scope);
  activeScope.current = scope;
  const older = history?.scope === scope ? history : null;
  const records = Array.from(
    new Map([...state.messages, ...(older?.rows ?? [])].map((entry) => [entry.id, entry])).values(),
  ).sort((a, b) => a.id - b.id);
  const canLoad = older ? older.before !== null : state.messages.length >= 200;
  const recipientId = recipient === 'tribe' ? tribe?.id : Number(recipient);
  const finished = state.tournament.status === 'finished' || now >= new Date(state.tournament.ends_at).getTime();
  const canMessage = !!tribe && !finished;
  const disabledMessage = finished
    ? 'This tournament has ended. Its correspondence is read-only.'
    : 'The organizer must assign you to a tribe before you can take part in its conversation.';
  const between = (otherId: number | undefined) =>
    records.filter((message) =>
      otherId === tribe?.id
        ? message.from_tribe_id === tribe?.id && message.to_tribe_id === tribe?.id
        : (message.from_tribe_id === otherId && message.to_tribe_id === tribe?.id) ||
          (message.to_tribe_id === otherId && message.from_tribe_id === tribe?.id),
    );
  const messages = between(recipientId);
  const others = state.tribes.filter((team) => team.id !== tribe?.id);
  const other = others.find((team) => team.id === recipientId);
  const latest = messages[messages.length - 1]?.id;

  useEffect(() => {
    controller.current?.abort();
    controller.current = null;
    setHistory(null);
    setLoading(false);
    setRecipient('tribe');
    return () => {
      controller.current?.abort();
      controller.current = null;
    };
  }, [scope]);

  // New messages and a newly opened conversation start at the latest line
  useEffect(() => {
    const element = thread.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [latest, recipient]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  const handleLoad = async () => {
    if (controller.current || !records.length) return;
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    try {
      const page = await getTribesMessages(state.tournament.id, older?.before ?? records[0].id, request.signal);
      if (!request.signal.aborted && activeScope.current === scope)
        setHistory({scope, rows: [...records, ...page.results], before: page.next_before});
    } catch (failure) {
      if (!isCancellationError(failure) && activeScope.current === scope)
        alert('Earlier messages could not be loaded. Please try again.');
    } finally {
      if (controller.current === request) {
        controller.current = null;
        setLoading(false);
      }
    }
  };

  const preview = (otherId: number | undefined, fallback: string) => {
    const lines = between(otherId);
    const last = lines[lines.length - 1];
    return last ? `${last.username}: ${last.text}` : fallback;
  };

  return (
    <S.Grid $wide>
      <S.Card $flush>
        <S.Chat>
          <S.Conversations aria-label="Conversations">
            <p>Your tribe</p>
            <S.Conversation
              $active={recipient === 'tribe'}
              aria-pressed={recipient === 'tribe'}
              onClick={() => setRecipient('tribe')}
              type="button"
            >
              <Emblem
                color={tribe?.color ?? '#46634a'}
                emblem={tribe?.emblem ?? '🛡️'}
                image={tribe?.emblem_image}
                size={30}
              />
              <span>
                <strong>Around the campfire</strong>
                <small>{preview(tribe?.id, 'Private tribe chat')}</small>
              </span>
            </S.Conversation>
            {!!others.length && <p>Diplomacy</p>}
            {others.map((team) => (
              <S.Conversation
                $active={recipient === String(team.id)}
                aria-pressed={recipient === String(team.id)}
                key={team.id}
                onClick={() => setRecipient(String(team.id))}
                type="button"
              >
                <Emblem color={team.color} emblem={team.emblem} image={team.emblem_image} size={30} />
                <span>
                  <strong>{team.name}</strong>
                  <small>{preview(team.id, 'No letters yet')}</small>
                </span>
              </S.Conversation>
            ))}
          </S.Conversations>
          <S.ThreadPane>
            <S.ThreadHead>
              <div>
                <S.Eyebrow style={{marginBottom: 2}}>Communications</S.Eyebrow>
                <h2>{recipient === 'tribe' ? 'Around the campfire' : tribeName(state, recipientId)}</h2>
              </div>
              <S.Badge $tone="neutral">
                <Lock size={11} /> {recipient === 'tribe' ? 'Only your teammates' : 'Private correspondence'}
              </S.Badge>
            </S.ThreadHead>
            <S.Thread ref={thread}>
              {canLoad && (
                <S.Button
                  $secondary
                  $size="small"
                  disabled={loading}
                  onClick={handleLoad}
                  style={{alignSelf: 'center'}}
                >
                  {loading ? 'Loading correspondence…' : 'Load earlier correspondence'}
                </S.Button>
              )}
              {!messages.length && (
                <S.Empty style={{margin: 'auto 0'}}>
                  {other && <Emblem color={other.color} emblem={other.emblem} image={other.emblem_image} size={44} />}
                  {recipient === 'tribe'
                    ? 'Say hello. Share a plan. Build something together.'
                    : 'Open a conversation. An ally may be one message away.'}
                </S.Empty>
              )}
              {messages.map((message) => {
                const own = message.user_id === state.viewer?.id;
                return (
                  <S.Bubble $own={own} key={message.id}>
                    <PlayerAvatar avatar={message.avatar} name={message.username} size={28} />
                    <div>
                      <header>
                        {message.username}
                        {recipient !== 'tribe' && (
                          <S.Badge $tone={own ? 'dark' : 'neutral'} style={{fontSize: 10, padding: '3px 7px'}}>
                            {tribeName(state, message.from_tribe_id)}
                          </S.Badge>
                        )}
                      </header>
                      <p>{message.text}</p>
                      <small>{date(message.created_at)}</small>
                    </div>
                  </S.Bubble>
                );
              })}
            </S.Thread>
            <S.Composer>
              <ActionForm
                act={act}
                action="message"
                disabled={busy || !canMessage}
                fixed={{to_tribe_id: recipientId ?? null}}
                icon={<Send size={15} />}
                inline
                key={recipient}
                submit="Send message"
              >
                <S.Field>
                  <span className="sr-only">Your message</span>
                  <textarea
                    aria-label="Your message"
                    maxLength={2000}
                    name="text"
                    onKeyDown={handleKeyDown}
                    placeholder={
                      recipient === 'tribe' ? 'What should we work on next?' : 'Write a letter to this tribe…'
                    }
                    required
                  />
                </S.Field>
              </ActionForm>
              <S.Hint style={{marginTop: 8}}>
                {canMessage ? 'Press Enter to send, Shift and Enter for a new line.' : disabledMessage}
              </S.Hint>
            </S.Composer>
          </S.ThreadPane>
        </S.Chat>
      </S.Card>
      <S.Card>
        <S.Eyebrow>
          <Handshake size={14} /> The art of diplomacy
        </S.Eyebrow>
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
        <S.Hint style={{marginTop: 16}}>
          The final battle reveals every target. Your decisions become part of the world's history.
        </S.Hint>
      </S.Card>
    </S.Grid>
  );
};

export default Messages;
