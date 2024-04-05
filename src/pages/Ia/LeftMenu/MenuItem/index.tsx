import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiDelete, mdiPencil} from '@mdi/js';

import {useToggle} from 'hooks';
import ConversationDeleteModal from 'modals/ConversationDeleteModal';
import ConversationEditModal from 'modals/ConversationEditModal';
import {AppDispatch, Conversation, SFC} from 'types';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import * as S from './Styles';

export interface MenuItemProps {
  conversation: Conversation;
}

const MenuItem: SFC<MenuItemProps> = ({className, conversation}) => {
  const [conversationDeleteModalIsOpen, toggleConversationDeleteModal] = useToggle(false);
  const [conversationEditModalIsOpen, toggleConversationEditModal] = useToggle(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();
  const manager = useSelector(getManager);
  const conversationId = params.id ? parseInt(params.id, 10) : manager.activeConversationId || null;

  const handleClick = () => {
    dispatch(
      updateManager({
        activeConversationId: conversation.id,
      }),
    );
    navigate(`/ia/${conversation.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleConversationDeleteModal();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleConversationEditModal();
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    setToolsVisible(true);
  };

  const renderTools = () => {
    if (!toolsVisible) return null;
    return (
      <S.Tools>
        <S.IconWrapper onClick={handleEditClick}>
          <S.Icon path={mdiPencil} />
        </S.IconWrapper>
        <S.IconWrapper onClick={handleDeleteClick}>
          <S.Icon path={mdiDelete} />
        </S.IconWrapper>
      </S.Tools>
    );
  };

  return (
    <>
      <S.Container
        $isActive={conversation.id === conversationId}
        className={className}
        onClick={handleClick}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
      >
        <S.Text>{conversation.name}</S.Text>
        {renderTools()}
      </S.Container>
      {conversationDeleteModalIsOpen ? (
        <ConversationDeleteModal close={toggleConversationDeleteModal} conversationId={conversation.id} />
      ) : null}
      {conversationEditModalIsOpen ? (
        <ConversationEditModal close={toggleConversationEditModal} conversation={conversation} />
      ) : null}
    </>
  );
};

export default MenuItem;
