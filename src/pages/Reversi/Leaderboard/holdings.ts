// The top four ranks hold the corners, the squares that can never be flipped back. The next 24 ranks fill the rest of
// the edge, and everyone after them plays from the center, where every game starts.
const CORNERS = ['a1', 'h1', 'a8', 'h8'] as const;
const EDGE_RANKS = 28;

export type Holding = (typeof CORNERS)[number] | 'center' | 'edge';

export const getHolding = (rank: number): Holding => {
  if (rank <= CORNERS.length) return CORNERS[rank - 1];
  return rank <= EDGE_RANKS ? 'edge' : 'center';
};

export const getHoldingLabel = (holding: Holding) => {
  if (holding === 'center') return 'Center';
  return holding === 'edge' ? 'Edge' : `Corner ${holding}`;
};
