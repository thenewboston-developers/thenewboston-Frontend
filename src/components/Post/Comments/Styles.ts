import styled from 'styled-components';

import {InlineInput as UInlineInput} from 'components/FormElements';
import {Label as MentionTextareaLabel} from 'components/MentionTextarea/Styles';
import {breakpoints, colors, fonts, radii, shadows} from 'styles';

export const IMG_SIZE = '20px';

const CONTROL_HEIGHT = '40px';

// Wrapping lets the controls drop below the field whenever the card is too narrow for a single row
export const CommentForm = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Container = styled.div`
  margin-top: 12px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 16px 16px;
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 16px 0 4px;
`;

export const ControlsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  margin-left: auto;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: flex-end;
    width: 100%;
  }
`;

export const Divider = styled.div`
  border: 0;
  border-top: 1px solid ${colors.borderSubtle};
  flex: 1;
  margin: 0 16px;
`;

// The radius follows the inner curve of PriceAmountInputContainer (its radius minus its border). That container clips
// its overflow, so the focus ring is inset and needs the matching corners to not be cut off.
export const IconContainer = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: calc(${radii.medium} - 1px) 0 0 calc(${radii.medium} - 1px);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0 10px;
  transition: background 0.15s ease;

  &:focus-visible {
    background: ${colors.palette.gray[200]};
    box-shadow: inset ${shadows.focusRing};
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.palette.gray[200]};
    }
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  height: ${IMG_SIZE};
  object-fit: cover;
  width: ${IMG_SIZE};
`;

export const MentionTextareaWrapper = styled.div`
  flex: 1;
  min-width: min(240px, 100%);
  width: 100%;

  /* The composer has no label, so the empty label row would only push the field out of line with the controls */
  ${MentionTextareaLabel} {
    display: none;
  }

  /* Style the MentionTextarea to look like an inline input */
  textarea {
    background: ${colors.palette.gray[50]};
    border: 1px solid ${colors.borderSubtle};
    border-radius: ${radii.medium};
    color: ${colors.primary};
    font-size: 14px;
    height: ${CONTROL_HEIGHT};
    line-height: 20px;
    max-height: 120px;
    min-height: ${CONTROL_HEIGHT};
    outline: none;
    padding: 9px 14px;
    transition:
      background 0.15s ease,
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &::placeholder {
      color: ${colors.secondary};
      opacity: 1;
    }

    &:focus {
      background: ${colors.white};
      border-color: ${colors.palette.blue[300]};
      box-shadow: ${shadows.focusRing};
    }
  }
`;

export const PriceAmountInput = styled(UInlineInput)`
  background: transparent;
  border: none;
  border-left: 1px solid ${colors.borderSubtle};
  border-radius: 0;
  color: ${colors.primary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  height: 100%;
  outline: none;
  padding: 8px 12px;
  width: 96px;

  &::placeholder {
    color: ${colors.secondary};
    opacity: 1;
  }
`;

export const PriceAmountInputContainer = styled.div`
  align-items: center;
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  display: grid;
  grid-auto-flow: column;
  height: ${CONTROL_HEIGHT};
  overflow: hidden;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: ${colors.palette.blue[300]};
    box-shadow: ${shadows.focusRing};
  }

  /* The currency button draws its own ring, so a ring around the whole field would wrongly point at the amount input */
  &:has(${IconContainer}:focus-visible) {
    border-color: ${colors.borderSubtle};
    box-shadow: none;
  }
`;

// A local button (instead of the shared Button) because the icon-only control needs an accessible name
export const SendButton = styled.button`
  align-items: center;
  background: ${colors.buttonDark};
  border: none;
  border-radius: 50%;
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${CONTROL_HEIGHT};
  justify-content: center;
  padding: 0;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  width: ${CONTROL_HEIGHT};

  &:disabled {
    background: ${colors.buttonDarkDisabledBackground};
    color: ${colors.buttonDarkDisabledText};
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${colors.buttonDarkHover};
    }
  }
`;

export const TipCurrencyButton = styled.button`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  color: ${colors.secondary};
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  height: ${CONTROL_HEIGHT};
  padding: 0 14px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.whiteHover};
      border-color: ${colors.borderDarker};
      color: ${colors.primary};
    }
  }
`;
