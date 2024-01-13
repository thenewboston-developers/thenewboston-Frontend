import {useState} from 'react';
import {mdiDelete, mdiPencil} from '@mdi/js';

import Avatar from 'components/Avatar';
import Tool from 'components/Tool';
import {Message as TMessage, SFC} from 'types';
import {shortDate} from 'utils/dates';
import * as S from './Styles';

export interface MessageProps {
  message: TMessage;
}

const Message: SFC<MessageProps> = ({className, message}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);

  const {modified_date, sender, text} = message;

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
          <Tool icon={mdiPencil} onClick={() => {}} />
          <Tool icon={mdiDelete} onClick={() => {}} />
        </S.Tools>
      </S.ToolsContainer>
    );
  };

  return (
    <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
      <Avatar src={sender.avatar} />
      <S.Right>
        <S.Header>
          <S.HeaderLeft>
            <S.DisplayName>{sender.username}</S.DisplayName>
            <S.Date>{shortDate(modified_date, true)}</S.Date>
          </S.HeaderLeft>
          <S.HeaderRight>{renderTools()}</S.HeaderRight>
        </S.Header>
        <S.Content>{text}</S.Content>
      </S.Right>
    </S.Container>
  );
};

export default Message;
