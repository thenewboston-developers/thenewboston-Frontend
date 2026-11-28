import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, LogIn, RefreshCw, Users} from 'lucide-react';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {getSelf} from 'selectors/state';
import {TribesTournament} from 'types/tribes';
import {analyticsArea} from 'utils/analyticsAttributes';
import {getAuthenticationPath} from 'utils/authentication';

import HeroScene from './art/HeroScene';
import {date, plural} from './common';
import * as S from './DiscoveryStyles';
import TournamentCover from './TournamentCover';
import {useTournaments} from './useTournaments';

const GROUPS: {status: TribesTournament['status']; title: string; label: string; tone: 'gold' | 'green' | 'neutral'}[] =
  [
    {status: 'upcoming', title: 'Upcoming tournaments', label: 'Upcoming', tone: 'gold'},
    {status: 'active', title: 'Active tournaments', label: 'Active', tone: 'green'},
    {status: 'finished', title: 'Finished tournaments', label: 'Finished', tone: 'neutral'},
  ];

const capacity = (tournament: TribesTournament) => {
  if (tournament.status !== 'upcoming') return 'Roster set';
  if (tournament.player_count >= tournament.max_players) return 'Full';
  return `${plural(tournament.max_players - tournament.player_count, 'place')} available`;
};

const Tournaments = () => {
  const self = useSelector(getSelf);
  const {error, loading, loadingMore, loadMore, more, refresh, tournaments} = useTournaments(self.id);
  return (
    <S.Container {...analyticsArea('tribes')}>
      <S.Content>
        <S.Hero>
          <HeroScene phase="upcoming" />
          <S.HeroScrim />
          <S.HeroBody>
            <S.HeroTop>
              <S.HeroLink to="/games">
                <ArrowLeft size={16} /> All games
              </S.HeroLink>
              <S.HeroBadge>Multiplayer strategy tournaments</S.HeroBadge>
            </S.HeroTop>
            <S.HeroCopy>
              <S.HeroStatus>A world built together</S.HeroStatus>
              <S.HeroTitle>Tribes</S.HeroTitle>
              <S.HeroTagline>
                Build an economy, trade with your rivals, and prepare your tribe for one decisive battle.
              </S.HeroTagline>
              <S.Actions style={{marginTop: 20}}>
                <S.Button $size="large" $variant="accent" as={Link} to="/tribes/guide">
                  <BookOpen size={18} /> How to play
                </S.Button>
                {!self.id && (
                  <>
                    <S.HeroLink to={getAuthenticationPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, '/tribes')}>
                      Create account <ArrowRight size={18} />
                    </S.HeroLink>
                    <S.HeroLink to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, '/tribes')}>
                      <LogIn size={18} /> Sign in
                    </S.HeroLink>
                  </>
                )}
              </S.Actions>
            </S.HeroCopy>
          </S.HeroBody>
        </S.Hero>
        <S.Banner $tone="sky">
          <Users size={18} />
          <div>
            Explore any tournament. The organizer enrolls players and assigns teams. You can play in multiple
            tournaments, with one tribe in each.
          </div>
        </S.Banner>
        {error && (
          <S.Banner $tone="ember" role="alert">
            <div>{error}</div>
            <S.Button $size="small" onClick={refresh}>
              <RefreshCw size={14} /> Try again
            </S.Button>
          </S.Banner>
        )}
        {loading && <S.Loading role="status">Loading tournaments…</S.Loading>}
        {!loading && !error && !tournaments.length && (
          <S.Card>
            <h2>No tournaments yet</h2>
            <S.Muted>New tournaments will appear here when an organizer schedules them.</S.Muted>
          </S.Card>
        )}
        {GROUPS.map(({status, title, label, tone}) => {
          const entries = tournaments
            .filter((entry) => entry.status === status)
            .sort((a, b) =>
              status === 'finished'
                ? new Date(b.ends_at).getTime() - new Date(a.ends_at).getTime()
                : new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
            );
          if (!entries.length) return null;
          return (
            <section aria-label={title} key={status}>
              <S.PanelTitle>
                <h2>{title}</h2>
                <S.Badge $tone="neutral">{entries.length}</S.Badge>
              </S.PanelTitle>
              <S.Cards $min={300}>
                {entries.map((entry) => (
                  <S.TournamentCard $flush as="article" key={entry.id}>
                    <TournamentCover src={entry.cover_image} />
                    <S.TournamentDetails>
                      <S.PanelTitle>
                        <S.Badge $tone={tone}>{label}</S.Badge>
                        {entry.is_participant && (
                          <S.Badge $tone="green">
                            <Check size={12} /> You are enrolled
                          </S.Badge>
                        )}
                      </S.PanelTitle>
                      <h3>{entry.title}</h3>
                      <S.Muted>
                        <CalendarDays size={14} /> Starts {date(entry.starts_at)}
                        <br />
                        Ends {date(entry.ends_at)}
                      </S.Muted>
                      <S.Row>
                        <span>
                          {entry.player_count} / {entry.max_players} players
                        </span>
                        <S.Hint>{capacity(entry)}</S.Hint>
                      </S.Row>
                      <S.Button $block as={Link} to={`/tribes/tournaments/${entry.id}/home`}>
                        {status === 'finished' ? 'View results' : 'View tournament'} <ArrowRight size={16} />
                      </S.Button>
                    </S.TournamentDetails>
                  </S.TournamentCard>
                ))}
              </S.Cards>
            </section>
          );
        })}
        {more && (
          <S.Button disabled={loadingMore} onClick={loadMore}>
            {loadingMore ? 'Loading tournaments…' : 'Load more tournaments'}
          </S.Button>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Tournaments;
