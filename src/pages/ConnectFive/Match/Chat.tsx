import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {createConnectFiveChatMessage, getConnectFiveChatMessages} from 'api/connectFive';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import {SocketDataType} from 'enums';
import {ConnectFiveChatMessage, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface ConnectFiveChatProps {
  matchId: number;
}

const CHAT_MESSAGE_MAX_LENGTH = 280;
const CHAT_MESSAGE_PAGE_SIZE = 50;
const SCROLL_THRESHOLD_PX = 80;

const ConnectFiveChat: SFC<ConnectFiveChatProps> = ({className, matchId}) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ConnectFiveChatMessage[]>([]);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [nextMessagesUrl, setNextMessagesUrl] = useState<string | null>(null);

  const chatListRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollAdjustRef = useRef<{previousScrollHeight: number; previousScrollTop: number} | null>(null);
  useEffect(() => {
    let isMounted = true;

    setChatMessages([]);
    setHasLoadedInitial(false);
    setNextMessagesUrl(null);

    const loadInitialMessages = async () => {
      try {
        setIsLoadingMessages(true);
        const response = await getConnectFiveChatMessages({
          matchId,
          page_size: CHAT_MESSAGE_PAGE_SIZE,
        });
        if (!isMounted) return;

        const orderedMessages = [...response.results].reverse();
        setChatMessages(orderedMessages);
        setHasLoadedInitial(true);
        setNextMessagesUrl(response.next);

        requestAnimationFrame(() => {
          const list = chatListRef.current;
          if (list) {
            list.scrollTop = list.scrollHeight;
          }
        });
      } catch (error) {
        if (!isMounted) return;
        displayErrorToast('Unable to load chat messages.');
      } finally {
        if (isMounted) {
          setIsLoadingMessages(false);
        }
      }
    };

    loadInitialMessages();

    const socket = new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/ws/connect-five/chat/${matchId}`);
    socket.onmessage = (event) => {
      const socketData = JSON.parse(event.data);
      if (socketData.type !== SocketDataType.CREATE_CONNECT_FIVE_CHAT_MESSAGE) return;
      if (!socketData.chat_message) return;

      const list = chatListRef.current;
      const shouldAutoScroll = list
        ? list.scrollHeight - list.scrollTop - list.clientHeight < SCROLL_THRESHOLD_PX
        : true;

      setChatMessages((prev) => {
        if (prev.some((message) => message.id === socketData.chat_message.id)) {
          return prev;
        }
        return [...prev, socketData.chat_message];
      });

      if (shouldAutoScroll) {
        requestAnimationFrame(() => {
          const nextList = chatListRef.current;
          if (nextList) {
            nextList.scrollTop = nextList.scrollHeight;
          }
        });
      }
    };

    return () => {
      isMounted = false;
      socket.close();
    };
  }, [matchId]);

  useEffect(() => {
    if (!pendingScrollAdjustRef.current) return;
    const list = chatListRef.current;
    if (!list) return;

    const {previousScrollHeight, previousScrollTop} = pendingScrollAdjustRef.current;
    pendingScrollAdjustRef.current = null;

    const nextScrollHeight = list.scrollHeight;
    list.scrollTop = nextScrollHeight - previousScrollHeight + previousScrollTop;
  }, [chatMessages]);

  const appendMessages = (messages: ConnectFiveChatMessage[]) => {
    setChatMessages((prev) => {
      const existingIds = new Set(prev.map((message) => message.id));
      const deduped = messages.filter((message) => !existingIds.has(message.id));
      if (!deduped.length) return prev;
      return [...prev, ...deduped];
    });
  };

  const formatTimestamp = (value: string | Date) => shortDate(value, false);

  const handleChatInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleChatInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    handleSendMessage();
  };

  const handleChatScroll = () => {
    const list = chatListRef.current;
    if (!list) return;

    if (list.scrollTop > 0) return;
    if (!nextMessagesUrl || isLoadingOlderMessages) return;

    loadOlderMessages();
  };

  const handleSendMessage = async () => {
    if (isSendingMessage) return;

    const trimmed = chatInput.trim();
    if (!trimmed) return;

    try {
      setIsSendingMessage(true);
      const response = await createConnectFiveChatMessage(matchId, {message: trimmed});
      appendMessages([response]);
      setChatInput('');

      requestAnimationFrame(() => {
        const list = chatListRef.current;
        if (list) {
          list.scrollTop = list.scrollHeight;
        }
      });
    } catch (error) {
      displayErrorToast('Unable to send message.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const loadOlderMessages = async () => {
    if (!nextMessagesUrl) return;

    const list = chatListRef.current;
    if (list) {
      pendingScrollAdjustRef.current = {
        previousScrollHeight: list.scrollHeight,
        previousScrollTop: list.scrollTop,
      };
    }

    try {
      setIsLoadingOlderMessages(true);
      const response = await getConnectFiveChatMessages({
        matchId,
        url: nextMessagesUrl,
      });
      const orderedMessages = [...response.results].reverse();
      setChatMessages((prev) => {
        const existingIds = new Set(prev.map((message) => message.id));
        const deduped = orderedMessages.filter((message) => !existingIds.has(message.id));
        if (!deduped.length) return prev;
        return [...deduped, ...prev];
      });
      setNextMessagesUrl(response.next);
    } catch (error) {
      displayErrorToast('Unable to load older messages.');
      pendingScrollAdjustRef.current = null;
    } finally {
      setIsLoadingOlderMessages(false);
    }
  };

  const renderChatMessages = () => {
    if (isLoadingMessages && !hasLoadedInitial) {
      return <S.ChatStatus>Loading chat...</S.ChatStatus>;
    }

    if (!chatMessages.length) {
      return <S.ChatStatus>No messages yet.</S.ChatStatus>;
    }

    return chatMessages.map((message) => (
      <S.ChatMessageRow key={message.id}>
        <S.ChatAvatar size="32px" src={message.sender.avatar} />
        <S.ChatMessageContent>
          <S.ChatMessageMeta>
            <S.ChatMessageAuthor>{message.sender.username}</S.ChatMessageAuthor>
            <S.ChatMessageTime>{formatTimestamp(message.created_date)}</S.ChatMessageTime>
          </S.ChatMessageMeta>
          <S.ChatMessageText>{message.message}</S.ChatMessageText>
        </S.ChatMessageContent>
      </S.ChatMessageRow>
    ));
  };

  const renderChatPanel = () => {
    const trimmedMessage = chatInput.trim();
    const sendDisabled = !trimmedMessage || isSendingMessage;

    return (
      <S.ChatPanel className={className}>
        <S.PanelHeader>
          <S.PanelTitle>Match chat</S.PanelTitle>
          <S.PanelSubtitle>Chat with players and spectators.</S.PanelSubtitle>
        </S.PanelHeader>
        <S.ChatMessages onScroll={handleChatScroll} ref={chatListRef}>
          {isLoadingOlderMessages ? <S.ChatStatus>Loading older messages...</S.ChatStatus> : null}
          {renderChatMessages()}
        </S.ChatMessages>
        <S.ChatInputRow>
          <S.ChatInput
            maxLength={CHAT_MESSAGE_MAX_LENGTH}
            onChange={handleChatInputChange}
            onKeyDown={handleChatInputKeyDown}
            placeholder="Say something..."
            type="text"
            value={chatInput}
          />
          <Button
            color={ButtonColor.primary}
            disabled={sendDisabled}
            isSubmitting={isSendingMessage}
            onClick={handleSendMessage}
            text="Send"
          />
        </S.ChatInputRow>
      </S.ChatPanel>
    );
  };

  return renderChatPanel();
};

export default ConnectFiveChat;
