import {ArrowRight, BookOpen, Clock} from 'lucide-react';

import {TribesState} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {duration, itemKind, label} from '../common';

import * as S from './Styles';

const CHAPTERS: {icons: string[]; text: string[]; title: string}[] = [
  {
    icons: ['worker', 'treasury'],
    text: [
      'Create a tribe or apply to one during recruitment. A founder can invite friends and accept applications, with a maximum of eight players. Once the seven-day season starts, rosters lock and all members have equal economic permissions.',
    ],
    title: 'Find your people.',
  },
  {
    icons: ['timber', 'pickaxe', 'lumber'],
    text: [
      'Each player has one worker and can queue up to 24 hours of gathering, crafting, or construction. Gather from owned land. Refine materials, build facilities, and manufacture tools to improve production. Completed work is retained when you cancel an assignment.',
    ],
    title: 'Your worker keeps going.',
  },
  {
    icons: ['tnb', 'treasury'],
    text: [
      "All prices use actual TNB from your thenewboston wallet. Deposit coins in your tribe's treasury to buy land, or trade from your wallet or the treasury. Every member can spend or withdraw what is in the treasury. There are no starting coin grants, wallet resets, or guaranteed tournament payouts.",
      'Opening market stock is finite. Player sell orders reserve goods and buy orders reserve TNB. Cancel an unfilled order to return its escrow. Your existing wallet wealth can fund gameplay.',
    ],
    title: 'A real shared economy.',
  },
  {
    icons: ['forest', 'iron_deposit', 'plains'],
    text: [
      'Buy plots next to your territory, including diagonals. Different plots supply timber, iron ore, coal, wheat, hides, or stone. Infrastructure improves production. Weapons must be placed on owned land; range uses the greatest horizontal or vertical tile distance.',
    ],
    title: 'Land creates opportunity.',
  },
  {
    icons: ['pack', 'warehouse'],
    text: [
      'Goods you gather and craft go into your pack, which only you can use, or into the warehouse, which every member can use. Move them between the two in Inventory, hand them to a teammate, or send them to another tribe.',
      'Create work orders and coordinate in private tribe chat. Other tribes can exchange letters with your whole team. Alliances and promises are informal. Military production and placement are public; attack targets remain secret to your tribe.',
    ],
    title: 'Cooperation is your advantage.',
  },
  {
    icons: ['infantry', 'catapult', 'stone_wall'],
    text: [
      "Only a unit's controller can set its target. Choose an enemy with land in range; unassigned units do not attack. At the cutoff all economic actions stop and every completed unit with a valid target attacks simultaneously. Defenses absorb incoming damage proportionally. Net effective damage decides the winner, with shared ranks for ties.",
    ],
    title: 'One simultaneous battle.',
  },
  {
    icons: ['tnb', 'trebuchet'],
    text: [
      'Land, goods, buildings, and military units belong to one season. App TNB balances persist. Unspent treasury is divided equally among the locked roster, with leftover whole coins assigned by member ID. Unfilled buy orders return their escrow. Spent coins are not refunded. Rankings, battle reports, and your contributions remain in history.',
    ],
    title: 'The next story awaits.',
  },
];

const Guide = ({catalog}: {catalog?: TribesState['catalog']}) => (
  <S.Stack>
    <S.Card $dark>
      <S.Intro>
        <S.Eyebrow $light>
          <BookOpen size={14} /> How to play
        </S.Eyebrow>
        <h2>Seven days. One world. One battle.</h2>
        <S.Muted $dark style={{marginBottom: 0}}>
          Form a tribe, build an economy with real TNB, and decide in secret who your weapons will strike when the
          season ends.
        </S.Muted>
      </S.Intro>
    </S.Card>
    <S.Cards $min={300}>
      {CHAPTERS.slice(0, 6).map((chapter, index) => (
        <S.Chapter key={chapter.title}>
          <S.ChapterArt>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div aria-hidden>
              {chapter.icons.map((icon) => (
                <span key={icon}>
                  <ItemIcon item={icon} size={32} />
                </span>
              ))}
            </div>
          </S.ChapterArt>
          <h2>{chapter.title}</h2>
          {chapter.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </S.Chapter>
      ))}
    </S.Cards>
    <S.Banner $tone="gold">
      <ItemIcon item="tnb" size={36} />
      <div>
        <strong style={{display: 'block', fontSize: 15, marginBottom: 2}}>
          Resources reset. Reputation does not. {CHAPTERS[6].title}
        </strong>
        {CHAPTERS[6].text[0]}
      </div>
    </S.Banner>
    {catalog && (
      <>
        <S.Card>
          <S.Eyebrow>The codex</S.Eyebrow>
          <h2>Land and what it yields</h2>
          <S.Muted>
            A worker gathers about {catalog.gather_rate} an hour, more with experience, the right tool and a matching
            building. Up to {catalog.gather_capacity} workers can share a plot.
          </S.Muted>
          <S.Cards $min={210}>
            {Object.entries(catalog.land).map(([terrain, land]) => (
              <S.Land key={terrain}>
                <ItemIcon item={terrain} size={40} />
                <div>
                  <strong>{label(terrain)}</strong>
                  <small>
                    Yields {label(land.resource).toLowerCase()} · {land.price} TNB a plot
                  </small>
                </div>
                <ItemIcon item={land.resource} size={30} />
              </S.Land>
            ))}
          </S.Cards>
        </S.Card>
        <S.Card>
          <S.Eyebrow>The codex</S.Eyebrow>
          <h2>Everything your worker can make</h2>
          <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Recipe</th>
                  <th>Time</th>
                  <th>Needs</th>
                  <th>In battle</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(catalog.recipes).map(([item, recipe]) => (
                  <tr key={item}>
                    <td>
                      <S.RowMain>
                        <ItemIcon item={item} size={32} />
                        <div>
                          <strong style={{whiteSpace: 'nowrap'}}>{label(item)}</strong>
                          <small style={{color: '#8d978f', fontSize: 11.5}}>{label(itemKind(catalog, item))}</small>
                        </div>
                      </S.RowMain>
                    </td>
                    <td>
                      <S.Chain>
                        {Object.entries(recipe.inputs).map(([input, quantity]) => (
                          <S.Chip key={input}>
                            <ItemIcon item={input} size={20} />
                            {quantity} {label(input)}
                          </S.Chip>
                        ))}
                        <ArrowRight size={14} />
                      </S.Chain>
                    </td>
                    <td style={{whiteSpace: 'nowrap'}}>
                      <Clock size={12} style={{verticalAlign: '-1px'}} /> {duration(recipe.seconds)}
                    </td>
                    <td>{recipe.facility ? label(recipe.facility) : '—'}</td>
                    <td style={{whiteSpace: 'nowrap'}}>
                      {catalog.units[item] &&
                        `${catalog.units[item].damage} damage · range ${catalog.units[item].range}`}
                      {catalog.defenses[item] && `Absorbs ${catalog.defenses[item]}`}
                      {!catalog.units[item] && !catalog.defenses[item] && '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableScroll>
        </S.Card>
      </>
    )}
  </S.Stack>
);

export default Guide;
