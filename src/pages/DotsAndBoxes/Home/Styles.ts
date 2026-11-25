import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import UUserSearchInput from 'components/UserSearchInput';
import {fonts} from 'styles';
import {DotsAndBoxesSide} from 'types/dotsAndBoxes';

import URules from '../Rules';
import {cornerDots, dotGrid, dots, hiddenInput, inkButton, label, sheet} from '../theme';

export {Badge, Container, Navigation, TextLink} from '../Styles';

export type MatchTone = 'closed' | 'draw' | 'incoming' | 'lost' | 'turn' | 'waiting' | 'won';

// The side of a match row drawn in ink, and the colour of its action: [line, text, background]
const TONES: Record<MatchTone, [string, string, string]> = {
  closed: [dots.pencil, dots.inkSoft, 'transparent'],
  draw: [dots.pencilDark, dots.inkSoft, 'transparent'],
  incoming: [dots.gold, '#3b2a06', dots.gold],
  lost: [dots.red, dots.red, 'transparent'],
  turn: [dots.blue, '#ffffff', dots.blue],
  waiting: [dots.pencilDark, dots.inkSoft, 'transparent'],
  won: [dots.blue, dots.blue, 'transparent'],
};

const SIDE_INK: Record<DotsAndBoxesSide, string> = {blue: dots.blue, red: dots.red};

// The faint pencil a choice is drawn in until it is picked, and the ink it takes once it is
const pencilSketch = css`
  --sketch-blue: #98a2bb;
  --sketch-blue-fill: #eceef4;
  --sketch-dot: #98a2bb;
  --sketch-free: #c9cfdd;
  --sketch-open: #e6e9f0;
  --sketch-red: #b6bccd;
  --sketch-red-fill: #f1f2f6;
`;

const inkSketch = css`
  --sketch-blue: ${dots.blue};
  --sketch-blue-fill: ${dots.blueFill};
  --sketch-dot: ${dots.dot};
  --sketch-free: #9fb1db;
  --sketch-open: #d7dce8;
  --sketch-red: ${dots.red};
  --sketch-red-fill: ${dots.redFill};
`;

// A choice is a box on the sheet. Picking it claims it: its four sides are drawn in from the corners and it fills
// with blue, the colour of the player who sets up the game.
const choiceBox = css`
  ${pencilSketch};
  ${cornerDots('var(--corner-dot)', 9, 2)};
  --corner-dot: #a3acc2;
  background: #ffffffc7;
  border: 2px solid ${dots.pencil};
  color: ${dots.inkSoft};
  display: flex;
  flex: 1;
  min-width: 0;
  position: relative;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &::before {
    background-image:
      linear-gradient(${dots.blue}, ${dots.blue}), linear-gradient(${dots.blue}, ${dots.blue}),
      linear-gradient(${dots.blue}, ${dots.blue}), linear-gradient(${dots.blue}, ${dots.blue});
    background-position:
      left top,
      right top,
      right bottom,
      left bottom;
    background-repeat: no-repeat;
    background-size:
      0 4px,
      4px 0,
      0 4px,
      4px 0;
    content: '';
    inset: -3px;
    pointer-events: none;
    position: absolute;
    transition: background-size 0.3s ease-out;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      --corner-dot: ${dots.pencilDark};
      border-color: #aeb6cb;
      z-index: 1;
    }
  }

  input:checked + & {
    ${inkSketch};
    --corner-dot: ${dots.dot};
    background: ${dots.blueFill};
    color: ${dots.ink};
    z-index: 2;
  }

  input:checked + &::before {
    background-size:
      100% 4px,
      4px 100%,
      100% 4px,
      4px 100%;
  }

  input:focus-visible + & {
    outline: 3px solid ${dots.gold};
    outline-offset: 6px;
    z-index: 3;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    input:checked + & {
      outline: 3px solid Highlight;
      outline-offset: -6px;
    }
  }
`;

// A label with a row of dots running to the end of the line, like the grid it sits on
const dottedLabel = css`
  ${label};
  align-items: center;
  color: ${dots.ink};
  display: flex;
  gap: 12px;

  &::after {
    background: radial-gradient(circle, ${dots.pencilDark} 1.2px, transparent 1.7px) left center / 10px 6px repeat-x;
    content: '';
    flex: 1;
    height: 6px;
    min-width: 24px;
  }
`;

const fieldControl = css`
  ${cornerDots('var(--corner-dot)', 9, 2)};
  --corner-dot: #a3acc2;
  background: #ffffff;
  border: 2px solid ${dots.pencil};
  border-radius: 0;
  position: relative;
  transition: border-color 0.2s ease;

  &:focus-within {
    --corner-dot: ${dots.dot};
    border-color: ${dots.blue};
    box-shadow: 0 0 0 4px #2457d621;
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  margin-top: 4px;
`;

export const Alert = styled.div`
  align-items: center;
  background: #fff3f0;
  border: 2px solid #ecaa9c;
  border-radius: 4px;
  color: #872d1e;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 18px 0;
  padding: 12px 16px;
`;

export const AuthButtons = styled(UAuthButtons)`
  margin-top: 20px;

  button {
    border-radius: 6px;
    font-weight: ${fonts.weight.bold};
    height: 46px;
    padding: 0 20px;
  }

  button:first-child,
  button:first-child:hover {
    background: #ffffff;
    border: 2px solid ${dots.ink};
    color: ${dots.ink};
  }

  button:first-child:hover {
    background: ${dots.blueFill};
  }

  button:last-child,
  button:last-child:hover {
    background: ${dots.ultramarine};
    border: 2px solid ${dots.navy};
    box-shadow: 3px 3px 0 ${dots.navy};
    color: #ffffff;
  }

  button:last-child:hover {
    filter: brightness(1.08);
  }
`;

// A small claimed box, for the legend under the demo game
export const BoxMark = styled.span`
  background: ${dots.redFill};
  border: 2px solid ${dots.red};
  display: inline-block;
  flex-shrink: 0;
  height: 14px;
  width: 14px;
`;

// A row of boxes that share their sides, like a strip of the board
export const BoxRow = styled.div<{$columns: number}>`
  display: grid;
  grid-template-columns: repeat(${({$columns}) => $columns}, minmax(0, 1fr));
  isolation: isolate;
  padding: 5px;

  > * + * {
    margin-left: -2px;
  }

  @container dots-panel (max-width: 340px) {
    ${({$columns}) =>
      $columns === 4 &&
      css`
        grid-template-columns: repeat(2, minmax(0, 1fr));

        > *:nth-child(odd) {
          margin-left: 0;
        }

        > *:nth-child(n + 3) {
          margin-top: -2px;
        }
      `}
  }
`;

export const Choice = styled.label`
  ${hiddenInput};
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
`;

export const ChoiceBox = styled.span`
  ${choiceBox};
  align-items: center;
  flex-direction: column;
  gap: 6px;
  justify-content: flex-start;
  padding: 16px 8px 14px;
  text-align: center;

  strong {
    color: ${dots.ink};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
    line-height: 1.3;
  }

  small {
    font-size: 12px;
    line-height: 1.4;
  }

  @container dots-panel (max-width: 400px) {
    padding: 14px 4px 12px;

    small {
      font-size: 11px;
    }
  }
`;

export const Clear = styled.div`
  ${cornerDots(dots.pencilDark, 10, 2)};
  align-items: center;
  background: ${dotGrid('#1738781f', 20)}, ${dots.paper};
  border: 2px dashed ${dots.pencilDark};
  display: flex;
  gap: 18px;
  margin-top: 28px;
  padding: 18px 22px;
  position: relative;
`;

export const ClearBoard = styled.div`
  ${pencilSketch};
  flex-shrink: 0;
  height: 60px;
  width: 60px;
`;

export const ClearCopy = styled.div`
  strong {
    color: ${dots.ink};
    font-size: 16px;
    font-weight: ${fonts.weight.bold};
  }

  p {
    color: ${dots.inkSoft};
    font-size: 14px;
    line-height: 1.6;
    margin: 4px 0 0;
  }
`;

// The number of matches written in a claimed box
export const Count = styled.span`
  ${cornerDots(dots.dot, 7, 2)};
  align-items: center;
  background: ${dots.blueFill};
  border: 2px solid ${dots.blue};
  color: ${dots.ink};
  display: inline-flex;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  height: 26px;
  justify-content: center;
  min-width: 26px;
  padding: 0 6px;
  position: relative;
`;

export const Eyebrow = styled.p<{$side: DotsAndBoxesSide}>`
  ${label};
  color: ${({$side}) => SIDE_INK[$side]};
  margin: 0 0 4px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  ${dottedLabel};
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const GhostButton = styled.button`
  align-items: center;
  background: #ffffff;
  border: 2px solid ${dots.ink};
  border-radius: 6px;
  box-shadow: 2px 2px 0 ${dots.ink};
  color: ${dots.ink};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.bold};
  min-height: 38px;
  padding: 0 14px;

  &:hover {
    background: ${dots.blueFill};
  }

  &:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: 3px;
  }
`;

export const LaunchButton = styled.button`
  ${inkButton};
`;

export const Lead = styled.p`
  color: ${dots.inkSoft};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  max-width: 560px;
`;

export const Legend = styled.legend`
  ${dottedLabel};
  margin-bottom: 6px;
  padding: 0;
  width: 100%;
`;

// A line drawn between two dots, in blue
export const LineMark = styled.span`
  background: ${dots.blue};
  border-radius: 2px;
  display: inline-block;
  flex-shrink: 0;
  height: 4px;
  margin: 0 5px;
  position: relative;
  width: 18px;

  &::before,
  &::after {
    background: ${dots.dot};
    border-radius: 50%;
    content: '';
    height: 7px;
    position: absolute;
    top: -1.5px;
    width: 7px;
  }

  &::before {
    left: -5px;
  }

  &::after {
    right: -5px;
  }
`;

export const MatchAction = styled.span<{$tone: MatchTone}>`
  ${label};
  background: ${({$tone}) => TONES[$tone][2]};
  border: 2px solid ${({$tone}) => TONES[$tone][0]};
  border-radius: 4px;
  color: ${({$tone}) => TONES[$tone][1]};
  font-size: 10px;
  padding: 7px 10px;
  white-space: nowrap;
`;

export const MatchBoard = styled.span`
  background: #ffffff;
  border: 1px solid ${dots.rule};
  border-radius: 4px;
  display: block;
  flex-shrink: 0;
  height: 54px;
  padding: 3px;
  width: 54px;
`;

export const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

// Rows are boxes stacked on each other; the left side is drawn in the colour of the match's state
export const MatchLink = styled(Link)<{$tone: MatchTone}>`
  ${cornerDots('var(--corner-dot)', 9, 2)};
  --corner-dot: #9aa3bb;
  align-items: center;
  background: #fffffff2;
  border: 2px solid ${dots.pencil};
  box-shadow: inset 4px 0 0 ${({$tone}) => TONES[$tone][0]};
  color: ${dots.ink};
  display: grid;
  gap: 16px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 12px 18px 12px 16px;
  position: relative;
  text-decoration: none;

  & + & {
    margin-top: -2px;
  }

  &:hover {
    --corner-dot: ${dots.dot};
    background: #ffffff;
    border-color: ${dots.pencilDark};
    text-decoration: none;
    z-index: 1;
  }

  &:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: 4px;
    z-index: 2;
  }

  @media (max-width: 560px) {
    gap: 6px 14px;
    grid-template-columns: auto minmax(0, 1fr);

    ${MatchAction} {
      grid-column: 2;
      justify-self: start;
    }
  }
`;

export const MatchList = styled.section`
  margin-top: 30px;
`;

export const MatchListHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
`;

export const MatchListTitle = styled.h2`
  color: ${dots.ink};
  font-size: 20px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const MatchMeta = styled.p`
  color: ${dots.inkSoft};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

export const MatchRows = styled.div`
  display: flex;
  flex-direction: column;
  isolation: isolate;
  padding: 5px;
`;

export const MemberSearch = styled(UUserSearchInput)`
  > div:first-child {
    ${dottedLabel};
    margin-bottom: 10px;
  }

  /* The input's wrapper carries the corner dots; the border they sit on belongs to the input inside it */
  > div:nth-child(2) {
    ${cornerDots('var(--corner-dot)', 9, -2)};
    --corner-dot: #a3acc2;
  }

  &:focus-within > div:nth-child(2) {
    --corner-dot: ${dots.dot};
  }

  input {
    background: #ffffff;
    border: 2px solid ${dots.pencil};
    border-radius: 0;
    color: ${dots.ink};
    font-size: 15px;
    height: 48px;
    padding-left: 14px;
  }

  input:focus {
    border-color: ${dots.blue};
    box-shadow: 0 0 0 4px #2457d621;
    outline: none;
  }

  input::placeholder {
    color: #8f98af;
  }
`;

export const Opponent = styled.span<{$side: DotsAndBoxesSide}>`
  overflow-wrap: anywhere;

  &::before {
    background: ${({$side}) => SIDE_INK[$side]};
    border-radius: 2px;
    content: '';
    display: inline-block;
    height: 4px;
    margin-right: 7px;
    vertical-align: middle;
    width: 12px;
  }
`;

export const Opponents = styled.p`
  color: ${dots.ink};
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.4;
  margin: 0;
`;

export const Panel = styled.section`
  ${sheet};
  box-shadow: none;
  container: dots-panel / inline-size;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 28px 28px 30px;
  scroll-margin-top: 24px;

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    padding: 22px 18px 24px;
  }
`;

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
`;

// Two boxes side by side on one sheet, sharing a side; stacked, they share the side between them instead
export const Panels = styled.div`
  box-shadow: 0 30px 50px -40px #17387899;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  isolation: isolate;

  > ${Panel} + ${Panel} {
    margin-left: -2px;
  }

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);

    > ${Panel} + ${Panel} {
      margin-left: 0;
      margin-top: -2px;
    }
  }
`;

export const Rules = styled(URules)`
  ${sheet};
  margin-top: 28px;
  padding: 0;

  summary {
    align-items: center;
    color: ${dots.ink};
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: ${fonts.weight.bold};
    gap: 12px;
    list-style: none;
    padding: 18px 24px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    border: 2px solid ${dots.blue};
    content: '';
    flex-shrink: 0;
    height: 13px;
    transform: rotate(-8deg);
    transition: background-color 0.2s ease;
    width: 13px;
  }

  summary::after {
    border-bottom: 2px solid ${dots.ink};
    border-right: 2px solid ${dots.ink};
    content: '';
    height: 8px;
    margin: -4px 4px 0 auto;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
    width: 8px;
  }

  summary:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: -3px;
  }

  &[open] summary::before {
    background: ${dots.blueFill};
  }

  &[open] summary::after {
    margin-top: 4px;
    transform: rotate(-135deg);
  }

  ol {
    color: ${dots.inkSoft};
    counter-reset: rule;
    font-size: 14px;
    line-height: 1.7;
    list-style: none;
    margin: 0;
    padding: 0 24px 22px;
  }

  li {
    counter-increment: rule;
    padding-left: 42px;
    position: relative;
  }

  li + li {
    margin-top: 12px;
  }

  li::before {
    align-items: center;
    background: #ffffff;
    border: 2px solid ${dots.pencil};
    color: ${dots.ink};
    content: counter(rule);
    display: flex;
    font-size: 12px;
    font-weight: ${fonts.weight.extraBold};
    height: 26px;
    justify-content: center;
    left: 0;
    position: absolute;
    top: -1px;
    width: 26px;
  }

  @media (prefers-reduced-motion: reduce) {
    summary::before,
    summary::after {
      transition: none;
    }
  }
`;

export const Showcase = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  padding: 34px 0 6px;
`;

export const ShowcaseLegend = styled.div`
  color: ${dots.inkSoft};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 10px 22px;
  justify-content: center;

  span {
    align-items: center;
    display: inline-flex;
    gap: 8px;
  }
`;

// A scrap of paper taped to the sheet, with a game playing on it
export const ShowcasePaper = styled.div`
  background: #ffffff;
  border: 1px solid ${dots.rule};
  border-radius: 3px;
  box-shadow: 0 16px 26px -18px #17387873;
  max-width: 300px;
  padding: 16px;
  position: relative;
  transform: rotate(-1.5deg);
  width: 100%;

  &::before {
    background: #bfe5cdd9;
    content: '';
    height: 22px;
    left: 50%;
    position: absolute;
    top: -11px;
    transform: translateX(-50%) rotate(3deg);
    width: 86px;
  }
`;

export const SketchFrame = styled.span`
  display: block;
  height: 50px;
  width: 50px;
`;

export const StakeControl = styled.span`
  ${fieldControl};
  align-items: stretch;
  display: flex;
`;

export const StakeInput = styled.input`
  background: transparent;
  border: 0;
  color: ${dots.ink};
  flex: 1;
  font-family: inherit;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  height: 48px;
  min-width: 0;
  outline: none;
  padding: 0 14px;
`;

export const StakeUnit = styled.span`
  ${label};
  align-items: center;
  border-left: 2px solid ${dots.pencil};
  color: ${dots.inkSoft};
  display: flex;
  padding: 0 16px;
`;

export const Status = styled.div`
  align-items: center;
  background: ${dots.paper};
  border: 2px dashed ${dots.pencil};
  border-radius: 4px;
  color: ${dots.inkSoft};
  display: flex;
  font-size: 14px;
  gap: 14px;
  margin: 24px 0;
  padding: 16px 20px;
`;

export const Terms = styled.p`
  align-items: baseline;
  background: #ffffffcc;
  border: 2px dashed ${dots.pencil};
  color: ${dots.inkSoft};
  display: flex;
  font-size: 13px;
  gap: 10px;
  line-height: 1.65;
  margin: 0;
  padding: 12px 14px;

  ${LineMark} {
    flex-shrink: 0;
    margin-top: 2px;
    top: -2px;
  }
`;

export const TimeBox = styled.span`
  ${choiceBox};
  align-items: center;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  justify-content: center;
  min-height: 48px;
  padding: 8px 4px;
  white-space: nowrap;
`;

export const Title = styled.h2`
  color: ${dots.ink};
  font-size: 25px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const Versus = styled.span`
  color: ${dots.inkSoft};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;
