import {Check, Crown, MapPin, Swords, Users} from 'lucide-react';

import {Tribe, TribesPanelProps} from 'types/tribes';

import {count, Player, plural} from '../common';
import Emblem from '../components/Emblem';
import PlayerAvatar from '../components/PlayerAvatar';

import * as S from './Styles';

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

const Rosters = ({state, tribe}: TribesPanelProps) => {
  const maximum = state.catalog.max_members;
  const participantMessage =
    state.tournament.status === 'upcoming'
      ? 'You are enrolled. Your organizer will assign your tribe before the tournament starts.'
      : 'You are enrolled without an assigned tribe. Rosters are locked, so you can view this tournament as a spectator.';
  const spectatorMessage =
    state.tournament.status === 'upcoming'
      ? 'You can explore this tournament as a spectator. Contact the organizer to request a place.'
      : 'You are viewing this tournament as a spectator. Rosters are locked.';
  const teams = [...state.tribes].sort((a, b) => Number(b.id === tribe?.id) - Number(a.id === tribe?.id));
  return (
    <S.Grid>
      <S.Card>
        <S.PanelTitle>
          <div>
            <S.Eyebrow>
              <Users size={14} /> Tournament teams
            </S.Eyebrow>
            <h2>The tribes of this tournament</h2>
          </div>
          <S.Badge $tone="gold">{plural(teams.length, 'tribe')}</S.Badge>
        </S.PanelTitle>
        <S.Muted>
          The organizer enrolls players and assigns tribes. Each player belongs to one tribe in this tournament.
        </S.Muted>
        {!teams.length && <S.Empty>Teams have not been assigned yet. Check back for the tournament roster.</S.Empty>}
        <S.Cards $min={270}>
          {teams.map((team) => (
            <S.TribeCard $color={team.color} $own={team.id === tribe?.id} key={team.id}>
              <S.TribeHead>
                <Emblem color={team.color} emblem={team.emblem} image={team.emblem_image} size={46} />
                <div>
                  <h3>{team.name}</h3>
                  <em>{team.motto || 'A new story begins'}</em>
                </div>
              </S.TribeHead>
              {team.description && <p>{team.description}</p>}
              {state.tournament.status !== 'upcoming' && (
                <S.TribeStats>
                  <span>
                    <MapPin size={13} />{' '}
                    {plural(state.plots.filter((plot) => plot.tribe_id === team.id).length, 'plot')}
                  </span>
                  <span>
                    <Swords size={13} />{' '}
                    {count(
                      state.units
                        .filter((unit) => unit.tribe_id === team.id)
                        .reduce(
                          (total, unit) => total + (state.catalog.units[unit.item]?.damage ?? 0) * unit.quantity,
                          0,
                        ),
                    )}{' '}
                    attack
                  </span>
                </S.TribeStats>
              )}
              <Roster maximum={maximum} team={team} />
              <S.Hint>{team.members.map((member) => member.username).join(', ') || 'No players assigned yet'}</S.Hint>
              <S.TribeFooter>
                <S.Badge $tone="neutral">
                  {team.members.length}/{maximum} members
                </S.Badge>
                {team.id === tribe?.id && (
                  <S.Badge $tone="gold">
                    <Check size={12} /> Your tribe
                  </S.Badge>
                )}
              </S.TribeFooter>
            </S.TribeCard>
          ))}
        </S.Cards>
      </S.Card>
      <S.Stack>
        <S.Card>
          <h2>{tribe ? 'Your roster' : 'Your participation'}</h2>
          {tribe ? (
            <>
              <S.Muted>Your teammates in this tournament.</S.Muted>
              {tribe.members.map((member) => (
                <S.Row key={member.id}>
                  <Player avatar={member.avatar} name={member.username} />
                  <S.Badge $tone={member.id === tribe.founder_id ? 'gold' : 'neutral'}>
                    {member.id === tribe.founder_id && <Crown size={11} />}
                    {member.id === tribe.founder_id ? 'Captain' : 'Member'}
                  </S.Badge>
                </S.Row>
              ))}
            </>
          ) : (
            <S.Muted>{state.viewer?.is_participant ? participantMessage : spectatorMessage}</S.Muted>
          )}
        </S.Card>
        <S.Banner $tone="green">
          <Users size={18} />
          <div>
            You can participate in multiple tournaments. Each has its own tribe, world, goods, and final battle.
          </div>
        </S.Banner>
      </S.Stack>
    </S.Grid>
  );
};

export default Rosters;
