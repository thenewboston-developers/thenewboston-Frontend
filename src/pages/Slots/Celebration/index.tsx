import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';

import {CasinoBet} from 'types/casino';

import useCountUp from '../useCountUp';
import {describeLine, receiptLine, TIER_LABELS, WinTier, winTier} from '../utils';

import ParticleField from './particles';
import * as S from './Styles';

export interface CoinCanvasHandle {
  burst(tier: WinTier, origin: {x: number; y: number}): void;
  clear(): void;
}

// Covers its positioned parent; draws nothing until a win bursts.
export const CoinCanvas = forwardRef<CoinCanvasHandle>((_, ref) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const field = useRef<ParticleField | null>(null);

  useImperativeHandle(ref, () => ({
    burst(tier, origin) {
      if (!canvas.current) return;
      if (!field.current) field.current = new ParticleField(canvas.current);
      field.current.burst(tier, origin);
    },
    clear() {
      field.current?.clear();
    },
  }));

  useEffect(
    () => () => {
      field.current?.destroy();
      field.current = null;
    },
    [],
  );

  return <S.Canvas aria-hidden="true" ref={canvas} />;
});

CoinCanvas.displayName = 'CoinCanvas';

// The marquee shows a win for a moment, longer for bigger wins, then returns to the title.
const SHOW_FOR: Record<WinTier, number> = {
  big: 4600,
  huge: 5600,
  jackpot: 7000,
  loss: 0,
  nice: 3800,
  push: 0,
  win: 3200,
};
const COUNT_FOR: Record<WinTier, number> = {
  big: 1500,
  huge: 2200,
  jackpot: 3200,
  loss: 0,
  nice: 1100,
  push: 0,
  win: 700,
};

interface WinBannerProps {
  animate: boolean;
  bet: CasinoBet;
  onDone(): void;
}

// Lights up the marquee above the reels, so the winning line itself stays in view.
export const WinBanner = ({animate, bet, onDone}: WinBannerProps) => {
  const done = useRef(onDone);
  const line = receiptLine(bet);
  const tier = winTier(bet.result.multiplier);
  const amount = useCountUp(bet.payout, COUNT_FOR[tier], animate, 0);
  done.current = onDone;

  useEffect(() => {
    const timer = setTimeout(() => done.current(), SHOW_FOR[tier]);
    return () => clearTimeout(timer);
  }, [tier]);

  if (tier === 'loss' || tier === 'push') return null;

  return (
    <S.Banner aria-hidden="true" data-tier={tier}>
      <S.BannerRow>
        <S.BannerLabel>{TIER_LABELS[tier]}</S.BannerLabel>
        <S.BannerAmount>
          {amount.toLocaleString()}
          <small>TNB</small>
        </S.BannerAmount>
      </S.BannerRow>
      <S.BannerNote>
        {line ? describeLine(line, bet.result.multiplier) : 'Winning line'} · {bet.result.multiplier}× your stake
      </S.BannerNote>
    </S.Banner>
  );
};
