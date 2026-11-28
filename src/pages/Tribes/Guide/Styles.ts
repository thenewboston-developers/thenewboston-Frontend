import styled from 'styled-components';

import {fonts, palette, shadows, stagger} from '../theme';

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

export const Chapter = styled.article`
  ${stagger};
  background: ${palette.white};
  border: 1px solid ${palette.lineSoft};
  border-radius: 20px;
  box-shadow: ${shadows.card};
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  h3 {
    color: ${palette.text};
    font-family: ${fonts.display};
    font-size: 27px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.12;
    margin: 0 0 12px;
    text-wrap: balance;
  }
`;

export const ChapterArt = styled.div`
  aspect-ratio: 3 / 2;
  background: ${palette.sand};
  border-bottom: 1px solid ${palette.lineSoft};
  overflow: hidden;
  position: relative;

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const ChapterBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 24px 0;
`;

export const ChapterCategory = styled.div`
  color: ${palette.moss};
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const ChapterGrid = styled.section`
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));

  @media (min-width: 1500px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const ChapterNumber = styled.span`
  align-items: center;
  background: ${palette.forest};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: ${palette.paper};
  display: flex;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: 650;
  height: 34px;
  justify-content: center;
  left: 16px;
  position: absolute;
  top: 16px;
  width: 34px;
`;

export const ChapterRules = styled.details`
  border-top: 1px solid ${palette.lineSoft};
  margin-top: auto;

  summary {
    align-items: center;
    border-radius: 4px;
    color: ${palette.forest};
    cursor: pointer;
    display: flex;
    font-size: 12px;
    font-weight: 650;
    gap: 12px;
    justify-content: space-between;
    list-style: none;
    min-height: 56px;

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      color: ${palette.moss};
    }

    &:focus-visible {
      outline: 2px solid ${palette.moss};
      outline-offset: 3px;
    }

    svg {
      flex-shrink: 0;
    }
  }

  &[open] summary svg {
    transform: rotate(180deg);
  }

  > div {
    padding-bottom: 24px;
  }

  p {
    color: ${palette.muted};
    font-size: 13px;
    line-height: 1.75;
    margin: 0 0 12px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .sr-only {
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export const ChapterSummary = styled.p`
  color: ${palette.muted};
  font-size: 13.5px;
  line-height: 1.7;
  margin: 0 0 22px;
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
