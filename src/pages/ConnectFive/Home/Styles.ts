import UIcon from '@mdi/react';
import {Field as FormikField} from 'formik';
import styled, {css} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import UPagination from 'components/Pagination';
import {Description as UserLabelDescription, Username as UserLabelUsername} from 'components/UserLabel/Styles';
import UUserSearchInput from 'components/UserSearchInput';
import {
  ClearButton as UserSearchClearButton,
  Dropdown as UserSearchDropdown,
  DropdownItem as UserSearchDropdownItem,
  ErrorMessage as UserSearchErrorMessage,
  Input as UserSearchElement,
  Label as UserSearchLabel,
  NoResultsMessage as UserSearchNoResultsMessage,
} from 'components/UserSearchInput/Styles';
import {breakpoints, fonts, pagePadding} from 'styles';

import {Stone} from '../Stones';
import {
  boardPanel,
  classic,
  eyebrow,
  fieldControl,
  fieldLabel,
  ghostButton,
  goldButton,
  paginationStyle,
} from '../theme';

export type BadgeTone = 'gold' | 'active' | 'positive' | 'muted' | 'negative';

const BADGE_TONES: Record<BadgeTone, {background: string; color: string}> = {
  gold: {background: classic.accentSoft, color: classic.accent},
  active: {background: classic.focusSoft, color: classic.text},
  positive: {background: classic.positiveSoft, color: classic.positive},
  muted: {background: 'rgba(255, 255, 255, 0.06)', color: classic.textMuted},
  negative: {background: classic.negativeSoft, color: classic.negative},
};

// Named containers: the lobby lays out by the width it really has, which the app's side navigation changes
const COMPUTER_FORM = 'connect-five-computer';
const LOBBY = 'connect-five-lobby';

const cardTile = css`
  background: linear-gradient(180deg, rgba(48, 38, 31, 0.55), rgba(23, 18, 15, 0.75));
  border: 1px solid ${classic.border};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  padding: 18px;
`;

// An input that is visually replaced by the card or segment right after it, while it keeps the focus and the keyboard
const hiddenRadio = css`
  input {
    height: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    width: 1px;
  }
`;

const panelPadding = css`
  padding: 28px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 20px;
  }
`;

export const AmountControl = styled.div`
  position: relative;
`;

export const AmountInput = styled(FormikField)<{$hasError: boolean}>`
  ${fieldControl};
  appearance: textfield;
  font-variant-numeric: tabular-nums;
  padding-right: 56px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  ${({$hasError}) =>
    $hasError &&
    css`
      border-color: ${classic.negative};

      &:hover {
        border-color: ${classic.negative};
      }

      &:focus {
        border-color: ${classic.negative};
        box-shadow: 0 0 0 3px rgba(255, 179, 176, 0.25);
      }
    `}
`;

export const AmountUnit = styled.span`
  color: ${classic.accent};
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.08em;
  pointer-events: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

// The shared buttons, recolored: signing in is the quiet option and creating an account gets the gold of the line
export const AuthButtons = styled(UAuthButtons)`
  button {
    border-radius: 999px;
    font-weight: ${fonts.weight.bold};
    height: 44px;
    padding: 0 22px;
  }

  button:first-child {
    background: transparent;
    border-color: ${classic.borderStrong};
    color: ${classic.text};
  }

  button:first-child:hover {
    background: ${classic.focusSoft};
    border-color: ${classic.focus};
  }

  button:last-child {
    background: linear-gradient(180deg, #ffe6ad, #f7c96c);
    border-color: #fff0cc;
    color: ${classic.accentInk};
  }

  button:last-child:hover {
    background: linear-gradient(180deg, #ffe6ad, #f7c96c);
    filter: brightness(1.05);
  }

  button:focus-visible {
    outline: 2px solid ${classic.accent};
    outline-offset: 3px;
  }
`;

// A gold ring around the avatar, with a gap of the panel's night between the two
export const AvatarRing = styled.span`
  background: conic-gradient(from 210deg, #ffd990, #f0a948, #ffe9b8, #ffd990);
  border-radius: 50%;
  box-shadow: 0 0 28px rgba(255, 200, 96, 0.22);
  display: flex;
  flex-shrink: 0;
  padding: 3px;

  > div {
    background: ${classic.surface};
    border-radius: 50%;
    padding: 3px;
  }
`;

export const Badge = styled.span<{$tone: BadgeTone}>`
  background: ${({$tone}) => BADGE_TONES[$tone].background};
  border-radius: 999px;
  color: ${({$tone}) => BADGE_TONES[$tone].color};
  flex-shrink: 0;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.02em;
  line-height: 1.5;
  padding: 2px 10px;
  white-space: nowrap;
`;

// Pinned to the bottom so the actions of the cards that share a row line up
export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: auto;
`;

export const CardArrow = styled(UIcon)`
  color: ${classic.textMuted};
  flex-shrink: 0;
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
`;

export const CardHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
`;

export const CardMeta = styled.span`
  color: ${classic.textMuted};
  display: block;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 2px;
`;

export const CardPlayer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 0;
`;

export const CardPlayerName = styled.strong`
  color: ${classic.text};
  display: block;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardPlayerText = styled.div`
  min-width: 0;
`;

export const ChallengeCard = styled.div`
  ${cardTile};
`;

// The chart fills the body through absolute positioning, which keeps its percentage height definite even when the
// panel has no fixed height (single column layout). The only child is the container div that recharts renders.
export const ChartBody = styled.div`
  flex: 1;
  font-variant-numeric: tabular-nums;
  min-height: 240px;
  min-width: 0;
  position: relative;

  > div {
    inset: 0;
    position: absolute;
  }
`;

export const ChartState = styled.div`
  align-items: center;
  border: 1px dashed rgba(237, 197, 139, 0.22);
  border-radius: 16px;
  color: ${classic.textSecondary};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 15px;
  gap: 10px;
  justify-content: center;
  min-height: 240px;
  padding: 24px;
  text-align: center;

  small {
    color: ${classic.textMuted};
    font-size: 13px;
    max-width: 320px;
  }
`;

export const Choice = styled.label`
  ${hiddenRadio};
  cursor: pointer;
  display: block;
  min-width: 0;
  position: relative;
`;

// Next to each other the cards stack their stones above the level; alone in a narrow panel they put the stones first
export const ChoiceCard = styled.span`
  align-items: center;
  background: rgba(23, 18, 15, 0.6);
  border: 1px solid ${classic.border};
  border-radius: 16px;
  column-gap: 14px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  height: 100%;
  padding: 14px 16px;
  row-gap: 4px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  > span {
    grid-row: span 2;
  }

  strong {
    color: ${classic.text};
    font-size: 15px;
    font-weight: ${fonts.weight.bold};
    line-height: 1.3;
  }

  small {
    color: ${classic.textMuted};
    font-size: 12.5px;
    line-height: 1.4;
  }

  @container ${COMPUTER_FORM} (min-width: 420px) {
    align-content: start;
    align-items: start;
    grid-template-columns: minmax(0, 1fr);

    > span {
      grid-row: auto;
      justify-self: start;
      margin: 4px 4px 8px;
    }
  }

  &:hover {
    border-color: ${classic.borderStrong};
  }

  input:checked + & {
    background: linear-gradient(180deg, rgba(237, 197, 139, 0.16), rgba(237, 197, 139, 0.06));
    border-color: ${classic.focus};
    box-shadow: 0 0 24px rgba(237, 197, 139, 0.18);
  }

  input:focus-visible + & {
    outline: 2px solid ${classic.focus};
    outline-offset: 3px;
  }
`;

export const ChoiceGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 1fr);

  @container ${COMPUTER_FORM} (min-width: 420px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const ComputerForm = styled.form`
  container: ${COMPUTER_FORM} / inline-size;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  container: ${LOBBY} / inline-size;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 20px;
  }
`;

export const Count = styled.span`
  background: ${classic.accentSoft};
  border: 1px solid rgba(237, 197, 139, 0.25);
  border-radius: 999px;
  color: ${classic.accent};
  flex-shrink: 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  line-height: 1.5;
  padding: 2px 10px;
`;

// Above the sections that follow, so the member search results can open over them
export const Deck = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr);
  position: relative;
  z-index: 1;

  @container ${LOBBY} (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 20px;
  }
`;

export const DetailLabel = styled.span`
  color: ${classic.muted};
  flex-shrink: 0;
  font-size: 10.5px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const DetailRow = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  min-height: 22px;
  width: 100%;
`;

export const DetailValue = styled.span`
  color: ${classic.text};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: right;
`;

export const Details = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(237, 197, 139, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 14px;
  width: 100%;
`;

export const EloArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 300px;
  min-width: 0;
`;

export const EloHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const EmptyState = styled.div`
  align-items: center;
  background: rgba(23, 18, 15, 0.45);
  border: 1px dashed rgba(237, 197, 139, 0.22);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  min-height: 190px;
  padding: 32px 24px;
  text-align: center;

  @media (max-width: ${breakpoints.mini}) {
    padding: 24px 16px;
  }
`;

export const EmptyText = styled.p`
  color: ${classic.textMuted};
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  max-width: 460px;
`;

export const EmptyTitle = styled.h3`
  color: ${classic.text};
  font-size: 20px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 4px 0 0;
`;

export const Eyebrow = styled.p`
  ${eyebrow};
  margin: 0 0 4px;
`;

export const Field = styled.div`
  min-width: 0;
`;

export const FieldError = styled.p`
  color: ${classic.negative};
  font-size: 12px;
  line-height: 1.4;
  margin: 6px 0 0;
`;

export const FieldLabel = styled.label`
  ${fieldLabel};
`;

export const FieldRow = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 18px;
`;

export const GhostButton = styled.button`
  ${ghostButton};
`;

// Fills the bottom of the visitor's panel, which shares its row with the taller computer panel
export const GuestArt = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 8px;
`;

export const Kit = styled.div`
  background: rgba(23, 18, 15, 0.35);
  border: 1px dashed rgba(237, 197, 139, 0.22);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
`;

export const KitItem = styled.li`
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${classic.border};
  border-radius: 999px;
  color: ${classic.textSecondary};
  display: inline-flex;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  line-height: 1.4;
  padding: 6px 12px 6px 10px;
`;

export const KitList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const KitNote = styled.p`
  color: ${classic.textMuted};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

export const KitTitle = styled.p`
  ${fieldLabel};
  margin: 0;
`;

export const Lead = styled.p`
  color: ${classic.textSecondary};
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
`;

export const Legend = styled.legend`
  ${fieldLabel};
  padding: 0;
`;

export const ListDescription = styled.p`
  color: ${classic.textMuted};
  font-size: 14px;
  line-height: 1.5;
  margin: 2px 0 0;
`;

export const ListHeader = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
`;

export const ListHeading = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ListPanel = styled.section`
  ${boardPanel};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 18px;
  }
`;

export const ListTitle = styled.h2`
  color: ${classic.text};
  font-size: 20px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0;
`;

export const LoadMoreRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const MatchCard = styled.button`
  ${cardTile};
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  outline: none;
  text-align: left;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  width: 100%;

  @media (hover: hover) {
    &:hover {
      border-color: ${classic.borderStrong};
      box-shadow: 0 12px 28px rgba(23, 18, 15, 0.45);
    }
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  /* Declared after the hover rules so a hovered card keeps its ring */
  &:focus-visible {
    border-color: ${classic.focus};
    box-shadow: 0 0 0 3px rgba(237, 197, 139, 0.3);
  }
`;

// The shared member search, dark like the rest of the panel, with its results opening as a walnut popover
export const MemberSearch = styled(UUserSearchInput)`
  ${UserSearchClearButton} {
    align-items: center;
    border-radius: 50%;
    color: ${classic.textMuted};
    display: flex;
    height: 28px;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 28px;

    &:focus-visible {
      outline: 2px solid ${classic.focus};
    }

    &:hover {
      color: ${classic.text};
    }
  }

  ${UserSearchDropdown} {
    background: #30261f;
    border: 1px solid ${classic.borderStrong};
    border-radius: 14px;
    box-shadow: 0 18px 40px rgba(23, 18, 15, 0.55);
    margin-top: 6px;
    padding: 4px;
  }

  ${UserSearchDropdownItem} {
    border-radius: 10px;
    padding: 8px 12px;
    transition: background 0.15s ease;

    &:hover {
      background: ${classic.surfaceRaised};
    }

    &:not(:last-child) {
      border-bottom: none;
    }
  }

  ${UserSearchElement} {
    ${fieldControl};
    padding-right: 44px;
    text-overflow: ellipsis;
  }

  ${UserSearchErrorMessage} {
    color: ${classic.negative};
    margin-top: 6px;
  }

  ${UserSearchLabel} {
    ${fieldLabel};
  }

  ${UserSearchNoResultsMessage} {
    color: ${classic.textMuted};
  }

  ${UserLabelDescription} {
    color: ${classic.textMuted};
  }

  ${UserLabelUsername} {
    color: ${classic.text};
  }
`;

export const Pagination = styled(UPagination)`
  ${paginationStyle};
  align-self: center;
`;

export const Panel = styled.section`
  ${boardPanel};
  ${panelPadding};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PanelActions = styled.div`
  display: flex;
  margin-top: auto;
  padding-top: 4px;
`;

export const PanelHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  min-width: 0;
`;

export const PanelTitle = styled.h2`
  color: ${classic.text};
  font-size: 24px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin: 0;
  scroll-margin-top: 24px;

  &:focus-visible {
    border-radius: 6px;
    outline: 2px solid ${classic.focus};
    outline-offset: 4px;
  }

  @media (max-width: ${breakpoints.mini}) {
    font-size: 21px;
  }
`;

// The stone tells which color the player places: black for player A, white for player B and the computer
export const PlayerAvatar = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
`;

export const PlayerHeading = styled.div`
  min-width: 0;
`;

export const PlayerIdentity = styled.div`
  align-items: center;
  display: flex;
  gap: 18px;
  min-width: 0;
`;

export const PlayerName = styled.h2`
  color: ${classic.text};
  font-size: 28px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin: 0;
  overflow-wrap: anywhere;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 22px;
  }
`;

export const PlayerPanel = styled.section`
  ${boardPanel};
  ${panelPadding};
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1fr);

  @container ${LOBBY} (min-width: 860px) {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  }
`;

export const PlayerSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
`;

export const PrimaryButton = styled.button`
  ${goldButton};
  width: 100%;
`;

export const RecentForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RecentHeader = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: space-between;
`;

export const RecentLegend = styled.span`
  color: ${classic.textMuted};
  display: inline-flex;
  font-size: 12px;
  gap: 14px;

  span {
    align-items: center;
    display: inline-flex;
    gap: 6px;
  }
`;

export const RecentStone = styled.span`
  display: inline-flex;
  position: relative;
`;

// Five intersections on one board line, filled with the results of the last five games
export const RecentStones = styled.span`
  align-items: center;
  background: rgba(23, 18, 15, 0.5);
  border: 1px solid ${classic.border};
  border-radius: 999px;
  display: flex;
  justify-content: space-between;
  padding: 10px 18px;
  position: relative;

  &::before {
    background: rgba(237, 197, 139, 0.3);
    content: '';
    height: 1px;
    left: 18px;
    position: absolute;
    right: 18px;
  }
`;

export const SectionNote = styled.p`
  color: ${classic.textMuted};
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

export const SectionTitle = styled.h3`
  color: ${classic.text};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.015em;
  line-height: 1.3;
  margin: 0;
`;

export const Segment = styled.label`
  ${hiddenRadio};
  cursor: pointer;
  min-width: 0;
  position: relative;

  span {
    border-radius: 10px;
    color: ${classic.textMuted};
    display: block;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.semiBold};
    padding: 9px 4px;
    text-align: center;
    transition:
      background 0.15s ease,
      color 0.15s ease;
    white-space: nowrap;
  }

  &:hover span {
    color: ${classic.text};
  }

  input:checked + span {
    background: linear-gradient(180deg, rgba(237, 197, 139, 0.24), rgba(237, 197, 139, 0.12));
    box-shadow: inset 0 0 0 1px rgba(237, 197, 139, 0.55);
    color: ${classic.text};
  }

  input:focus-visible + span {
    outline: 2px solid ${classic.focus};
    outline-offset: 2px;
  }
`;

export const Segmented = styled.div`
  background: rgba(23, 18, 15, 0.6);
  border: 1px solid ${classic.border};
  border-radius: 14px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 4px;
`;

export const SideStone = styled(Stone)`
  border: 2px solid ${classic.surface};
  bottom: -2px;
  position: absolute;
  right: -3px;
`;

export const SmallGoldButton = styled.button`
  ${goldButton};
  font-size: 14px;
  min-height: 38px;
  padding: 0 20px;
`;

export const Stat = styled.div`
  background: rgba(23, 18, 15, 0.55);
  border: 1px solid ${classic.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 12px 14px;
`;

// On a phone the record gets a row of its own, it is the longest of the three values
export const StatGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @container ${LOBBY} (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    > :last-child {
      grid-column: 1 / -1;
    }
  }
`;

export const StatLabel = styled.span`
  ${fieldLabel};
  margin: 0;
`;

export const StatValue = styled.strong<{$isGold?: boolean}>`
  color: ${({$isGold}) => ($isGold ? classic.accent : classic.text)};
  font-size: 20px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.02em;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Step = styled.li`
  align-items: flex-start;
  display: flex;
  gap: 14px;
  position: relative;

  /* A board line joins the numbered stones of the steps */
  &:not(:last-child)::before {
    background: rgba(237, 197, 139, 0.3);
    bottom: -18px;
    content: '';
    left: 14.5px;
    position: absolute;
    top: 30px;
    width: 1px;
  }
`;

export const StepStone = styled(Stone)`
  align-items: center;
  color: ${({$tone}) => ($tone === 'obsidian' ? classic.text : classic.accentInk)};
  display: inline-flex;
  font-size: 13px;
  font-weight: ${fonts.weight.extraBold};
  justify-content: center;
`;

export const StepText = styled.p`
  color: ${classic.textMuted};
  font-size: 14px;
  line-height: 1.55;
  margin: 2px 0 0;
`;

export const StepTitle = styled.h3`
  color: ${classic.text};
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.4;
  margin: 4px 0 0;
`;

export const Steps = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 18px;
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
`;

export const Term = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

// Aligned at the bottom, so the values stay on one line even when a label wraps on a narrow card
export const TermGrid = styled.div`
  align-items: end;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(237, 197, 139, 0.1);
  border-radius: 12px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 10px 14px;
`;

export const TermLabel = styled.span`
  color: ${classic.muted};
  font-size: 10.5px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const TermValue = styled.span`
  color: ${classic.text};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  overflow-wrap: anywhere;
`;

// Sits right above the send button: any room the taller computer panel leaves goes above the terms instead
export const Terms = styled.p`
  background: rgba(237, 197, 139, 0.06);
  border-left: 2px solid ${classic.accent};
  border-radius: 0 12px 12px 0;
  color: ${classic.textSecondary};
  font-size: 13px;
  line-height: 1.6;
  margin: auto 0 0;
  padding: 10px 14px;

  & + ${PanelActions} {
    margin-top: 0;
  }
`;

export const Versus = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  min-width: 0;
`;

export const VersusMark = styled.span`
  color: ${classic.muted};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const VersusName = styled.span`
  color: ${classic.text};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const VersusPlayer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0;
`;
