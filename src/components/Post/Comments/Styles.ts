import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors, fonts} from 'styles';

type ConnectionStatus = 'connected' | 'disconnected' | 'error' | 'syncing';

const getConnectionStatusColor = (status: ConnectionStatus) => {
  switch (status) {
    case 'connected':
      return colors.palette.green[500];
    case 'error':
      return colors.palette.red[500];
    case 'syncing':
      return colors.palette.blue[500];
    case 'disconnected':
    default:
      return colors.palette.gray[500];
  }
};

export const ComposerAvatar = styled(UAvatar)`
  flex-shrink: 0;
`;

export const CommentForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 24px 14px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 10px 16px 14px;
  }
`;

export const CommentHistory = styled.div<{$hasOverflow: boolean}>`
  background: #fbfbfb;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 380px;
  overflow-y: ${({$hasOverflow}) => ($hasOverflow ? 'auto' : 'hidden')};
  scrollbar-color: rgba(83, 100, 113, 0.35) transparent;
  scrollbar-width: thin;

  > *:first-child {
    margin-top: 10px;
  }

  > *:last-child {
    margin-bottom: 10px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: content-box;
    background-color: rgba(83, 100, 113, 0.35);
    border: 2px solid transparent;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(83, 100, 113, 0.45);
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-height: 280px;
  }
`;

export const CommentHistorySection = styled.div`
  background: #fbfbfb;
  padding: 0 0 0 24px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 0 0 16px;
  }
`;

export const ComposerInputRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 10px;
`;

export const ConnectionStatusContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 6px;
`;

export const ConnectionStatusLabel = styled.div<{$status: ConnectionStatus}>`
  color: ${({$status}) => getConnectionStatusColor($status)};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  line-height: 1;
`;

export const ConnectionStatusLight = styled.div<{$status: ConnectionStatus}>`
  background-color: ${({$status}) => getConnectionStatusColor($status)};
  border-radius: 50%;
  flex-shrink: 0;
  height: 10px;
  width: 10px;
`;

export const Container = styled.div`
  margin-top: 10px;
`;

export const ControlsLeft = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ComposerToolsContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-width: 0;
`;

export const ComposerToolsRow = styled.div`
  align-items: center;
  display: grid;
  gap: 10px;
  grid-template-columns: 36px minmax(0, 1fr);
`;

export const ComposerToolsSpacer = styled.div`
  height: 1px;
  width: 36px;
`;

export const ControlsRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const ControlsWrapper = ControlsRow;

export const IconContainer = styled.div`
  align-items: center;
  background-color: ${colors.background};
  border-radius: 7px 0 0 7px;
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: center;
  padding: 0 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[200]};
  }
`;

export const IMG_SIZE = '24px';

export const Image = styled.img`
  border-radius: 50%;
  height: ${IMG_SIZE};
  width: ${IMG_SIZE};
`;

export const MentionTextareaWrapper = styled.div`
  flex: 1;
  width: 100%;

  textarea {
    background-color: ${colors.white};
    border: 1px solid ${colors.borderDarker};
    border-radius: 12px;
    line-height: 20px;
    max-height: 96px;
    min-height: 40px;
    overflow-y: auto;
    padding: 8px 12px;
    resize: none;
  }
`;

export const PriceAmountInput = styled(UInlineInput)`
  background-color: ${colors.background};
  border: none;
  border-left: 1px solid ${colors.borderDarker};
  border-radius: 0 7px 7px 0;
  height: 38px;
  padding: 8px 12px;
  width: 100px;
`;

export const PriceAmountInputContainer = styled.div`
  align-items: center;
  background-color: ${colors.whiteHover};
  border: 1px solid ${colors.borderDarker};
  border-radius: 8px;
  display: grid;
  grid-auto-flow: column;
  height: 40px;
  overflow: hidden;
`;

export const SectionDivider = styled.div<{$position: 'bottom' | 'top'}>`
  background: ${({$position}) =>
    $position === 'top'
      ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.06) 0%, rgba(17, 24, 39, 0) 100%)'
      : 'linear-gradient(to top, rgba(17, 24, 39, 0.06) 0%, rgba(17, 24, 39, 0) 100%)'};
  height: 5px;
  pointer-events: none;
  position: relative;
  width: 100%;
  z-index: 1;

  ${({$position}) => ($position === 'top' ? 'margin-bottom: -5px;' : 'margin-top: -5px;')}
`;

export const TipCurrencyButton = styled.button`
  background-color: ${colors.background};
  border: 1px solid ${colors.borderDarker};
  border-radius: 8px;
  color: ${colors.secondary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  padding: 0 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[100]};
  }
`;
