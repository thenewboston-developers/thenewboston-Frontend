import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import {getConversations as _getConversations} from 'dispatchers/conversations';
import {getConversations, getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const conversations = useSelector(getConversations);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  useEffect(() => {
    (async () => {
      await dispatch(_getConversations({owner: self.id!}));
    })();
  }, [dispatch, self.id]);

  const conversationList = useMemo(() => {
    return orderBy(Object.values(conversations), ['created_date'], ['desc']);
  }, [conversations]);

  const handleButtonClick = () => {
    dispatch(
      updateManager({
        activeConversationId: null,
      }),
    );
    navigate('/ia');
  };

  const renderButtonContainer = () => {
    return (
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text="New Conversation" />
      </S.ButtonContainer>
    );
  };

  const renderMenuItems = () => {
    const menuItems = conversationList.map((conversation, index) => (
      <MenuItem conversation={conversation} key={conversation.id} index={index} />
    ));

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
