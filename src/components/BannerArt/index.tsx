import {FC} from 'react';

import {BannerArtVariant} from 'enums';
import {SFC} from 'types';

import Board from './Board';
import Chart from './Chart';
import Coins from './Coins';
import Depth from './Depth';
import Engraving from './Engraving';
import Ledger from './Ledger';
import Ribbon from './Ribbon';
import Ripples from './Ripples';
import * as S from './Styles';

export interface BannerArtProps {
  variant: BannerArtVariant;
}

// A light tint of each surface, for small labels that sit on top of it
export const BANNER_ART_ACCENTS: Record<BannerArtVariant, string> = {
  [BannerArtVariant.board]: '#bdb6f8',
  [BannerArtVariant.chart]: '#86efc5',
  [BannerArtVariant.coins]: '#fcd34d',
  [BannerArtVariant.depth]: '#a3b3cc',
  [BannerArtVariant.engraving]: '#fcd34d',
  [BannerArtVariant.ledger]: '#7dd3fc',
  [BannerArtVariant.ribbon]: '#fcd34d',
  [BannerArtVariant.ripples]: '#fdba74',
};

const ARTWORKS: Record<BannerArtVariant, FC> = {
  [BannerArtVariant.board]: Board,
  [BannerArtVariant.chart]: Chart,
  [BannerArtVariant.coins]: Coins,
  [BannerArtVariant.depth]: Depth,
  [BannerArtVariant.engraving]: Engraving,
  [BannerArtVariant.ledger]: Ledger,
  [BannerArtVariant.ribbon]: Ribbon,
  [BannerArtVariant.ripples]: Ripples,
};

/**
 * The backdrop of a banner: a colored surface with a piece of line art, one of each per variant. It fills its parent,
 * which has to be positioned, clip its overflow and keep its own content above the art (position: relative).
 */
const BannerArt: SFC<BannerArtProps> = ({className, variant}) => {
  const Artwork = ARTWORKS[variant];
  const isPattern = variant === BannerArtVariant.board;

  return (
    <S.Container $variant={variant} aria-hidden="true" className={className}>
      <S.Art
        $isPattern={isPattern}
        preserveAspectRatio={isPattern ? undefined : 'xMaxYMid slice'}
        viewBox={isPattern ? undefined : '0 0 760 240'}
      >
        <Artwork />
      </S.Art>
    </S.Container>
  );
};

export default BannerArt;
