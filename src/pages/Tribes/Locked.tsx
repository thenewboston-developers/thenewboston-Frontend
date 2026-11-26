import {ArrowRight, Hourglass} from 'lucide-react';

import {TribesPanelProps} from 'types/tribes';

import ItemIcon from './art/ItemIcon';
import {date, duration} from './common';
import * as S from './Styles';

const COPY: Record<string, {icons: string[]; points: string[]; text: string; title: string}> = {
  inventory: {
    icons: ['warehouse', 'treasury', 'tnb'],
    points: [
      'A personal pack and a warehouse the whole tribe shares',
      'A treasury funded with real TNB from your wallet',
      'Every transfer recorded for the tribe to see',
    ],
    text: 'Goods and the shared treasury open the moment the season starts. Nothing is granted for free: what your tribe owns, it gathered, crafted, traded or paid for.',
    title: 'Empty shelves, for now',
  },
  market: {
    icons: ['lumber', 'tnb', 'iron_ingot'],
    points: [
      'Opening stock of raw materials, never replenished',
      'Sell orders hold goods and buy orders hold TNB until filled',
      'Trade with any tribe, friend or rival',
    ],
    text: 'The marketplace opens with the season. Prices are in real TNB, set by the players.',
    title: 'The market opens at dawn',
  },
  military: {
    icons: ['infantry', 'catapult', 'stone_wall'],
    points: [
      'Infantry, catapults and trebuchets with different reach',
      'Barricades and walls that absorb incoming damage',
      'Secret targets, revealed only in the final battle',
    ],
    text: 'Armies are built during the week and strike once, all together, when the season ends.',
    title: 'No armies yet',
  },
  production: {
    icons: ['worker', 'pickaxe', 'workshop'],
    points: [
      'One worker each, up to 24 hours of queued work',
      'Gather six resources and refine them into materials',
      'Build camps, mines and workshops to produce faster',
    ],
    text: 'Your worker starts when the season does, and keeps going while you are away.',
    title: 'Your worker is waiting',
  },
  tribe: {
    icons: ['worker', 'treasury', 'warehouse'],
    points: [
      'Up to eight players, all with equal say over the economy',
      'Shared projects that show what the tribe needs next',
      'A private chat and a permanent activity record',
    ],
    text: 'Create a tribe or join one during recruitment. Rosters lock when the season starts.',
    title: 'Find your people first',
  },
  world: {
    icons: ['forest', 'iron_deposit', 'plains'],
    points: [
      'Every tribe starts on a home plot with all six resources nearby',
      'Buy neighboring land with your shared treasury',
      'Where you stand decides who your weapons can reach',
    ],
    text: 'The map is generated when recruitment ends, sized to the number of tribes that joined.',
    title: 'A new world is being drawn',
  },
};

// Sections that depend on the generated world explain themselves while tribes are still forming
const Locked = ({go, now, section, state, tribe}: TribesPanelProps & {section: string}) => {
  const copy = COPY[section] ?? COPY.world;
  const startsAt = new Date(state.season.starts_at).getTime();
  return (
    <S.Card $dark>
      <S.Teaser>
        <S.TeaserArt aria-hidden>
          {copy.icons.map((icon) => (
            <span key={icon}>
              <ItemIcon item={icon} size={56} />
            </span>
          ))}
        </S.TeaserArt>
        <S.Eyebrow $light>
          <Hourglass size={14} /> Opens in {duration((startsAt - now) / 1000)}
        </S.Eyebrow>
        <h2>{copy.title}</h2>
        <S.Muted $dark>{copy.text}</S.Muted>
        <ul>
          {copy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <S.Actions style={{justifyContent: 'center'}}>
          <S.Button $variant="accent" onClick={() => go?.('home')}>
            {tribe ? 'Back to your roster' : 'Find a tribe'} <ArrowRight size={16} />
          </S.Button>
          <S.Hint $dark>The season starts {date(state.season.starts_at)}.</S.Hint>
        </S.Actions>
      </S.Teaser>
    </S.Card>
  );
};

export default Locked;
