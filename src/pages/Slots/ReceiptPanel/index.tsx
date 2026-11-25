import {useState} from 'react';

import {CasinoBet} from 'types/casino';
import {getObservedCasinoCommitment} from 'utils/casino';
import {verifyCasinoReceipt} from 'utils/casinoFairness';

import * as P from '../Panel';
import {SlotSymbol} from '../Symbols';
import {describeBet, receiptLine, signOf} from '../utils';

import * as S from './Styles';

interface ReceiptPanelProps {
  bet: CasinoBet | null;
  onClose(): void;
  userId?: number | null;
}

const ReceiptPanel = ({bet, onClose, userId}: ReceiptPanelProps) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  if (!bet) {
    return (
      <P.Card aria-labelledby="slots-fair-heading">
        <P.Eyebrow>Provably fair</P.Eyebrow>
        <P.CardTitle id="slots-fair-heading">Every spin can be checked.</P.CardTitle>
        <S.Steps>
          <li>Before you bet, the casino commits to a secret seed by showing its hash.</li>
          <li>Your browser adds its own random seed to the wager.</li>
          <li>After the spin, the receipt reveals the seed so you can recompute the result here.</li>
        </S.Steps>
        <P.Note>Choose Receipt on any spin to verify it.</P.Note>
      </P.Card>
    );
  }

  const line = receiptLine(bet);

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    setVerified('');
    try {
      const observedHash = userId ? getObservedCasinoCommitment(userId, bet.request_id) : undefined;
      setVerified(await verifyCasinoReceipt(bet, observedHash));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to verify this receipt.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <P.Card aria-labelledby="slots-receipt-heading">
      <P.CardHeader>
        <div>
          <P.Eyebrow>Spin receipt</P.Eyebrow>
          <P.CardTitle id="slots-receipt-heading">{describeBet(bet)}</P.CardTitle>
        </div>
        <P.GhostButton aria-label="Close receipt" onClick={onClose} type="button">
          Close
        </P.GhostButton>
      </P.CardHeader>
      {line && (
        <S.Line>
          {line.map((symbol, index) => (
            <SlotSymbol key={index} labelled symbol={symbol} />
          ))}
        </S.Line>
      )}
      <S.Facts>
        <div>
          <dt>Stake</dt>
          <dd>{bet.amount.toLocaleString()} TNB</dd>
        </div>
        <div>
          <dt>Returned</dt>
          <dd>{bet.payout.toLocaleString()} TNB</dd>
        </div>
        <div>
          <dt>Net</dt>
          <dd data-sign={signOf(bet.profit)}>
            {bet.profit > 0 ? '+' : ''}
            {bet.profit.toLocaleString()} TNB
          </dd>
        </div>
        <div>
          <dt>Draw</dt>
          <dd>
            {bet.result.draw ?? '—'} <small>of 10,000</small>
          </dd>
        </div>
      </S.Facts>
      <S.Verify>
        <P.GhostButton disabled={isVerifying} onClick={handleVerify} type="button">
          {isVerifying ? 'Verifying…' : 'Verify receipt'}
        </P.GhostButton>
        {verified && <S.Verified role="status">{verified}</S.Verified>}
        {error && <S.Failed role="alert">{error}</S.Failed>}
      </S.Verify>
      <S.Details>
        <summary>Seeds and raw receipt</summary>
        <S.Seeds>
          <div>
            <dt>Server seed hash</dt>
            <dd>{bet.fairness.server_seed_hash}</dd>
          </div>
          <div>
            <dt>Server seed</dt>
            <dd>{bet.fairness.server_seed || 'Not revealed'}</dd>
          </div>
          <div>
            <dt>Client seed</dt>
            <dd>{bet.fairness.client_seed}</dd>
          </div>
          <div>
            <dt>Commitment</dt>
            <dd>{bet.fairness.commitment_id}</dd>
          </div>
          <div>
            <dt>Algorithm</dt>
            <dd>
              {bet.fairness.algorithm} · rules v{bet.rules_version}
            </dd>
          </div>
        </S.Seeds>
        <S.Raw>{JSON.stringify(bet, null, 2)}</S.Raw>
      </S.Details>
    </P.Card>
  );
};

export default ReceiptPanel;
