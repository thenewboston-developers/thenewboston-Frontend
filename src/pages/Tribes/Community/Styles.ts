import styled from 'styled-components';

import {fonts, palette} from '../theme';

export * from '../Styles';

export const Crest = styled.div<{$color: string}>`
  align-items: center;
  background:
    linear-gradient(110deg, ${({$color}) => $color}d9 0%, ${({$color}) => $color}40 34%, transparent 64%),
    linear-gradient(160deg, ${palette.forest} 0%, ${palette.ink} 100%);
  color: ${palette.white};
  display: flex;
  gap: 18px;
  padding: 24px 22px;

  > div {
    min-width: 0;
  }

  h2 {
    color: ${palette.white};
    font-family: ${fonts.display};
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
    overflow-wrap: anywhere;
  }

  em {
    color: rgba(255, 255, 255, 0.78);
    display: block;
    font-size: 14px;
    margin-top: 6px;
    overflow-wrap: anywhere;
  }
`;

export const CrestBody = styled.div`
  padding: 18px 22px 20px;
`;

export const CrestStats = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  margin-bottom: 14px;

  div {
    background: #faf7ee;
    border: 1px solid ${palette.line};
    border-radius: 12px;
    padding: 10px 12px;
  }

  span {
    color: ${palette.faint};
    display: block;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    font-feature-settings: 'tnum';
    font-size: 19px;
    letter-spacing: -0.02em;
  }
`;

export const Project = styled.div`
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 14px;
  margin-top: 12px;
  padding: 16px;

  h3 {
    font-size: 15px;
    margin: 0;
    overflow-wrap: anywhere;
  }
`;

export const ProjectGoal = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;

  strong {
    font-feature-settings: 'tnum';
  }
`;
