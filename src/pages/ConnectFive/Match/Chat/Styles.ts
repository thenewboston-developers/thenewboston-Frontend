import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import {colors, fonts} from 'styles';

export const ChatAvatar = styled(UAvatar)`
  flex-shrink: 0;
`;

export const ChatInput = styled.input`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  color: ${colors.primary};
  flex: 1;
  font-size: 14px;
  padding: 10px 12px;

  &::placeholder {
    color: ${colors.palette.gray[500]};
  }

  &:disabled {
    background: ${colors.palette.gray[100]};
    color: ${colors.palette.gray[500]};
  }

  &:focus {
    border-color: ${colors.palette.blue[400]};
    box-shadow: 0 0 0 2px rgba(51, 123, 255, 0.2);
    outline: none;
  }
`;

export const ChatInputRow = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;

export const ChatMessageAuthor = styled.span`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;

export const ChatMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ChatMessageMeta = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const ChatMessageRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 10px;
`;

export const ChatMessageText = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`;

export const ChatMessageTime = styled.span`
  color: ${colors.palette.gray[500]};
  font-size: 11px;
`;

export const ChatMessages = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 6px;
`;

export const ChatPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 380px;
  overflow: hidden;
  padding: 16px;

  @media (max-width: 1024px) {
    height: 320px;
  }
`;

export const ChatStatus = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  padding: 4px 0;
  text-align: center;
`;
