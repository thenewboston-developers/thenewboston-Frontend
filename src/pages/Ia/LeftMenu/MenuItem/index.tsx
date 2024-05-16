import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import {useToggle} from 'hooks';
import ConversationDeleteModal from 'modals/ConversationDeleteModal';
import ConversationEditModal from 'modals/ConversationEditModal';
import PostModal from 'modals/PostModal';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, Conversation, SFC} from 'types';
import * as S from './Styles';

export interface MenuItemProps {
  conversation: Conversation;
  index: number;
}

const MenuItem: SFC<MenuItemProps> = ({className, conversation, index}) => {
  const [conversationDeleteModalIsOpen, toggleConversationDeleteModal] = useToggle(false);
  const [conversationEditModalIsOpen, toggleConversationEditModal] = useToggle(false);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const navigate = useNavigate();
  const params = useParams();

  const conversationId = params.id ? parseInt(params.id, 10) : manager.activeConversationId || null;

  const handleClick = () => {
    dispatch(
      updateManager({
        activeConversationId: conversation.id,
      }),
    );
    navigate(`/ia/${conversation.id}`);
  };

  const handleDeleteClick = () => {
    toggleConversationDeleteModal();
  };

  const handleEditClick = () => {
    toggleConversationEditModal();
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    setToolsVisible(true);
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: handleEditClick,
    },
    {
      label: 'Delete',
      onClick: handleDeleteClick,
    },
  ];

  const renderTools = () => {
    if (!toolsVisible) return null;
    return (
      <S.Tools>
        <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
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
        <S.Text>
          {conversation.name} {index + 1}
        </S.Text>
        {renderTools()}
      </S.Container>

      {conversationDeleteModalIsOpen ? (
        <ConversationDeleteModal close={toggleConversationDeleteModal} conversationId={conversation.id} />
      ) : null}
      {conversationEditModalIsOpen ? (
        <ConversationEditModal close={toggleConversationEditModal} conversation={conversation} />
      ) : null}
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default MenuItem;
