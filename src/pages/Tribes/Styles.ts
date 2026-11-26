import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {breakpoints, pagePadding} from 'styles';

import {easing, fadeIn, fadeUp, fonts, palette, pop, pulse, shadows, stagger, stripes} from './theme';

export type Tone = 'dark' | 'ember' | 'gold' | 'green' | 'neutral' | 'sky';

const TONES: Record<Tone, {background: string; border: string; color: string}> = {
  dark: {background: palette.pine, border: 'rgba(255, 255, 255, 0.12)', color: palette.goldBright},
  ember: {background: palette.emberWash, border: '#f3cdc2', color: palette.emberDeep},
  gold: {background: palette.goldWash, border: '#efdcae', color: palette.goldDeep},
  green: {background: '#e8f2e6', border: '#cfe2cb', color: '#2a6248'},
  neutral: {background: '#f1ede2', border: palette.line, color: palette.muted},
  sky: {background: palette.skyWash, border: '#c7e0ee', color: '#24678c'},
};

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23647069' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

const controlStyle = css`
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: 10px;
  color: ${palette.text};
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  min-height: 42px;
  min-width: 0;
  outline: none;
  padding: 9px 12px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  &::placeholder {
    color: ${palette.faint};
    font-weight: 400;
  }

  &:hover:enabled {
    border-color: #cfc6ae;
  }

  &:focus-visible {
    border-color: ${palette.gold};
    box-shadow: ${shadows.focus};
  }

  &:disabled {
    background: #f6f3ea;
    color: ${palette.faint};
    cursor: not-allowed;
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Avatar = styled.span<{$color?: string; $size?: number}>`
  align-items: center;
  background: ${({$color}) => $color || palette.moss};
  border: 2px solid ${palette.white};
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(28, 43, 37, 0.18);
  color: ${palette.white};
  display: inline-flex;
  flex-shrink: 0;
  font-size: ${({$size = 30}) => Math.round($size * 0.42)}px;
  font-weight: 700;
  height: ${({$size = 30}) => $size}px;
  justify-content: center;
  overflow: hidden;
  text-transform: uppercase;
  width: ${({$size = 30}) => $size}px;

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const Badge = styled.span<{$tone?: Tone}>`
  align-items: center;
  background: ${({$tone = 'green'}) => TONES[$tone].background};
  border: 1px solid ${({$tone = 'green'}) => TONES[$tone].border};
  border-radius: 999px;
  color: ${({$tone = 'green'}) => TONES[$tone].color};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  gap: 5px;
  letter-spacing: 0.04em;
  line-height: 1;
  padding: 6px 10px;
  white-space: nowrap;
`;

export const Banner = styled.div<{$tone?: Tone}>`
  align-items: flex-start;
  animation: ${fadeUp} 0.4s ${easing.out} both;
  background: ${({$tone = 'gold'}) => TONES[$tone].background};
  border: 1px solid ${({$tone = 'gold'}) => TONES[$tone].border};
  border-radius: 14px;
  color: ${({$tone = 'gold'}) => ($tone === 'dark' ? '#d7e6dc' : palette.text)};
  display: flex;
  font-size: 13.5px;
  gap: 12px;
  line-height: 1.6;
  padding: 14px 16px;

  > svg {
    color: ${({$tone = 'gold'}) => TONES[$tone].color};
    flex-shrink: 0;
    margin-top: 2px;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Button = styled.button<{
  $block?: boolean;
  $secondary?: boolean;
  $size?: 'large' | 'small';
  $variant?: 'accent' | 'danger' | 'ghost';
}>`
  align-items: center;
  background: linear-gradient(180deg, #1f5446 0%, ${palette.forest} 100%);
  border: 1px solid ${palette.forest};
  border-radius: 10px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 1px 2px rgba(13, 31, 26, 0.25);
  color: ${palette.white};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 13.5px;
  font-weight: 650;
  gap: 8px;
  justify-content: center;
  letter-spacing: 0.005em;
  line-height: 1.2;
  min-height: 40px;
  padding: 9px 16px;
  position: relative;
  text-decoration: none;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease,
    transform 0.12s ease;
  width: ${({$block}) => ($block ? '100%' : 'auto')};

  ${({$secondary}) =>
    $secondary &&
    css`
      background: ${palette.white};
      border-color: ${palette.line};
      box-shadow: 0 1px 2px rgba(28, 43, 37, 0.06);
      color: ${palette.text};
    `}

  ${({$variant}) =>
    $variant === 'accent' &&
    css`
      background: linear-gradient(180deg, ${palette.goldBright} 0%, ${palette.gold} 100%);
      border-color: #c98f25;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        0 6px 18px -6px rgba(230, 170, 60, 0.7);
      color: #2b1e05;
    `}

  ${({$variant}) =>
    $variant === 'danger' &&
    css`
      background: ${palette.white};
      border-color: #f0cabf;
      box-shadow: 0 1px 2px rgba(28, 43, 37, 0.06);
      color: ${palette.emberDeep};
    `}

  ${({$variant}) =>
    $variant === 'ghost' &&
    css`
      background: transparent;
      border-color: transparent;
      box-shadow: none;
      color: ${palette.moss};
    `}

  ${({$size}) =>
    $size === 'small' &&
    css`
      border-radius: 8px;
      font-size: 12.5px;
      min-height: 32px;
      padding: 6px 11px;
    `}

  ${({$size}) =>
    $size === 'large' &&
    css`
      border-radius: 12px;
      font-size: 15px;
      min-height: 48px;
      padding: 12px 22px;
    `}

  &:hover:enabled,
  a&:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:active:enabled {
    transform: translateY(0) scale(0.985);
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.4);
    opacity: 0.5;
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Card = styled.section<{$accent?: string; $dark?: boolean; $flush?: boolean}>`
  ${stagger};
  background: ${({$dark}) =>
    $dark ? `linear-gradient(160deg, ${palette.forest} 0%, ${palette.ink} 100%)` : palette.white};
  border: 1px solid ${({$dark}) => ($dark ? 'rgba(255, 255, 255, 0.08)' : palette.line)};
  border-radius: 18px;
  box-shadow: ${shadows.card};
  color: ${({$dark}) => ($dark ? '#dbe8df' : palette.text)};
  min-width: 0;
  overflow: hidden;
  padding: ${({$flush}) => ($flush ? 0 : '22px')};
  position: relative;

  ${({$accent}) =>
    $accent &&
    css`
      &::before {
        background: ${$accent};
        content: '';
        height: 4px;
        inset: 0 0 auto;
        position: absolute;
      }
    `}

  h2 {
    color: ${({$dark}) => ($dark ? palette.white : palette.text)};
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin: 0 0 6px;
  }

  h3 {
    color: ${({$dark}) => ($dark ? palette.white : palette.text)};
    font-size: 14px;
    font-weight: 650;
    letter-spacing: -0.005em;
    margin: 0 0 8px;
  }

  @media (max-width: ${breakpoints.mini}) {
    border-radius: 16px;
    padding: ${({$flush}) => ($flush ? 0 : '18px 16px')};
  }
`;

export const Cards = styled.div<{$min?: number}>`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(${({$min = 290}) => $min}px, 100%), 1fr));
`;

export const Choice = styled.label<{$block?: boolean}>`
  cursor: pointer;
  display: ${({$block}) => ($block ? 'block' : 'inline-block')};
  min-width: 0;
  position: relative;

  input {
    cursor: pointer;
    height: 100%;
    inset: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  input:disabled {
    cursor: not-allowed;
  }

  input:checked + span {
    background: #f2f8ef;
    border-color: ${palette.moss};
    box-shadow: 0 0 0 1px ${palette.moss};
    color: ${palette.text};
  }

  input:focus-visible + span {
    box-shadow: ${shadows.focus};
  }

  input:disabled + span {
    opacity: 0.5;
  }

  &:hover input:enabled:not(:checked) + span {
    border-color: #cfc6ae;
    transform: translateY(-1px);
  }
`;

export const ChoiceBody = styled.span<{$column?: boolean}>`
  align-items: center;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: 12px;
  color: ${palette.muted};
  display: flex;
  flex-direction: ${({$column}) => ($column ? 'column' : 'row')};
  font-size: 13px;
  font-weight: 600;
  gap: ${({$column}) => ($column ? '6px' : '8px')};
  height: 100%;
  line-height: 1.25;
  min-height: 42px;
  padding: ${({$column}) => ($column ? '10px 8px' : '8px 12px')};
  text-align: ${({$column}) => ($column ? 'center' : 'left')};
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  small {
    color: ${palette.faint};
    display: block;
    font-size: 11px;
    font-weight: 500;
    margin-top: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Choices = styled.div<{$min?: number}>`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(min(${({$min = 120}) => $min}px, 100%), 1fr));
`;

export const Compass = styled.span`
  animation: ${pulse} 1.8s ease-in-out infinite;
  display: inline-flex;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  background:
    radial-gradient(1200px 500px at 85% -5%, rgba(230, 170, 60, 0.1), transparent 60%),
    radial-gradient(900px 500px at -5% 20%, rgba(79, 154, 109, 0.1), transparent 60%), ${palette.sand};
  color: ${palette.text};
  font-family: ${fonts.ui};
  min-height: 100%;
  padding-top: 20px;

  .sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 12px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
  max-width: 1320px;
`;

export const Countdown = styled.div`
  display: flex;
  gap: 8px;
`;

export const CountdownLabel = styled.span`
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const CountdownUnit = styled.div`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(13, 31, 26, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 68px;
  padding: 10px 10px 8px;

  @media (max-width: ${breakpoints.mini}) {
    min-width: 58px;
    padding: 8px 6px 7px;
  }
`;

export const CountdownValue = styled.span`
  color: ${palette.white};
  display: block;
  font-family: ${fonts.ui};
  font-feature-settings: 'tnum';
  font-size: 30px;
  font-weight: 700;
  height: 34px;
  letter-spacing: -0.03em;
  line-height: 34px;
  overflow: hidden;

  > span {
    animation: ${fadeUp} 0.35s ${easing.out} both;
    display: block;
  }

  @media (max-width: ${breakpoints.mini}) {
    font-size: 25px;
  }

  @media (prefers-reduced-motion: reduce) {
    > span {
      animation: none;
    }
  }
`;

export const Emblem = styled.span<{$size: number}>`
  align-items: center;
  display: inline-flex;
  filter: drop-shadow(0 2px 3px rgba(13, 31, 26, 0.28));
  flex-shrink: 0;
  height: ${({$size}) => ($size * 54) / 48}px;
  justify-content: center;
  position: relative;
  width: ${({$size}) => $size}px;

  svg {
    inset: 0;
    position: absolute;
  }

  span {
    font-weight: 800;
    line-height: 1;
    margin-top: -6%;
    max-width: 86%;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
  }
`;

export const EmblemImage = styled.span<{$color: string; $size: number}>`
  align-items: center;
  display: inline-flex;
  filter: drop-shadow(0 2px 3px rgba(13, 31, 26, 0.28));
  flex-shrink: 0;
  height: ${({$size}) => ($size * 54) / 48}px;
  justify-content: center;
  width: ${({$size}) => $size}px;

  img {
    background: ${palette.white};
    border: ${({$size}) => Math.max(2, Math.round($size / 16))}px solid ${({$color}) => $color};
    border-radius: 22%;
    box-sizing: border-box;
    display: block;
    height: ${({$size}) => $size}px;
    object-fit: cover;
    width: ${({$size}) => $size}px;
  }
`;

export const EmblemPicker = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Empty = styled.div<{$dark?: boolean}>`
  align-items: center;
  background: ${({$dark}) => ($dark ? 'rgba(255, 255, 255, 0.04)' : '#faf7ee')};
  border: 1px dashed ${({$dark}) => ($dark ? 'rgba(255, 255, 255, 0.18)' : '#dcd3bb')};
  border-radius: 14px;
  color: ${({$dark}) => ($dark ? '#b8cbbf' : palette.muted)};
  display: flex;
  flex-direction: column;
  font-size: 13.5px;
  gap: 10px;
  line-height: 1.6;
  margin: 10px 0;
  padding: 26px 20px;
  text-align: center;

  > svg {
    opacity: 0.9;
  }

  strong {
    color: ${({$dark}) => ($dark ? palette.white : palette.text)};
    display: block;
    font-size: 14.5px;
  }
`;

export const Error = styled.div`
  align-items: center;
  animation: ${fadeUp} 0.3s ${easing.out} both;
  background: ${palette.emberWash};
  border: 1px solid #f0cabf;
  border-radius: 14px;
  color: ${palette.emberDeep};
  display: flex;
  flex-wrap: wrap;
  font-size: 13.5px;
  font-weight: 500;
  gap: 10px;
  line-height: 1.6;
  padding: 12px 16px;

  > span {
    flex: 1;
    min-width: 200px;
  }
`;

export const Eyebrow = styled.p<{$light?: boolean}>`
  align-items: center;
  color: ${({$light}) => ($light ? palette.goldBright : palette.goldDeep)};
  display: flex;
  font-size: 11px;
  font-weight: 750;
  gap: 6px;
  letter-spacing: 0.12em;
  margin: 0 0 8px;
  text-transform: uppercase;
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 420px;
  overflow-y: auto;
  padding-right: 4px;
`;

export const FeedItem = styled.article`
  align-items: flex-start;
  border-bottom: 1px solid ${palette.lineSoft};
  display: flex;
  font-size: 13.5px;
  gap: 11px;
  line-height: 1.55;
  padding: 11px 0;

  &:last-child {
    border-bottom: 0;
  }

  > div {
    min-width: 0;
  }

  p {
    color: ${palette.muted};
    margin: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  strong {
    color: ${palette.text};
  }

  small {
    color: ${palette.faint};
    display: block;
    font-size: 11.5px;
    margin-top: 2px;
  }
`;

export const Field = styled.label`
  color: ${palette.muted};
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 650;
  gap: 6px;
  letter-spacing: 0.01em;
  min-width: 0;

  input:not([type='color']):not([type='radio']):not([type='checkbox']),
  select,
  textarea {
    ${controlStyle};
  }

  select {
    appearance: none;
    background-image: ${CHEVRON};
    background-position: right 12px center;
    background-repeat: no-repeat;
    cursor: pointer;
    padding-right: 36px;
    text-overflow: ellipsis;
  }

  textarea {
    line-height: 1.5;
    min-height: 88px;
    resize: vertical;
  }

  input[type='color'] {
    background: ${palette.white};
    border: 1px solid ${palette.line};
    border-radius: 10px;
    cursor: pointer;
    height: 42px;
    padding: 4px;
    width: 100%;
  }
`;

export const FieldGroup = styled.div`
  color: ${palette.muted};
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 650;
  gap: 6px;
  letter-spacing: 0.01em;
  min-width: 0;
`;

export const Fieldset = styled.fieldset<{$inline?: boolean}>`
  align-items: end;
  border: 0;
  display: grid;
  gap: ${({$inline}) => ($inline ? '10px' : '14px')};
  grid-template-columns: ${({$inline}) => ($inline ? 'minmax(0, 1fr) auto' : 'minmax(0, 1fr)')};
  margin: 0;
  min-width: 0;
  padding: 0;

  > button {
    min-height: 42px;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 14px;
  margin-top: 16px;
`;

export const Grid = styled.div<{$even?: boolean; $wide?: boolean}>`
  align-items: start;
  display: grid;
  gap: 18px;
  grid-template-columns: ${({$even, $wide}) => {
    if ($even) return 'repeat(2, minmax(0, 1fr))';
    return $wide ? 'minmax(0, 2.1fr) minmax(300px, 1fr)' : 'minmax(0, 1.6fr) minmax(300px, 1fr)';
  }};

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Hero = styled.header`
  background: ${palette.ink};
  border-radius: 24px;
  box-shadow: 0 30px 60px -30px rgba(13, 31, 26, 0.6);
  color: ${palette.white};
  isolation: isolate;
  min-height: 400px;
  overflow: hidden;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 20px;
    min-height: 520px;
  }
`;

export const HeroBadge = styled.span`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(13, 31, 26, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.9);
  display: inline-flex;
  font-size: 11px;
  font-weight: 700;
  gap: 7px;
  letter-spacing: 0.1em;
  padding: 7px 12px;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

export const HeroBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: inherit;
  padding: 26px 34px 30px;
  position: relative;
  z-index: 2;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 18px 22px;
  }
`;

export const HeroCopy = styled.div`
  animation: ${fadeUp} 0.7s ${easing.out} both;
  margin-top: auto;
  max-width: 560px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HeroDate = styled.strong`
  color: ${palette.white};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const HeroFooter = styled.div`
  align-items: flex-end;
  animation: ${fadeUp} 0.7s 0.12s ${easing.out} both;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const HeroGhost = styled.button`
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  color: ${palette.white};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  gap: 7px;
  min-height: 48px;
  padding: 10px 18px;
  transition:
    background 0.15s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const HeroLink = styled(Link)`
  align-items: center;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.82);
  display: inline-flex;
  font-size: 13px;
  font-weight: 600;
  gap: 6px;
  padding: 6px 10px 6px 6px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${palette.white};
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const HeroScrim = styled.div`
  background:
    linear-gradient(90deg, rgba(13, 31, 26, 0.88) 0%, rgba(13, 31, 26, 0.6) 34%, rgba(13, 31, 26, 0) 68%),
    linear-gradient(0deg, rgba(13, 31, 26, 0.55) 0%, rgba(13, 31, 26, 0) 38%);
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 1;

  @media (max-width: ${breakpoints.mobile}) {
    background:
      linear-gradient(180deg, rgba(13, 31, 26, 0.9) 0%, rgba(13, 31, 26, 0.55) 42%, rgba(13, 31, 26, 0) 66%),
      linear-gradient(0deg, rgba(13, 31, 26, 0.75) 0%, rgba(13, 31, 26, 0) 30%);
  }
`;

export const HeroStat = styled.div`
  backdrop-filter: blur(8px);
  background: rgba(13, 31, 26, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  min-width: 128px;
  padding: 10px 14px;

  span {
    color: rgba(255, 255, 255, 0.62);
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    margin-bottom: 3px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  strong {
    color: ${palette.white};
    font-feature-settings: 'tnum';
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  small {
    color: rgba(255, 255, 255, 0.7);
    font-size: 11.5px;
    font-weight: 600;
    margin-left: 6px;
  }

  @media (max-width: ${breakpoints.mini}) {
    min-width: 0;
    padding: 8px 10px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    strong {
      font-size: 18px;
    }

    small {
      display: block;
      margin-left: 0;
    }
  }
`;

export const HeroStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: ${breakpoints.mini}) {
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    width: 100%;
  }
`;

export const HeroStatus = styled.p`
  align-items: center;
  color: ${palette.goldBright};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  font-weight: 700;
  gap: 8px;
  letter-spacing: 0.14em;
  margin: 0 0 10px;
  text-transform: uppercase;
`;

export const HeroTagline = styled.p`
  color: rgba(255, 255, 255, 0.84);
  font-size: 16px;
  line-height: 1.6;
  margin: 12px 0 0;
  max-width: 470px;
  text-shadow: 0 1px 12px rgba(13, 31, 26, 0.6);

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14.5px;
  }
`;

export const HeroTimer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > span {
    color: rgba(255, 255, 255, 0.72);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

export const HeroTitle = styled.h1`
  color: ${palette.white};
  font-family: ${fonts.display};
  font-size: clamp(52px, 6.4vw, 84px);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 0.95;
  margin: 0;
  text-shadow: 0 2px 30px rgba(13, 31, 26, 0.55);
`;

export const HeroTop = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
`;

export const HeroTribe = styled.span`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(13, 31, 26, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  color: ${palette.white};
  display: inline-flex;
  font-size: 15px;
  font-weight: 700;
  gap: 10px;
  min-height: 48px;
  padding: 5px 16px 5px 10px;

  small {
    color: rgba(255, 255, 255, 0.62);
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

export const Hint = styled.p<{$dark?: boolean}>`
  color: ${({$dark}) => ($dark ? '#a9bfb1' : palette.faint)};
  font-size: 12px;
  line-height: 1.55;
  margin: 0;
`;

export const IconControl = styled.span`
  display: block;
  position: relative;

  > svg {
    left: 10px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    translate: 0 -50%;
  }

  select,
  input {
    padding-left: 42px !important;
  }
`;

export const InlineFields = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

export const LinkButton = styled(Link)`
  align-items: center;
  color: ${palette.moss};
  display: inline-flex;
  font-size: 13px;
  font-weight: 650;
  gap: 5px;
  text-decoration: none;

  &:hover {
    color: ${palette.forest};
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: 6px;
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const Live = styled.span<{$color?: string}>`
  animation: ${pulse} 1.6s ease-in-out infinite;
  background: ${({$color}) => $color || palette.gold};
  border-radius: 50%;
  box-shadow: 0 0 0 3px ${({$color}) => ($color ? `${$color}33` : 'rgba(230, 170, 60, 0.25)')};
  display: inline-block;
  flex-shrink: 0;
  height: 7px;
  width: 7px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Loading = styled.div`
  align-items: center;
  color: ${palette.muted};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  gap: 12px;
  padding: 56px 20px;
`;

export const Meta = styled.div`
  align-items: center;
  color: ${palette.faint};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 4px 10px;
  justify-content: space-between;
  padding: 6px 4px 0;
`;

export const Muted = styled.p<{$dark?: boolean}>`
  color: ${({$dark}) => ($dark ? '#a9bfb1' : palette.muted)};
  font-size: 13.5px;
  line-height: 1.65;
  margin: 0 0 14px;
`;

export const Nav = styled.nav`
  backdrop-filter: blur(14px);
  background: rgba(251, 249, 243, 0.86);
  border: 1px solid ${palette.line};
  border-radius: 16px;
  box-shadow: ${shadows.card};
  position: sticky;
  top: 8px;
  z-index: 20;
`;

export const NavIndicator = styled.span`
  background: linear-gradient(180deg, #1f5446 0%, ${palette.forest} 100%);
  border-radius: 11px;
  bottom: 6px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 6px 14px -6px rgba(13, 31, 26, 0.6);
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 6px;
  transition:
    transform 0.4s ${easing.out},
    width 0.4s ${easing.out};
  will-change: transform, width;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const NavItem = styled.button<{$active: boolean; $plain?: boolean}>`
  align-items: center;
  background: ${({$active, $plain}) => ($active && $plain ? palette.forest : 'transparent')};
  border: 0;
  border-radius: 11px;
  color: ${({$active}) => ($active ? palette.white : palette.muted)};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  gap: 7px;
  padding: 10px 12px;
  position: relative;
  transition: color 0.2s ease;
  white-space: nowrap;
  z-index: 1;

  svg {
    opacity: ${({$active}) => ($active ? 1 : 0.75)};
  }

  &[data-count]::after {
    background: ${palette.ember};
    border-radius: 999px;
    color: ${palette.white};
    content: attr(data-count);
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    margin-left: -2px;
    padding: 3px 6px;
  }

  &:hover {
    color: ${({$active}) => ($active ? palette.white : palette.text)};
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const NavScroller = styled.div<{$fadeLeft: boolean; $fadeRight: boolean}>`
  border-radius: 15px;
  display: flex;
  gap: 2px;
  mask-image: linear-gradient(
    90deg,
    ${({$fadeLeft}) => ($fadeLeft ? 'transparent' : '#000')} 0,
    #000 44px,
    #000 calc(100% - 44px),
    ${({$fadeRight}) => ($fadeRight ? 'transparent' : '#000')} 100%
  );
  overflow-x: auto;
  padding: 6px;
  position: relative;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Pair = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 92px minmax(0, 1fr);
`;

export const Panel = styled.div`
  animation: ${fadeUp} 0.45s ${easing.out} both;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  scroll-margin-top: 78px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PanelTitle = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  justify-content: space-between;
  margin-bottom: 10px;

  h2,
  h3 {
    margin: 0;
  }
`;

export const Phase = styled.li<{$state: 'done' | 'now' | 'next'}>`
  align-items: center;
  color: ${({$state}) => ($state === 'next' ? palette.faint : palette.text)};
  display: flex;
  flex: 1;
  font-size: 12.5px;
  font-weight: 650;
  gap: 9px;
  min-width: 0;
  position: relative;

  > span:first-child {
    align-items: center;
    background: ${({$state}) => {
      if ($state === 'done') return palette.moss;
      return $state === 'now' ? palette.gold : palette.white;
    }};
    border: 2px solid
      ${({$state}) => {
        if ($state === 'done') return palette.moss;
        return $state === 'now' ? palette.gold : palette.line;
      }};
    border-radius: 50%;
    box-shadow: ${({$state}) => ($state === 'now' ? '0 0 0 4px rgba(230, 170, 60, 0.22)' : 'none')};
    color: ${({$state}) => ($state === 'next' ? palette.faint : palette.white)};
    display: inline-flex;
    flex-shrink: 0;
    height: 26px;
    justify-content: center;
    width: 26px;
  }

  small {
    color: ${palette.faint};
    display: block;
    font-size: 11px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:not(:last-child)::after {
    background: ${({$state}) => ($state === 'done' ? palette.moss : palette.line)};
    border-radius: 2px;
    content: '';
    flex: 1;
    height: 2px;
    margin-right: 10px;
    min-width: 12px;
  }

  @media (max-width: 900px) {
    flex: ${({$state}) => ($state === 'now' ? '1 1 auto' : '0 1 auto')};

    > div {
      display: ${({$state}) => ($state === 'now' ? 'block' : 'none')};
    }

    &:not(:last-child)::after {
      margin-right: 0;
      min-width: 10px;
    }
  }
`;

export const Phases = styled.ol`
  align-items: center;
  display: flex;
  flex: 1 1 320px;
  gap: 10px;
  list-style: none;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const ProgressFill = styled.span<{$active?: boolean; $color?: string}>`
  background-color: ${({$color}) => $color || palette.leaf};
  background-image: ${({$active}) =>
    $active
      ? 'linear-gradient(45deg, rgba(255,255,255,0.22) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.22) 75%, transparent 75%)'
      : 'none'};
  background-size: 28px 28px;
  border-radius: inherit;
  display: block;
  height: 100%;
  transition: width 0.8s ${easing.out};

  ${({$active}) =>
    $active &&
    css`
      animation: ${stripes} 1s linear infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

export const ProgressTrack = styled.div<{$dark?: boolean; $thick?: boolean}>`
  background: ${({$dark}) => ($dark ? 'rgba(255, 255, 255, 0.12)' : '#ece6d6')};
  border-radius: 999px;
  height: ${({$thick}) => ($thick ? '10px' : '7px')};
  margin: 10px 0 4px;
  overflow: hidden;
  width: 100%;
`;

export const Row = styled.div<{$dark?: boolean}>`
  align-items: center;
  border-bottom: 1px solid ${({$dark}) => ($dark ? 'rgba(255, 255, 255, 0.09)' : palette.lineSoft)};
  display: flex;
  flex-wrap: wrap;
  font-size: 13.5px;
  gap: 8px 12px;
  justify-content: space-between;
  padding: 12px 0;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 2px;
  }

  > span:first-child {
    color: ${({$dark}) => ($dark ? '#a9bfb1' : palette.muted)};
  }

  small {
    color: ${({$dark}) => ($dark ? '#a9bfb1' : palette.faint)};
    display: block;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    margin-top: 2px;
  }
`;

export const RowMain = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 150px;
  gap: 11px;
  min-width: 0;

  > div {
    min-width: 0;
  }

  strong {
    display: block;
    overflow-wrap: anywhere;
  }
`;

export const SeasonBar = styled.div`
  ${stagger};
  align-items: center;
  background: ${palette.paper};
  border: 1px solid ${palette.line};
  border-radius: 16px;
  box-shadow: ${shadows.card};
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  padding: 12px 16px;
`;

export const SeasonPicker = styled.label`
  align-items: center;
  color: ${palette.muted};
  display: flex;
  font-size: 12px;
  font-weight: 650;
  gap: 8px;

  select {
    ${controlStyle};
    appearance: none;
    background-image: ${CHEVRON};
    background-position: right 10px center;
    background-repeat: no-repeat;
    cursor: pointer;
    font-size: 13px;
    min-height: 36px;
    padding: 6px 32px 6px 10px;
    width: auto;
  }

  @media (max-width: ${breakpoints.mini}) {
    flex: 1 1 100%;

    select {
      width: 100%;
    }
  }
`;

export const Segment = styled.label`
  cursor: pointer;
  flex: 1;
  min-width: 0;
  position: relative;

  input {
    cursor: pointer;
    height: 100%;
    inset: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  input:disabled {
    cursor: not-allowed;
  }

  span {
    align-items: center;
    border-radius: 8px;
    color: ${palette.muted};
    display: flex;
    font-size: 12.5px;
    font-weight: 650;
    gap: 6px;
    height: 100%;
    justify-content: center;
    line-height: 1.2;
    min-height: 34px;
    padding: 6px 10px;
    text-align: center;
    transition:
      background 0.18s ease,
      box-shadow 0.18s ease,
      color 0.18s ease;
  }

  input:checked + span {
    background: ${palette.white};
    box-shadow:
      0 1px 2px rgba(28, 43, 37, 0.12),
      0 0 0 1px ${palette.line};
    color: ${palette.text};
  }

  input:focus-visible + span {
    box-shadow: ${shadows.focus};
  }

  &:hover input:enabled:not(:checked) + span {
    color: ${palette.text};
  }
`;

export const Segmented = styled.div<{$dark?: boolean}>`
  background: ${({$dark}) => ($dark ? 'rgba(255, 255, 255, 0.1)' : '#efe9d9')};
  border-radius: 11px;
  display: flex;
  gap: 3px;
  padding: 3px;

  ${({$dark}) =>
    $dark &&
    css`
      label span {
        color: rgba(255, 255, 255, 0.72);
      }

      label:hover input:enabled:not(:checked) + span {
        color: ${palette.white};
      }
    `}
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
`;

export const Stat = styled.div`
  ${stagger};
  align-items: center;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: 16px;
  box-shadow: ${shadows.card};
  display: flex;
  gap: 13px;
  min-width: 0;
  padding: 14px 16px;

  > div {
    min-width: 0;
  }

  span {
    color: ${palette.muted};
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1.3;
    margin-bottom: 3px;
    text-transform: uppercase;
  }

  strong {
    color: ${palette.text};
    font-feature-settings: 'tnum';
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  small {
    color: ${palette.faint};
    font-size: 12px;
    font-weight: 600;
    margin-left: 5px;
  }
`;

export const StatIcon = styled.span<{$tone?: Tone}>`
  align-items: center;
  background: ${({$tone = 'green'}) => TONES[$tone].background};
  border: 1px solid ${({$tone = 'green'}) => TONES[$tone].border};
  border-radius: 12px;
  color: ${({$tone = 'green'}) => TONES[$tone].color};
  display: inline-flex;
  flex-shrink: 0;
  height: 44px;
  justify-content: center;
  margin: 0 !important;
  width: 44px;
`;

export const Stats = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 420px) {
    gap: 10px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13.5px;
  text-align: left;
  width: 100%;

  th {
    color: ${palette.faint};
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 10px 12px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    border-top: 1px solid ${palette.lineSoft};
    font-feature-settings: 'tnum';
    padding: 12px;
    vertical-align: middle;
  }

  tbody tr {
    transition: background 0.15s ease;
  }

  tbody tr:hover {
    background: #faf7ee;
  }
`;

export const TableScroll = styled.div`
  margin: 0 -8px;
  overflow-x: auto;
`;

export const Teaser = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 560px;
  padding: 26px 8px 18px;
  text-align: center;

  h2 {
    font-family: ${fonts.display};
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  ul {
    display: grid;
    gap: 8px;
    list-style: none;
    margin: 4px 0 24px;
    padding: 0;
    text-align: left;
  }

  li {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #dbe8df;
    font-size: 13.5px;
    line-height: 1.5;
    padding: 10px 14px 10px 38px;
    position: relative;
  }

  li::before {
    background: ${palette.gold};
    border-radius: 50%;
    content: '';
    height: 8px;
    left: 16px;
    position: absolute;
    top: 16px;
    width: 8px;
  }
`;

export const TeaserArt = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 22px;

  span {
    align-items: center;
    animation: ${pop} 0.6s ${easing.spring} both;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    display: inline-flex;
    height: 88px;
    justify-content: center;
    width: 88px;
  }

  span:nth-child(2) {
    animation-delay: 0.08s;
    translate: 0 -10px;
  }

  span:nth-child(3) {
    animation-delay: 0.16s;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      animation: none;
    }
  }
`;

export const Toast = styled.div`
  align-items: center;
  animation: ${pop} 0.35s ${easing.spring} both;
  background: ${palette.ink};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  bottom: 24px;
  box-shadow: 0 20px 50px -12px rgba(13, 31, 26, 0.6);
  color: ${palette.white};
  display: flex;
  font-size: 13.5px;
  font-weight: 600;
  gap: 10px;
  left: 50%;
  max-width: calc(100vw - 32px);
  padding: 12px 18px 12px 14px;
  position: fixed;
  translate: -50% 0;
  z-index: 60;

  svg {
    color: ${palette.goldBright};
    flex-shrink: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 84px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: ${fadeIn} 0.2s ease both;
  }
`;
