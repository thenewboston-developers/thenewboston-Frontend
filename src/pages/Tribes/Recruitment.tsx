import {TribesPanelProps} from 'types/tribes';

import {ActionForm, date} from './common';
import * as S from './Styles';

const TribeFields = ({tribe}: Pick<TribesPanelProps, 'tribe'>) => (
  <>
    <S.Field>
      Tribe name
      <input defaultValue={tribe?.name} maxLength={40} name="name" placeholder="The Iron Wolves" required />
    </S.Field>
    <S.InlineFields>
      <S.Field>
        Emblem
        <input defaultValue={tribe?.emblem ?? '🐺'} maxLength={8} name="emblem" required />
      </S.Field>
      <S.Field>
        Tribe color
        <input defaultValue={tribe?.color ?? '#43654b'} name="color" type="color" />
      </S.Field>
    </S.InlineFields>
    <S.Field>
      Motto
      <input defaultValue={tribe?.motto} maxLength={120} name="motto" placeholder="Strength through unity." />
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

const Recruitment = ({act, busy, now, state, tribe}: TribesPanelProps) => {
  const recruiting = state.season.status === 'recruiting' && now < new Date(state.season.starts_at).getTime();
  const founder = tribe?.founder_id === state.viewer?.id;
  return (
    <S.Grid>
      <S.Stack>
        <S.Card>
          <S.PanelTitle>
            <h2>Find your people.</h2>
            <S.Badge>{state.tribes.length} tribes</S.Badge>
          </S.PanelTitle>
          <S.Muted>
            Up to {state.catalog.max_members} players. One worker each. A whole world to build together. Rosters lock{' '}
            {date(state.season.starts_at)}.
          </S.Muted>
          {!state.tribes.length && (
            <S.Empty>A new world needs its first tribe. Start a team and invite your friends.</S.Empty>
          )}
          {state.tribes.map((team) => (
            <S.Row key={team.id}>
              <div>
                <strong>
                  {team.emblem} {team.name}
                </strong>
                <small>
                  {team.members.length}/{state.catalog.max_members} members · {team.motto || 'A new story begins'}
                </small>
                <S.Muted style={{margin: '8px 0 0'}}>{team.description}</S.Muted>
                <small>{team.members.map((member) => member.username).join(', ')}</small>
              </div>
              {team.id === tribe?.id ? (
                <S.Badge>Your tribe</S.Badge>
              ) : (
                <S.Button
                  $secondary
                  disabled={
                    busy ||
                    !recruiting ||
                    !!tribe ||
                    !state.viewer ||
                    team.members.length >= state.catalog.max_members ||
                    state.applications.some((entry) => entry.tribe_id === team.id)
                  }
                  onClick={() => act('apply', {tribe_id: team.id})}
                >
                  {state.applications.some((entry) => entry.tribe_id === team.id)
                    ? 'Application sent'
                    : 'Apply to join'}
                </S.Button>
              )}
            </S.Row>
          ))}
        </S.Card>
        {!!state.invitations.length && (
          <S.Card>
            <h2>Your invitations</h2>
            {state.invitations.map((invite) => (
              <S.Row key={invite.tribe_id}>
                <strong>{invite.name}</strong>
                <S.Button
                  disabled={busy || !recruiting || !!tribe}
                  onClick={() => act('accept_invite', {tribe_id: invite.tribe_id})}
                >
                  Accept invitation
                </S.Button>
              </S.Row>
            ))}
          </S.Card>
        )}
        {tribe && (
          <S.Card>
            <h2>{tribe.emblem} Your roster</h2>
            <S.Muted>
              {recruiting ? 'Make your plans before the season begins.' : 'Your roster is locked for this season.'}
            </S.Muted>
            {tribe.members.map((member) => (
              <S.Row key={member.id}>
                <div>
                  <strong>{member.username}</strong>
                  <small>{member.id === tribe.founder_id ? 'Founder' : 'Tribe member'}</small>
                </div>
                {founder && member.id !== state.viewer?.id && recruiting && (
                  <S.Button $secondary disabled={busy} onClick={() => act('remove_member', {user_id: member.id})}>
                    Remove
                  </S.Button>
                )}
              </S.Row>
            ))}
            {recruiting && (!founder || tribe.members.length === 1) && (
              <S.Actions style={{marginTop: 16}}>
                <S.Button $secondary disabled={busy} onClick={() => act('leave')}>
                  Leave tribe
                </S.Button>
              </S.Actions>
            )}
          </S.Card>
        )}
      </S.Stack>
      <S.Stack>
        {!tribe && state.viewer && recruiting && (
          <S.Card>
            <h2>Raise your banner</h2>
            <S.Muted>Create a tribe, bring up to seven friends, and decide what you will become.</S.Muted>
            <ActionForm act={act} action="create_tribe" disabled={busy} submit="Create tribe">
              <TribeFields />
            </ActionForm>
          </S.Card>
        )}
        {tribe && founder && recruiting && (
          <>
            <S.Card>
              <h2>Invite a teammate</h2>
              <ActionForm act={act} action="invite" disabled={busy} submit="Send invitation">
                <S.Field>
                  Username
                  <input maxLength={150} name="username" placeholder="Their thenewboston username" required />
                </S.Field>
              </ActionForm>
              {(tribe.invites ?? []).map((invite) => (
                <S.Row key={invite.id}>
                  <span>{invite.username}</span>
                  <S.Badge>Invited</S.Badge>
                </S.Row>
              ))}
            </S.Card>
            <S.Card>
              <h2>Applications</h2>
              {!tribe.applications?.length && <S.Empty>No applications yet.</S.Empty>}
              {tribe.applications?.map((member) => (
                <S.Row key={member.id}>
                  <strong>{member.username}</strong>
                  <S.Button
                    disabled={busy || tribe.members.length >= state.catalog.max_members}
                    onClick={() => act('accept_application', {user_id: member.id})}
                  >
                    Accept
                  </S.Button>
                </S.Row>
              ))}
            </S.Card>
            <S.Card>
              <h2>Your tribe identity</h2>
              <ActionForm act={act} action="update_tribe" disabled={busy} submit="Save tribe">
                <TribeFields tribe={tribe} />
              </ActionForm>
            </S.Card>
          </>
        )}
        <S.Card>
          <S.Eyebrow>THE WEEK AHEAD</S.Eyebrow>
          <h2>Small team. Big plans.</h2>
          <S.Row>
            <div>
              <strong>01 / Build an economy</strong>
              <small>Gather, craft, and trade with your worker.</small>
            </div>
          </S.Row>
          <S.Row>
            <div>
              <strong>02 / Shape your strategy</strong>
              <small>Expand your land. Forge alliances. Prepare your army.</small>
            </div>
          </S.Row>
          <S.Row>
            <div>
              <strong>03 / Make your move</strong>
              <small>Secret targets. One simultaneous final battle.</small>
            </div>
          </S.Row>
          <S.Muted style={{marginTop: 18}}>
            Gameplay uses actual TNB from your app wallet. Your coins persist between seasons; land, goods, and units do
            not.
          </S.Muted>
        </S.Card>
      </S.Stack>
    </S.Grid>
  );
};
export default Recruitment;
