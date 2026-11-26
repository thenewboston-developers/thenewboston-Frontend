import {ReactNode, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Check, Crown, Flag, LogIn, Mail, MapPin, Send, Shield, Swords, UserPlus, Users} from 'lucide-react';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {Tribe, TribesAction, TribesPanelProps} from 'types/tribes';
import {getAuthenticationPath} from 'utils/authentication';

import ItemIcon from '../art/ItemIcon';
import {ActionForm, count, date, Player, plural} from '../common';
import Emblem from '../components/Emblem';
import EmblemPicker, {EMBLEM_SIZE, PickedEmblem} from '../components/EmblemPicker';
import PlayerAvatar from '../components/PlayerAvatar';

import * as S from './Styles';

const COLORS = [
  '#c2572b',
  '#b83a4b',
  '#8a4fa3',
  '#4a5fc1',
  '#2f7fb8',
  '#2a8f8a',
  '#3f8a4f',
  '#6f8f2f',
  '#c99a2e',
  '#a86a32',
  '#6f7f8f',
  '#3b4a54',
];

// The banner is drawn live while the founder types, so the choice of emblem and color is never a guess
const TribeFields = ({
  disabled,
  onPick,
  picked,
  saving,
  tribe,
}: Pick<TribesPanelProps, 'tribe'> & {
  disabled?: boolean;
  onPick: (picked: PickedEmblem | null) => void;
  picked: PickedEmblem | null;
  saving: string;
}) => {
  const [color, setColor] = useState(tribe?.color ?? COLORS[0]);
  const [motto, setMotto] = useState(tribe?.motto ?? '');
  const [name, setName] = useState(tribe?.name ?? '');
  const image = picked?.preview ?? tribe?.emblem_image;
  return (
    <>
      <S.Preview $color={color} aria-hidden>
        <Emblem color={color} emblem={tribe?.emblem ?? '🛡️'} image={image} size={64} />
        <div>
          <small>Your banner</small>
          <strong>{name || 'Name your tribe'}</strong>
          <em>{motto || 'A new story begins.'}</em>
        </div>
      </S.Preview>
      <S.Field>
        Tribe name
        <input
          maxLength={40}
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="The Iron Wolves"
          required
          value={name}
        />
      </S.Field>
      <S.FieldGroup>
        Emblem
        <S.EmblemUpload>
          <EmblemPicker disabled={disabled} onPick={onPick} text={image ? 'Change image' : 'Upload image'} />
          {picked && (
            <S.Button $size="small" $variant="ghost" disabled={disabled} onClick={() => onPick(null)} type="button">
              Undo
            </S.Button>
          )}
        </S.EmblemUpload>
        <S.Hint>
          {picked
            ? `${picked.file.name} becomes your emblem when you ${saving}.`
            : `A square picture, exactly ${EMBLEM_SIZE} by ${EMBLEM_SIZE} pixels.`}
        </S.Hint>
      </S.FieldGroup>
      <S.FieldGroup>
        Tribe color
        <S.Swatches>
          {COLORS.map((option) => (
            <S.Swatch
              $color={option}
              $selected={option === color}
              aria-label={`Use the color ${option}`}
              aria-pressed={option === color}
              key={option}
              onClick={() => setColor(option)}
              type="button"
            />
          ))}
          <input
            aria-label="Custom tribe color"
            name="color"
            onChange={(event) => setColor(event.target.value)}
            type="color"
            value={color}
          />
        </S.Swatches>
      </S.FieldGroup>
      <S.Field>
        Motto
        <input
          maxLength={120}
          name="motto"
          onChange={(event) => setMotto(event.target.value)}
          placeholder="Strength through unity."
          value={motto}
        />
      </S.Field>
      <S.Field>
        About your tribe
        <textarea
          defaultValue={tribe?.description}
          maxLength={500}
          name="description"
          placeholder="Tell future teammates how you want to play."
        />
      </S.Field>
    </>
  );
};

// The tribe's details are a receipted action and the emblem is a file, so saving sends the details first and the
// picture straight after
const TribeForm = ({
  act,
  action,
  busy,
  icon,
  saving,
  submit,
  tribe,
  uploadEmblem,
}: Pick<TribesPanelProps, 'act' | 'busy' | 'tribe' | 'uploadEmblem'> & {
  action: string;
  icon?: ReactNode;
  saving: string;
  submit: string;
}) => {
  const [picked, setPicked] = useState<PickedEmblem | null>(null);

  const handleAct: TribesAction = async (name, data) => {
    const success = await act(name, data);
    if (success && picked && uploadEmblem && (await uploadEmblem(picked.file))) setPicked(null);
    return success;
  };

  useEffect(() => {
    if (!picked) return undefined;
    return () => URL.revokeObjectURL(picked.preview);
  }, [picked]);

  return (
    <ActionForm act={handleAct} action={action} disabled={busy} icon={icon} resetOnSuccess={false} submit={submit}>
      <TribeFields disabled={busy} onPick={setPicked} picked={picked} saving={saving} tribe={tribe} />
    </ActionForm>
  );
};

const Roster = ({maximum, team}: {maximum: number; team: Tribe}) => (
  <S.Slots aria-label={`${team.members.length} of ${maximum} members`} role="img">
    {team.members.map((member) => (
      <PlayerAvatar avatar={member.avatar} key={member.id} name={member.username} size={28} title={member.username} />
    ))}
    {Array.from({length: Math.max(0, maximum - team.members.length)}, (_, index) => (
      <S.Slot key={index} />
    ))}
  </S.Slots>
);

const Recruitment = ({act, busy, now, state, tribe, uploadEmblem}: TribesPanelProps) => {
  const banner = useRef<HTMLElement>(null);
  const recruiting = state.season.status === 'recruiting' && now < new Date(state.season.starts_at).getTime();
  const founder = tribe?.founder_id === state.viewer?.id;
  const maximum = state.catalog.max_members;
  const teams = [...state.tribes].sort((a, b) => Number(b.id === tribe?.id) - Number(a.id === tribe?.id));

  const handleRaise = () => {
    banner.current?.scrollIntoView?.({behavior: 'smooth', block: 'start'});
    banner.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({preventScroll: true});
  };

  const renderAction = (team: Tribe) => {
    if (team.id === tribe?.id)
      return (
        <S.Badge $tone="gold">
          <Check size={12} strokeWidth={3} /> Your tribe
        </S.Badge>
      );
    if (!recruiting) return null;
    const applied = state.applications.some((entry) => entry.tribe_id === team.id);
    const full = team.members.length >= maximum;
    let text = 'Apply to join';
    if (full) text = 'Roster full';
    if (applied) text = 'Application sent';
    return (
      <S.Button
        $secondary
        $size="small"
        disabled={busy || !!tribe || !state.viewer || full || applied}
        onClick={() => act('apply', {tribe_id: team.id})}
      >
        {applied ? <Check size={14} /> : <UserPlus size={14} />}
        {text}
      </S.Button>
    );
  };

  const renderRoster = () =>
    tribe && (
      <S.Card>
        <S.PanelTitle>
          <S.RowMain>
            <Emblem color={tribe.color} emblem={tribe.emblem} image={tribe.emblem_image} size={38} />
            <div>
              <S.Eyebrow style={{marginBottom: 2}}>Your roster</S.Eyebrow>
              <h2>{tribe.name}</h2>
            </div>
          </S.RowMain>
          <S.Badge $tone="neutral">
            {tribe.members.length}/{maximum} members
          </S.Badge>
        </S.PanelTitle>
        <S.Muted>
          {recruiting ? 'Make your plans before the season begins.' : 'Your roster is locked for this season.'}
        </S.Muted>
        {tribe.members.map((member) => (
          <S.Row key={member.id}>
            <Player
              avatar={member.avatar}
              name={member.username}
              note={
                member.id === tribe.founder_id ? (
                  <>
                    <Crown size={11} style={{verticalAlign: '-1px'}} /> Founder
                  </>
                ) : (
                  'Tribe member'
                )
              }
            />
            {founder && member.id !== state.viewer?.id && recruiting && (
              <S.Button
                $size="small"
                $variant="danger"
                disabled={busy}
                onClick={() => act('remove_member', {user_id: member.id})}
              >
                Remove
              </S.Button>
            )}
          </S.Row>
        ))}
        {recruiting && (!founder || tribe.members.length === 1) && (
          <S.Actions style={{marginTop: 16}}>
            <S.Button $size="small" $variant="danger" disabled={busy} onClick={() => act('leave')}>
              Leave tribe
            </S.Button>
          </S.Actions>
        )}
      </S.Card>
    );

  return (
    <S.Grid>
      <S.Stack>
        {!!state.invitations.length && (
          <S.Card $accent={`linear-gradient(90deg, #e6aa3c, #f6c865)`}>
            <S.Eyebrow>
              <Mail size={14} /> You have been invited
            </S.Eyebrow>
            <h2>Your invitations</h2>
            {state.invitations.map((invite) => {
              const team = state.tribes.find((entry) => entry.id === invite.tribe_id);
              return (
                <S.Row key={invite.tribe_id}>
                  <S.RowMain>
                    {team && <Emblem color={team.color} emblem={team.emblem} image={team.emblem_image} size={34} />}
                    <div>
                      <strong>{invite.name}</strong>
                      {team && (
                        <small>
                          {team.members.length}/{maximum} members · {team.motto || 'A new story begins'}
                        </small>
                      )}
                    </div>
                  </S.RowMain>
                  <S.Button
                    disabled={busy || !recruiting || !!tribe}
                    onClick={() => act('accept_invite', {tribe_id: invite.tribe_id})}
                  >
                    Accept invitation
                  </S.Button>
                </S.Row>
              );
            })}
          </S.Card>
        )}
        <S.Card>
          <S.PanelTitle>
            <div>
              <S.Eyebrow>
                <Users size={14} /> {recruiting ? 'The gathering' : 'Locked rosters'}
              </S.Eyebrow>
              <h2>{recruiting ? 'Find your people.' : 'The tribes of this season'}</h2>
            </div>
            <S.Badge>{plural(state.tribes.length, 'tribe')}</S.Badge>
          </S.PanelTitle>
          <S.Muted>
            Up to {maximum} players. One worker each. A whole world to build together.{' '}
            {recruiting ? `Rosters lock ${date(state.season.starts_at)}.` : 'Rosters are locked for this season.'}
          </S.Muted>
          {!state.tribes.length && (
            <S.Empty>
              <S.Ghosts aria-hidden>
                <Emblem color="#2f7fb8" emblem="🦉" size={46} />
                <Emblem color="#c2572b" emblem="🐺" size={60} />
                <Emblem color="#c99a2e" emblem="🦊" size={46} />
              </S.Ghosts>
              <strong>A new world needs its first tribe.</strong>
              Start a team, pick your colors and invite your friends before the season begins.
              {state.viewer && recruiting && (
                <S.Button $variant="accent" onClick={handleRaise} style={{marginTop: 6}}>
                  <Flag size={16} /> Raise the first banner
                </S.Button>
              )}
            </S.Empty>
          )}
          {!!state.tribes.length && (
            <S.Cards $min={270}>
              {teams.map((team) => {
                const land = state.plots.filter((plot) => plot.tribe_id === team.id).length;
                const power = state.units
                  .filter((unit) => unit.tribe_id === team.id)
                  .reduce((total, unit) => total + (state.catalog.units[unit.item]?.damage ?? 0) * unit.quantity, 0);
                return (
                  <S.TribeCard $color={team.color} $own={team.id === tribe?.id} key={team.id}>
                    <S.TribeHead>
                      <Emblem color={team.color} emblem={team.emblem} image={team.emblem_image} size={46} />
                      <div>
                        <h3>{team.name}</h3>
                        <em>{team.motto || 'A new story begins'}</em>
                      </div>
                    </S.TribeHead>
                    {team.description && <p>{team.description}</p>}
                    {!recruiting && (
                      <S.TribeStats>
                        <span>
                          <MapPin size={13} /> {plural(land, 'plot')}
                        </span>
                        <span>
                          <Swords size={13} /> {count(power)} attack
                        </span>
                      </S.TribeStats>
                    )}
                    <Roster maximum={maximum} team={team} />
                    <S.Hint>{team.members.map((member) => member.username).join(', ')}</S.Hint>
                    <S.TribeFooter>
                      <S.Badge $tone="neutral">
                        {team.members.length}/{maximum} members
                      </S.Badge>
                      {renderAction(team)}
                    </S.TribeFooter>
                  </S.TribeCard>
                );
              })}
            </S.Cards>
          )}
        </S.Card>
        {recruiting && renderRoster()}
      </S.Stack>
      <S.Stack>
        {!tribe && state.viewer && recruiting && (
          <S.Card
            $accent="linear-gradient(90deg, #e6aa3c, #f6c865)"
            id="tribes-raise-banner"
            ref={banner}
            style={{scrollMarginTop: 80}}
          >
            <S.Eyebrow>
              <Flag size={14} /> Start something
            </S.Eyebrow>
            <h2>Raise your banner</h2>
            <S.Muted>Create a tribe, bring up to seven friends, and decide what you will become.</S.Muted>
            <TribeForm
              act={act}
              action="create_tribe"
              busy={busy}
              icon={<Flag size={16} />}
              saving="create the tribe"
              submit="Create tribe"
              uploadEmblem={uploadEmblem}
            />
          </S.Card>
        )}
        {!state.viewer && recruiting && (
          <S.Card $accent="linear-gradient(90deg, #e6aa3c, #f6c865)">
            <S.Eyebrow>
              <Flag size={14} /> Join the world
            </S.Eyebrow>
            <h2>Raise your banner</h2>
            <S.Muted>
              Sign in to create a tribe or apply to one. Recruitment closes {date(state.season.starts_at)}.
            </S.Muted>
            <S.Button
              $block
              $variant="accent"
              as={Link}
              to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, '/tribes/home')}
            >
              <LogIn size={16} /> Sign in to play
            </S.Button>
          </S.Card>
        )}
        {tribe && founder && recruiting && (
          <>
            <S.Card>
              <S.Eyebrow>
                <UserPlus size={14} /> Grow the roster
              </S.Eyebrow>
              <h2>Invite a teammate</h2>
              <ActionForm act={act} action="invite" disabled={busy} icon={<Send size={15} />} submit="Send invitation">
                <S.Field>
                  Username
                  <input maxLength={150} name="username" placeholder="Their thenewboston username" required />
                </S.Field>
              </ActionForm>
              {(tribe.invites ?? []).map((invite) => (
                <S.Row key={invite.id}>
                  <Player avatar={invite.avatar} name={invite.username} size={26} />
                  <S.Badge $tone="gold">Invited</S.Badge>
                </S.Row>
              ))}
            </S.Card>
            <S.Card>
              <S.PanelTitle>
                <h2>Applications</h2>
                {!!tribe.applications?.length && <S.Badge $tone="gold">{tribe.applications.length} waiting</S.Badge>}
              </S.PanelTitle>
              {!tribe.applications?.length && <S.Empty>No applications yet.</S.Empty>}
              {tribe.applications?.map((member) => (
                <S.Row key={member.id}>
                  <Player avatar={member.avatar} name={member.username} note="Wants to join" />
                  <S.Button
                    $size="small"
                    disabled={busy || tribe.members.length >= maximum}
                    onClick={() => act('accept_application', {user_id: member.id})}
                  >
                    Accept
                  </S.Button>
                </S.Row>
              ))}
            </S.Card>
            <S.Card>
              <S.Eyebrow>
                <Shield size={14} /> Identity
              </S.Eyebrow>
              <h2>Your tribe identity</h2>
              <TribeForm
                act={act}
                action="update_tribe"
                busy={busy}
                saving="save"
                submit="Save tribe"
                tribe={tribe}
                uploadEmblem={uploadEmblem}
              />
            </S.Card>
          </>
        )}
        {!recruiting && renderRoster()}
        {recruiting && (
          <S.Card>
            <S.Eyebrow>The week ahead</S.Eyebrow>
            <h2>Small team. Big plans.</h2>
            <S.Steps>
              <S.Step>
                <span>
                  <ItemIcon item="worker" size={30} />
                </span>
                <div>
                  <strong>Build an economy</strong>
                  <small>Gather, craft, and trade with your worker.</small>
                </div>
              </S.Step>
              <S.Step>
                <span>
                  <ItemIcon item="forest" size={30} />
                </span>
                <div>
                  <strong>Shape your strategy</strong>
                  <small>Expand your land. Forge alliances. Prepare your army.</small>
                </div>
              </S.Step>
              <S.Step>
                <span>
                  <ItemIcon item="catapult" size={30} />
                </span>
                <div>
                  <strong>Make your move</strong>
                  <small>Secret targets. One simultaneous final battle.</small>
                </div>
              </S.Step>
            </S.Steps>
            <S.Hint>
              Gameplay uses actual TNB from your app wallet. Your coins persist between seasons; land, goods, and units
              do not.
            </S.Hint>
          </S.Card>
        )}
      </S.Stack>
    </S.Grid>
  );
};

export default Recruitment;
