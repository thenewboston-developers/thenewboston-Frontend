import * as S from './Styles';

const Guide = () => (
  <S.Cards>
    <S.Card>
      <S.Eyebrow>01 / FORM A TRIBE</S.Eyebrow>
      <h2>Find your people.</h2>
      <S.Muted>
        Create a tribe or apply to one during recruitment. A founder can invite friends and accept applications, with a
        maximum of eight players. Once the seven-day season starts, rosters lock and all members have equal economic
        permissions.
      </S.Muted>
    </S.Card>
    <S.Card>
      <S.Eyebrow>02 / BUILD AN ECONOMY</S.Eyebrow>
      <h2>Your worker keeps going.</h2>
      <S.Muted>
        Each player has one worker and can queue up to 24 hours of gathering, crafting, or construction. Gather from
        owned land. Refine materials, build facilities, and manufacture tools to improve production. Completed work is
        retained when you cancel an assignment.
      </S.Muted>
    </S.Card>
    <S.Card>
      <S.Eyebrow>03 / TRADE WITH TNB</S.Eyebrow>
      <h2>A real shared economy.</h2>
      <S.Muted>
        All prices use actual TNB from your thenewboston wallet. Deposit coins in your tribe's treasury to buy land, or
        trade using personal or shared funds. Every member can spend or withdraw shared funds. There are no starting
        coin grants, wallet resets, or guaranteed tournament payouts.
      </S.Muted>
      <S.Muted>
        Opening market stock is finite. Player sell orders reserve goods and buy orders reserve TNB. Cancel an unfilled
        order to return its escrow. Your existing wallet wealth can fund gameplay.
      </S.Muted>
    </S.Card>
    <S.Card>
      <S.Eyebrow>04 / THINK GEOGRAPHICALLY</S.Eyebrow>
      <h2>Land creates opportunity.</h2>
      <S.Muted>
        Buy plots next to your territory, including diagonals. Different plots supply timber, iron ore, coal, wheat,
        hides, or stone. Infrastructure improves production. Weapons must be placed on owned land; range uses the
        greatest horizontal or vertical tile distance.
      </S.Muted>
    </S.Card>
    <S.Card>
      <S.Eyebrow>05 / PLAN TOGETHER</S.Eyebrow>
      <h2>Cooperation is your advantage.</h2>
      <S.Muted>
        Share supplies, create work orders, and coordinate in private tribe chat. Other tribes can exchange letters with
        your whole team. Alliances and promises are informal. Military production and placement are public; attack
        targets remain secret to your tribe.
      </S.Muted>
    </S.Card>
    <S.Card>
      <S.Eyebrow>06 / THE GREAT WAR</S.Eyebrow>
      <h2>One simultaneous battle.</h2>
      <S.Muted>
        Only a unit's controller can set its target. Choose an enemy with land in range; unassigned units do not attack.
        At the cutoff all economic actions stop and every completed unit with a valid target attacks simultaneously.
        Defenses absorb incoming damage proportionally. Net effective damage decides the winner, with shared ranks for
        ties.
      </S.Muted>
    </S.Card>
    <S.Card>
      <S.Eyebrow>07 / RESOURCES RESET. REPUTATION DOESN'T.</S.Eyebrow>
      <h2>The next story awaits.</h2>
      <S.Muted>
        Land, goods, buildings, and military units belong to one season. App TNB balances persist. Unspent treasury is
        divided equally among the locked roster, with leftover whole coins assigned by member ID. Unfilled buy orders
        return their escrow. Spent coins are not refunded. Rankings, battle reports, and your contributions remain in
        history.
      </S.Muted>
    </S.Card>
  </S.Cards>
);
export default Guide;
