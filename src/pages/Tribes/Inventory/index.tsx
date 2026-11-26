import {useState} from 'react';
import {ArrowDownToLine, ArrowLeftRight, ArrowRight, ArrowUpFromLine, Send} from 'lucide-react';

import {TribesPanelProps} from 'types/tribes';

import ItemIcon from '../art/ItemIcon';
import {ActionForm, count, ItemField, itemKind, label, NumberField} from '../common';

import * as S from './Styles';

const GROUPS = [
  ['resource', 'Raw resources'],
  ['material', 'Refined materials'],
  ['tool', 'Tools'],
] as const;
const MODES = [
  ['deposit', 'My pack', 'Warehouse'],
  ['withdraw', 'Warehouse', 'My pack'],
  ['teammate', 'My pack', 'A teammate'],
  ['tribe', 'Warehouse', 'Another tribe'],
] as const;

const Inventory = ({act, busy, canPlay, state, tribe}: TribesPanelProps) => {
  const [transferMode, setTransferMode] = useState('deposit');
  const teammates = tribe?.members.filter((member) => member.id !== state.viewer?.id) ?? [];
  const rivals = state.tribes.filter((entry) => entry.id !== tribe?.id);
  const source = ['deposit', 'teammate'].includes(transferMode) ? 'personal' : 'tribe';
  const destination = ['withdraw', 'teammate'].includes(transferMode) ? 'personal' : 'tribe';
  return (
    <S.Grid>
      <S.Stack>
        <S.Card>
          <S.PanelTitle>
            <div>
              <S.Eyebrow>Stockpile</S.Eyebrow>
              <h2>Goods & supplies</h2>
            </div>
            <S.Badge $tone="neutral">Season {state.season.id}</S.Badge>
          </S.PanelTitle>
          <S.Muted>
            Personal goods are yours. Every teammate can use the shared warehouse. Each tile shows what you carry and
            what the tribe holds.
          </S.Muted>
          {GROUPS.map(([kind, title]) => {
            const items = state.catalog.trade_items.filter((item) => itemKind(state.catalog, item) === kind);
            if (!items.length) return null;
            return (
              <div key={kind}>
                <S.GroupTitle>{title}</S.GroupTitle>
                <S.Goods>
                  {items.map((item) => {
                    const personal = state.viewer?.inventory[item] ?? 0;
                    const shared = tribe?.inventory?.[item] ?? 0;
                    return (
                      <S.Good $empty={!personal && !shared} key={item}>
                        <ItemIcon item={item} size={38} />
                        <div>
                          <strong>{label(item)}</strong>
                          <S.GoodCounts>
                            <span>
                              <b>{count(personal)}</b>mine
                            </span>
                            <span>
                              <b>{tribe ? count(shared) : '—'}</b>tribe
                            </span>
                          </S.GoodCounts>
                        </div>
                      </S.Good>
                    );
                  })}
                </S.Goods>
              </div>
            );
          })}
        </S.Card>
        <S.Card>
          <S.Eyebrow>
            <ArrowLeftRight size={14} /> Logistics
          </S.Eyebrow>
          <h2>Move goods</h2>
          <S.Muted>Share supplies, equip a teammate, or support another tribe. Every transfer is recorded.</S.Muted>
          <S.FieldGroup aria-label="Transfer" role="radiogroup">
            Transfer
            <S.Choices $min={200}>
              {MODES.map(([mode, from, to]) => (
                <S.Choice $block key={mode}>
                  <input
                    checked={mode === transferMode}
                    name="transfer-mode"
                    onChange={() => setTransferMode(mode)}
                    type="radio"
                    value={mode}
                  />
                  <S.ChoiceBody>
                    {from} <ArrowRight size={14} /> {to}
                  </S.ChoiceBody>
                </S.Choice>
              ))}
            </S.Choices>
          </S.FieldGroup>
          <ActionForm
            act={act}
            action="transfer_items"
            disabled={
              busy ||
              !canPlay ||
              (transferMode === 'teammate' && !teammates.length) ||
              (transferMode === 'tribe' && !rivals.length)
            }
            fixed={{destination, source}}
            icon={<Send size={15} />}
            key={transferMode}
            submit="Transfer goods"
          >
            <S.InlineFields>
              <ItemField items={state.catalog.trade_items} />
              <NumberField label="Quantity" name="quantity" />
            </S.InlineFields>
            {transferMode === 'teammate' && (
              <S.Field>
                Recipient
                <select name="recipient_user_id" required>
                  {teammates.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.username}
                    </option>
                  ))}
                </select>
              </S.Field>
            )}
            {transferMode === 'tribe' && (
              <S.Field>
                Recipient tribe
                <select name="recipient_tribe_id" required>
                  {rivals.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.emblem} {team.name}
                    </option>
                  ))}
                </select>
              </S.Field>
            )}
          </ActionForm>
        </S.Card>
      </S.Stack>
      <S.Stack>
        <S.Card $dark>
          <S.Purse>
            <span>
              <ItemIcon item="tnb" size={44} />
            </span>
            <div>
              <S.Eyebrow $light style={{marginBottom: 0}}>
                Your app wallet
              </S.Eyebrow>
              <S.Balance $light>
                {count(state.viewer?.wallet_balance)} <small>TNB</small>
              </S.Balance>
            </div>
          </S.Purse>
          <S.Muted $dark style={{marginTop: 10}}>
            Actual thenewboston coins. Your wallet balance carries over between seasons.
          </S.Muted>
          <S.LinkButton style={{color: '#f6c865'}} to="/wallets/home">
            Open wallets <ArrowRight size={14} />
          </S.LinkButton>
        </S.Card>
        <S.Card>
          <S.Purse>
            <span style={{background: '#fbf1d9', borderColor: '#efdcae'}}>
              <ItemIcon item="treasury" size={46} />
            </span>
            <div>
              <S.Eyebrow style={{marginBottom: 0}}>Shared tribal treasury</S.Eyebrow>
              <S.Balance>
                {count(tribe?.treasury)} <small>TNB</small>
              </S.Balance>
            </div>
          </S.Purse>
          <S.Muted style={{marginTop: 10}}>
            All members can spend or withdraw shared TNB. Deposits come from your app wallet. Unspent treasury is split
            equally among the locked roster at season end.
          </S.Muted>
          <S.Stack style={{gap: 0}}>
            <ActionForm
              act={act}
              action="treasury_deposit"
              disabled={busy || !canPlay}
              icon={<ArrowDownToLine size={15} />}
              inline
              submit="Deposit TNB"
            >
              <NumberField label="TNB to deposit" max={Math.max(1, state.viewer?.wallet_balance ?? 0)} name="amount" />
            </ActionForm>
            <ActionForm
              act={act}
              action="treasury_withdraw"
              disabled={busy || !canPlay}
              icon={<ArrowUpFromLine size={15} />}
              inline
              secondary
              submit="Withdraw to my wallet"
            >
              <NumberField label="TNB to withdraw" max={Math.max(1, tribe?.treasury ?? 0)} name="amount" />
            </ActionForm>
          </S.Stack>
        </S.Card>
        <S.Card>
          <h2>Send TNB to a tribe</h2>
          <S.Muted>Support your neighbors directly from the shared treasury.</S.Muted>
          <ActionForm
            act={act}
            action="transfer_tnb"
            disabled={busy || !canPlay || !rivals.length}
            icon={<Send size={15} />}
            secondary
            submit="Send TNB"
          >
            <S.InlineFields>
              <S.Field>
                Recipient tribe
                <select name="recipient_tribe_id" required>
                  {rivals.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.emblem} {team.name}
                    </option>
                  ))}
                </select>
              </S.Field>
              <NumberField label="TNB amount" max={Math.max(1, tribe?.treasury ?? 0)} name="amount" />
            </S.InlineFields>
          </ActionForm>
        </S.Card>
      </S.Stack>
    </S.Grid>
  );
};

export default Inventory;
