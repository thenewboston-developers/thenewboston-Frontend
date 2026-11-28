import styled from 'styled-components';

import {Card as UCard} from './Styles';
import {fonts, palette} from './theme';

export * from './Styles';

export const Cover = styled.div`
  aspect-ratio: 16 / 9;
  background: ${palette.forest};
  flex-shrink: 0;
  isolation: isolate;
  overflow: hidden;
  position: relative;
`;

export const CoverFallback = styled.div`
  align-items: center;
  background:
    radial-gradient(ellipse at 80% 0%, rgba(246, 200, 101, 0.2), transparent 65%),
    linear-gradient(155deg, ${palette.forest}, ${palette.ink});
  color: ${palette.goldBright};
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: center;

  span {
    color: ${palette.paper};
    font-family: ${fonts.display};
    font-size: 28px;
    letter-spacing: 0.08em;
  }
`;

export const CoverImage = styled.img<{$loaded: boolean}>`
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: center;
  opacity: ${({$loaded}) => ($loaded ? 1 : 0)};
  position: absolute;
  width: 100%;
`;

export const GuideHeader = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 8px 0;

  h1 {
    font-family: ${fonts.display};
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0;
  }
`;

export const TournamentCard = styled(UCard)`
  display: flex;
  flex-direction: column;
`;

export const TournamentDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px;

  h3 {
    overflow-wrap: anywhere;
  }

  > a:last-child {
    margin-top: auto;
  }
`;
