import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {createConversation} from 'dispatchers/conversations';
import {getConversations} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const conversations = useSelector(getConversations);
  const dispatch = useDispatch<AppDispatch>();

  const conversationList = useMemo(() => {
    return orderBy(Object.values(conversations), ['created_date'], ['desc']);
  }, [conversations]);

  const handleButtonClick = async () => {
    try {
      await dispatch(createConversation({name: 'beans 2'}));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating the conversation');
    }
  };

  const renderButtonContainer = () => {
    return (
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text="New Conversation" />
      </S.ButtonContainer>
    );
  };

  const renderMenuItems = () => {
    const menuItems = conversationList.map(({name}) => <MenuItem text={name} />);
    return <>{menuItems}</>;
  };

  return (
    <S.Container className={className}>
      {renderButtonContainer()}
      {renderMenuItems()}
    </S.Container>
  );
};

export default LeftMenu;
