import UIcon from '@mdi/react';
import styled, {css} from 'styled-components';

import {Img as AvatarImg} from 'components/Avatar/Styles';
import UBadge from 'components/Badge';
import UButton from 'components/Button';
import {Input as UInput, Select as USelect} from 'components/FormElements';
import {Container as FormFieldContainer} from 'components/FormElements/FormField/Styles';
import {ErrorMessage as InputErrorMessage, Label as InputLabel} from 'components/FormElements/Input/Styles';
import {
  ErrorMessage as SelectErrorMessage,
  Label as SelectLabel,
  Select as SelectElement,
} from 'components/FormElements/Select/Styles';
import UPagination from 'components/Pagination';
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
import {breakpoints, cardStyle, colors, controlStyle, fonts, pagePadding, radii, shadows} from 'styles';

import {
  detailsBlockStyle,
  detailsLabelStyle,
  detailsRowStyle,
  detailsValueStyle,
  sectionTitleStyle,
  statusBadgeStyle,
} from '../mixins';

interface FieldErrorProps {
  errors: {[field: string]: string};
  name: string;
  touched: {[field: string]: boolean};
}

const CHEVRON_COLOR = encodeURIComponent(colors.secondary);
const CHEVRON_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='${CHEVRON_COLOR}' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`;
const CONTROL_HEIGHT = 44;
// Translucent colors.palette.red[500], the error counterpart of shadows.focusRing
const ERROR_FOCUS_RING = '0 0 0 2px rgb(220 13 22 / 75%)';

const cardListMixin = css`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr));
`;

// components/FormElements is restyled from here, so the fields have to bring back the error state that the shared
// components paint through their own border
const fieldErrorMixin = css<FieldErrorProps>`
  ${({errors, name, touched}) =>
    !!errors[name] &&
    touched[name] &&
    css`
      border-color: ${colors.palette.red[400]};

      &:hover {
        border-color: ${colors.palette.red[400]};
      }

      &:focus {
        border-color: ${colors.palette.red[500]};
        box-shadow: ${ERROR_FOCUS_RING};
      }
    `}
`;

const fieldMixin = css<FieldErrorProps>`
  ${controlStyle};
  ${fieldErrorMixin};
  height: ${`${CONTROL_HEIGHT}px`};
  padding: 0 14px;
`;

const sectionMixin = css`
  ${cardStyle};
  min-width: 0;
  padding: 24px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px;
  }
`;

export const Badge = styled(UBadge)`
  ${statusBadgeStyle};
`;

// Pinned to the bottom so the actions of the cards that share a row line up
export const ChallengeActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: auto;
`;

export const ChallengeCard = styled.div`
  ${cardStyle};
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 20px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px;
  }
`;

export const ChallengeHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
`;

export const ChallengeInfo = styled.div`
  ${detailsBlockStyle};
`;

export const ChallengeInfoLabel = styled.span`
  ${detailsLabelStyle};
`;

export const ChallengeInfoRow = styled.div`
  ${detailsRowStyle};
`;

export const ChallengeInfoValue = styled.span`
  ${detailsValueStyle};
`;

export const ChallengeList = styled.div`
  ${cardListMixin};
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 24px;
  }
`;

export const EloChartBody = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 240px;
  min-width: 0;
  width: 100%;
`;

// The chart fills the wrapper through absolute positioning, which keeps its percentage height definite even when the
// card has no fixed height (single column layout). The only child is the container div that recharts renders.
export const EloChartWrapper = styled.div`
  align-self: stretch;
  font-variant-numeric: tabular-nums;
  min-height: 240px;
  min-width: 0;
  position: relative;
  width: 100%;

  > div {
    inset: 0;
    position: absolute;
  }
`;

export const EloSection = styled.section`
  ${sectionMixin};
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* The gap owns the vertical rhythm, so the shared form fields drop their own bottom margin */
  ${FormFieldContainer} {
    margin-bottom: 0;
  }

  ${InputErrorMessage},
  ${SelectErrorMessage},
  ${UserSearchErrorMessage} {
    color: ${colors.palette.red[700]};
    font-size: 12px;
    line-height: 1.4;
    margin-top: 6px;
  }

  ${InputLabel},
  ${SelectLabel},
  ${UserSearchLabel} {
    color: ${colors.secondary};
    font-size: 13px;
    font-weight: ${fonts.weight.medium};
    line-height: 1.4;
    margin-bottom: 6px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

// The shared Input hands its className to the field itself
export const Input = styled(UInput)`
  ${fieldMixin};
  font-variant-numeric: tabular-nums;
`;

export const LoadMoreRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

export const MatchCard = styled.button`
  ${cardStyle};
  align-items: stretch;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  gap: 16px;
  min-width: 0;
  outline: none;
  padding: 20px;
  text-align: left;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  width: 100%;

  @media (hover: hover) {
    &:hover {
      border-color: ${colors.borderDarker};
      box-shadow: ${shadows.cardHover};
    }
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px;
  }

  /* Declared after the hover rules so a hovered card keeps its ring. The border shares the color of shadows.focusRing,
     so the border and the ring read as a single outline */
  &:focus-visible {
    border-color: ${colors.palette.blue[500]};
    box-shadow: ${shadows.card}, ${shadows.focusRing};
  }
`;

export const MatchHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
`;

export const MatchHeaderMain = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const MatchIcon = styled(UIcon)`
  color: ${colors.secondary};
  flex-shrink: 0;
`;

export const MatchInfo = styled.div`
  ${detailsBlockStyle};
`;

export const MatchInfoLabel = styled.span`
  ${detailsLabelStyle};
`;

export const MatchInfoRow = styled.div`
  ${detailsRowStyle};
`;

export const MatchInfoValue = styled.span`
  ${detailsValueStyle};
`;

export const MatchList = styled.div`
  ${cardListMixin};
`;

export const MatchesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const MatchesSectionTitle = styled.h2`
  ${sectionTitleStyle};
`;

export const Pagination = styled(UPagination)`
  align-self: center;
  margin-top: 8px;
`;

// The white ring mirrors the logo of the currency detail header
export const ProfileAvatarWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mini}) {
    ${AvatarImg} {
      height: 72px;
      width: 72px;
    }
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const ProfileHeader = styled.div`
  min-width: 0;
`;

export const ProfileHeaderContent = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  min-width: 0;

  @media (max-width: ${breakpoints.mini}) {
    gap: 16px;
  }
`;

export const ProfileMeta = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ProfileMetaItem = styled.span`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.pill};
  color: ${colors.secondary};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.04em;
  line-height: 1.5;
  padding: 3px 12px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const ProfileUsername = styled.h1`
  color: ${colors.primary};
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 0;
  overflow-wrap: anywhere;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 22px;
  }
`;

export const PublicMatchMeta = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.4;
`;

export const PublicMatchPlayer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0;
`;

export const PublicMatchPlayerName = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PublicMatchPlayers = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  min-width: 0;
`;

export const PublicMatchVersus = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const Section = styled.section`
  ${sectionMixin};
`;

export const SectionTitle = styled.h2`
  ${sectionTitleStyle};
  margin-bottom: 16px;
`;

// The shared Select hands its className to both its wrapper and the select element, so the rules are scoped to the
// element through the wrapper
export const Select = styled(USelect)`
  ${SelectElement} {
    ${fieldMixin};
    appearance: none;
    background-image: ${CHEVRON_ICON};
    background-position: right 14px center;
    background-repeat: no-repeat;
    cursor: pointer;
    padding-right: 40px;
    text-overflow: ellipsis;
  }
`;

export const SubmitButton = styled(UButton)`
  border-radius: ${radii.pill};
  height: ${`${CONTROL_HEIGHT}px`};
  width: 100%;

  &:disabled,
  &:disabled:hover {
    background: ${colors.palette.gray[200]};
    color: ${colors.palette.gray[600]};
  }
`;

export const SubmitRow = styled.div`
  display: flex;
  margin-top: 4px;
`;

export const TopRow = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints.tablet}) {
    align-items: stretch;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 16px;
  }
`;

// The results open as a popover that matches the shared drop menus
export const UserSearchInput = styled(UUserSearchInput)`
  ${UserSearchClearButton} {
    align-items: center;
    border-radius: 50%;
    color: ${colors.secondary};
    display: flex;
    height: 28px;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 28px;

    &:focus-visible {
      box-shadow: ${shadows.focusRing};
      outline: none;
    }

    &:hover {
      color: ${colors.primary};
    }
  }

  ${UserSearchDropdown} {
    border: 1px solid ${colors.borderSubtle};
    border-radius: ${radii.medium};
    box-shadow: ${shadows.popover};
    margin-top: 6px;
    padding: 4px;
  }

  ${UserSearchDropdownItem} {
    border-radius: ${radii.small};
    padding: 8px 12px;
    transition: background 0.15s ease;

    &:hover {
      background: ${colors.whiteHover};
    }

    &:not(:last-child) {
      border-bottom: none;
    }
  }

  ${UserSearchElement} {
    ${fieldMixin};
    padding-right: 44px;
    text-overflow: ellipsis;
  }

  ${UserSearchNoResultsMessage} {
    color: ${colors.secondary};
  }
`;
