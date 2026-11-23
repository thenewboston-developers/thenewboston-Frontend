import {FC} from 'react';

import {getStepPath, Point} from '../utils';

const ASK_COLOR = '#fb7185';
const BID_COLOR = '#4ade80';
const MIDDLE_X = 636;

// Buyers stack up toward the left of the middle price, sellers toward the right
const ASK_POINTS: Point[] = [
  [644, 186],
  [660, 172],
  [678, 158],
  [696, 140],
  [712, 126],
  [730, 110],
  [746, 94],
  [760, 80],
];

const BID_POINTS: Point[] = [
  [628, 186],
  [612, 172],
  [594, 156],
  [574, 142],
  [556, 124],
  [538, 108],
  [520, 96],
  [500, 80],
  [478, 68],
  [452, 60],
  [424, 54],
  [390, 50],
];

const ASK_PATH = getStepPath(ASK_POINTS);
const BID_PATH = getStepPath(BID_POINTS);

const Depth: FC = () => {
  return (
    <>
      <defs>
        <linearGradient id="banner-art-depth-asks" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={ASK_COLOR} stopOpacity="0.4" />
          <stop offset="1" stopColor={ASK_COLOR} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="banner-art-depth-bids" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={BID_COLOR} stopOpacity="0.36" />
          <stop offset="1" stopColor={BID_COLOR} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="banner-art-depth-fade-gradient"
          x1="420"
          x2="540"
          y1="0"
          y2="0"
        >
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        {/* The buyers have no edge of the chart to end on, so they fade out before they reach the copy */}
        <mask id="banner-art-depth-fade">
          <rect fill="url(#banner-art-depth-fade-gradient)" height="240" width="760" />
        </mask>
        <pattern height="20" id="banner-art-depth-dots" patternUnits="userSpaceOnUse" width="20">
          <circle cx="2" cy="2" fill="#ffffff" fillOpacity="0.12" r="1" />
        </pattern>
      </defs>
      <rect fill="url(#banner-art-depth-dots)" height="240" width="520" x="240" />
      <g mask="url(#banner-art-depth-fade)">
        <path d={`${BID_PATH}V240H${BID_POINTS[0][0]}Z`} fill="url(#banner-art-depth-bids)" />
        <path d={BID_PATH} fill="none" stroke={BID_COLOR} strokeLinejoin="round" strokeWidth="2" />
      </g>
      <path d={`${ASK_PATH}V240H${ASK_POINTS[0][0]}Z`} fill="url(#banner-art-depth-asks)" />
      <path d={ASK_PATH} fill="none" stroke={ASK_COLOR} strokeLinejoin="round" strokeWidth="2" />
      <line stroke="#ffffff" strokeDasharray="3 5" strokeOpacity="0.35" x1={MIDDLE_X} x2={MIDDLE_X} y1="20" y2="220" />
    </>
  );
};

export default Depth;
