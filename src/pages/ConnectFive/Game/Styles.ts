import styled, {css} from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

export const Board = styled.div`
  background: ${colors.border};
  border-radius: 12px;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  overflow: hidden;
  width: 100%;
`;

export const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BoardWrapper = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const Cell = styled.button<{$isPreview: boolean; $isPreviewInvalid: boolean}>`
  align-items: center;
  aspect-ratio: 1 / 1;
  background: ${colors.white};
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;

  ${({$isPreviewInvalid}) =>
    $isPreviewInvalid &&
    css`
      background: ${colors.palette.red[50]};
    `}
`;

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const GameLayout = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const InfoLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  text-transform: uppercase;
`;

export const InfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const InfoValue = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.medium};
`;

export const LoadingState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
`;

export const MatchInfo = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PanelSubtitle = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const PanelTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  margin: 0;
`;

export const PendingState = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  padding: 24px;
`;

export const PendingText = styled.p`
  color: ${colors.secondary};
  margin: 8px 0 0;
`;

export const PendingTitle = styled.h2`
  color: ${colors.primary};
  font-size: 18px;
  margin: 0;
`;

export const Piece = styled.div<{$variant: 'playerA' | 'playerB'}>`
  background: ${({$variant}) => ($variant === 'playerA' ? colors.palette.blue[500] : colors.palette.orange[500])};
  border-radius: 50%;
  height: 70%;
  width: 70%;
`;

export const PlayerCard = styled.div<{$isActive: boolean}>`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${({$isActive}) => ($isActive ? colors.palette.green[400] : colors.border)};
  border-radius: 16px;
  display: flex;
  gap: 12px;
  padding: 12px;
`;

export const PlayerMeta = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const PlayerName = styled.div`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const Players = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const Preview = styled.div<{$isInvalid: boolean}>`
  border-radius: 12px;
  inset: 8px;
  opacity: 0.6;
  position: absolute;

  ${({$isInvalid}) =>
    $isInvalid
      ? css`
          background: ${colors.palette.red[300]};
        `
      : css`
          background: ${colors.palette.green[200]};
        `}
`;

export const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PurchaseMeta = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const PurchaseName = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const PurchasePanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const PurchaseRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatusBanner = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 16px;
`;

export const StatusText = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.medium};
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: 24px;
  margin: 0;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ToolButton = styled.button<{$isActive: boolean; $isDisabled: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.palette.blue[100] : colors.white)};
  border: 1px solid ${({$isActive}) => ($isActive ? colors.palette.blue[400] : colors.border)};
  border-radius: 14px;
  cursor: ${({$isDisabled}) => ($isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.5 : 1)};
  padding: 10px 14px;
`;

export const ToolCount = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const ToolLabel = styled.span`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;
