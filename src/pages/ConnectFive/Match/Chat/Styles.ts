import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import UButton from 'components/Button';
import {breakpoints, fonts} from 'styles';

import {classic, fieldControl} from '../../theme';
import {matchButton, matchPanel} from '../theme';

export const ChatAvatar = styled(UAvatar)`
  flex-shrink: 0;
`;

export const ChatInput = styled.input`
  ${fieldControl};
  flex: 1;
  height: 40px;
  min-width: 0;
  padding: 0 14px;
`;

export const ChatInputRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const ChatMessageAuthor = styled.span`
  color: ${classic.text};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChatMessageContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const ChatMessageMeta = styled.div`
  align-items: baseline;
  display: flex;
  gap: 8px;
  min-width: 0;
`;

export const ChatMessageRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 10px;
`;

export const ChatMessageText = styled.p`
  color: ${classic.text};
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  overflow-wrap: anywhere;
`;

export const ChatMessageTime = styled.span`
  color: ${classic.textMuted};
  flex-shrink: 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
`;

// The padding leaves room for the scrollbar, the negative margin keeps the messages aligned with the panel title
export const ChatMessages = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  margin-right: -8px;
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-color: ${classic.borderStrong} transparent;
  scrollbar-width: thin;
`;

export const ChatPanel = styled.div`
  ${matchPanel};
  gap: 12px;
  height: 380px;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    height: 320px;
  }
`;

export const ChatStatus = styled.div`
  color: ${classic.textMuted};
  font-size: 13px;
  line-height: 1.5;
  padding: 4px 0;
  text-align: center;
`;

export const GuestButton = styled(UButton)`
  ${matchButton};
  flex: 1;
`;
