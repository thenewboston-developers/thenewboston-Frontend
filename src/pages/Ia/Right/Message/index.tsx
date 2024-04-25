import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {mdiDelete, mdiPencil} from '@mdi/js';

import Avatar from 'components/Avatar';
import Tool from 'components/Tool';
import {useToggle} from 'hooks';
import MessageDeleteModal from 'modals/MessageDeleteModal';
import MessageEditModal from 'modals/MessageEditModal';
import {Message as TMessage, SFC} from 'types';
import {shortDate} from 'utils/dates';
import * as S from './Styles';

export interface MessageProps {
  message: TMessage;
}

const Message: SFC<MessageProps> = ({className, message}) => {
  const [messageDeleteModalIsOpen, toggleMessageDeleteModal] = useToggle(false);
  const [messageEditModalIsOpen, toggleMessageEditModal] = useToggle(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const {modified_date, sender, text} = message;

  const handleClick = () => {
    navigate(`/profile/${sender.id}`);
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
      <S.ToolsContainer>
        <S.Tools>
          <Tool icon={mdiPencil} onClick={toggleMessageEditModal} />
          <Tool icon={mdiDelete} onClick={toggleMessageDeleteModal} />
        </S.Tools>
      </S.ToolsContainer>
    );
  };

  return (
    <>
      <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
        <Link to={`/profile/${sender.id}`}>
          <Avatar src={sender.avatar} />
        </Link>
        <S.Right>
          <S.Header>
            <S.HeaderLeft>
              <S.DisplayName onClick={handleClick}>{sender.username}</S.DisplayName>
              <S.Date>{shortDate(modified_date, true)}</S.Date>
            </S.HeaderLeft>
            <S.HeaderRight>{renderTools()}</S.HeaderRight>
          </S.Header>
          <S.Content>{text}</S.Content>
        </S.Right>
      </S.Container>
      {messageDeleteModalIsOpen ? <MessageDeleteModal close={toggleMessageDeleteModal} messageId={message.id} /> : null}
      {messageEditModalIsOpen ? <MessageEditModal close={toggleMessageEditModal} message={message} /> : null}
    </>
  );
};

export default Message;
