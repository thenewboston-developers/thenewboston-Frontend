import {FC} from 'react';

const CELL_SIZE = 36;

// A real board marks a handful of its intersections. Here one in every six is marked, in both directions
const STAR_POINT_SPACING = CELL_SIZE * 6;

// Unlike the other artworks this one is a pattern, drawn at its natural size however large the banner is
const Board: FC = () => {
  return (
    <>
      <defs>
        <pattern height={CELL_SIZE} id="banner-art-board-grid" patternUnits="userSpaceOnUse" width={CELL_SIZE}>
          <path d={`M${CELL_SIZE},0H0V${CELL_SIZE}`} fill="none" stroke="#ffffff" strokeOpacity="0.1" />
        </pattern>
        <pattern
          height={STAR_POINT_SPACING}
          id="banner-art-board-star-points"
          patternUnits="userSpaceOnUse"
          width={STAR_POINT_SPACING}
        >
          <circle cx={CELL_SIZE * 3} cy={CELL_SIZE * 3} fill="#ffffff" fillOpacity="0.22" r="3" />
        </pattern>
      </defs>
      <rect fill="url(#banner-art-board-grid)" height="100%" width="100%" />
      <rect fill="url(#banner-art-board-star-points)" height="100%" width="100%" />
    </>
  );
};

export default Board;
