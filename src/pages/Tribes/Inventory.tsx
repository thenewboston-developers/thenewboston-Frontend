import {useState} from 'react';

import {TribesPanelProps} from 'types/tribes';

import {ActionForm, count, ItemField, label, NumberField} from './common';
import * as S from './Styles';

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
            <h2>Goods & supplies</h2>
            <S.Badge>Season {state.season.id}</S.Badge>
          </S.PanelTitle>
          <S.Muted>Personal goods are yours. Every teammate can use the shared warehouse.</S.Muted>
          <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Personal</th>
                  <th>Tribal warehouse</th>
                </tr>
              </thead>
              <tbody>
                {state.catalog.trade_items.map((item) => (
                  <tr key={item}>
                    <td>
                      <strong>{label(item)}</strong>
                    </td>
                    <td>{count(state.viewer?.inventory[item])}</td>
                    <td>{tribe ? count(tribe.inventory?.[item]) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableScroll>
        </S.Card>
        <S.Card>
          <h2>Move goods</h2>
          <S.Muted>Share supplies, equip a teammate, or support another tribe. Every transfer is recorded.</S.Muted>
          <S.Field>
            Transfer
            <select onChange={(event) => setTransferMode(event.target.value)} value={transferMode}>
              <option value="deposit">Personal → tribal warehouse</option>
              <option value="withdraw">Tribal warehouse → personal</option>
              <option value="teammate">Personal → teammate</option>
              <option value="tribe">Tribal warehouse → another tribe</option>
            </select>
          </S.Field>
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
        <S.Card>
          <S.Eyebrow>YOUR APP WALLET</S.Eyebrow>
          <h2>{count(state.viewer?.wallet_balance)} TNB</h2>
          <S.Muted>Actual thenewboston coins. Your wallet balance carries over between seasons.</S.Muted>
          <S.LinkButton to="/wallets/home">Open wallets →</S.LinkButton>
        </S.Card>
        <S.Card>
          <S.Eyebrow>SHARED TRIBAL TREASURY</S.Eyebrow>
          <h2>{count(tribe?.treasury)} TNB</h2>
          <S.Muted>
            All members can spend or withdraw shared TNB. Deposits come from your app wallet. Unspent treasury is split
            equally among the locked roster at season end.
          </S.Muted>
          <ActionForm act={act} action="treasury_deposit" disabled={busy || !canPlay} submit="Deposit TNB">
            <NumberField label="TNB to deposit" max={Math.max(1, state.viewer?.wallet_balance ?? 0)} name="amount" />
          </ActionForm>
          <ActionForm act={act} action="treasury_withdraw" disabled={busy || !canPlay} submit="Withdraw to my wallet">
            <NumberField label="TNB to withdraw" max={Math.max(1, tribe?.treasury ?? 0)} name="amount" />
          </ActionForm>
        </S.Card>
        <S.Card>
          <h2>Send TNB to a tribe</h2>
          <S.Muted>Support your neighbors directly from the shared treasury.</S.Muted>
          <ActionForm act={act} action="transfer_tnb" disabled={busy || !canPlay || !rivals.length} submit="Send TNB">
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
          </ActionForm>
        </S.Card>
      </S.Stack>
    </S.Grid>
  );
};
export default Inventory;
