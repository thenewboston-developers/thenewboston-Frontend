import styled from 'styled-components';

import {easing, fonts, palette, shadows, stagger} from '../theme';

export * from '../Styles';

export const Chain = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  > svg {
    color: ${palette.faint};
  }
`;

export const Chip = styled.span`
  align-items: center;
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 10px;
  display: inline-flex;
  font-size: 12.5px;
  font-weight: 650;
  gap: 6px;
  padding: 4px 9px 4px 5px;
  white-space: nowrap;
`;

export const Chapter = styled.article`
  ${stagger};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: 18px;
  box-shadow: ${shadows.card};
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ${easing.out};

  &:hover {
    box-shadow: ${shadows.lifted};
    transform: translateY(-3px);
  }

  h2 {
    font-size: 18px;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }

  p {
    color: ${palette.muted};
    font-size: 13.5px;
    line-height: 1.65;
    margin: 0 0 10px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ChapterArt = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;

  > span {
    color: ${palette.dune};
    font-family: ${fonts.display};
    font-size: 44px;
    font-weight: 700;
    line-height: 1;
  }

  > div {
    display: flex;

    span {
      align-items: center;
      background: #faf7ee;
      border: 2px solid ${palette.white};
      border-radius: 14px;
      box-shadow: 0 0 0 1px ${palette.line};
      display: inline-flex;
      height: 48px;
      justify-content: center;
      margin-left: -8px;
      width: 48px;
    }
  }
`;

export const Intro = styled.div`
  margin: 0 auto;
  max-width: 660px;
  padding: 14px 0 6px;
  text-align: center;

  h2 {
    font-family: ${fonts.display};
    font-size: clamp(28px, 3.6vw, 40px);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 12px;
  }

  p {
    justify-content: center;
  }
`;

export const Land = styled.div`
  align-items: center;
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 14px;
  display: flex;
  gap: 12px;
  padding: 12px 14px;

  strong {
    display: block;
    font-size: 14px;
  }

  small {
    color: ${palette.muted};
    display: block;
    font-size: 12px;
  }
`;
