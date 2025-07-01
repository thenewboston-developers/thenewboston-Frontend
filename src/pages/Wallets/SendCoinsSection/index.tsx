import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import UserSearchInput from 'components/UserSearchInput';
import {useActiveWallet, useToggle} from 'hooks';
import SendModal from 'modals/SendModal';
import {getSelf} from 'selectors/state';
import {SFC, UserReadSerializer} from 'types';

import * as S from './Styles';

const SendCoinsSection: SFC = ({className}) => {
  const [recipient, setRecipient] = useState<UserReadSerializer | null>(null);
  const [sendModalIsOpen, toggleSendModal] = useToggle(false);
  const activeWallet = useActiveWallet();
  const self = useSelector(getSelf);

  const handleRecipientChange = useCallback((user: UserReadSerializer | null) => {
    setRecipient(user);
  }, []);

  const handleSendClick = () => {
    if (recipient) {
      toggleSendModal();
    }
  };

  useEffect(() => {
    setRecipient(null);
  }, [activeWallet?.id]);

  if (!activeWallet || !self) return null;

  return (
    <>
      <S.Container className={className}>
        <S.Title>Send {activeWallet.currency.ticker}</S.Title>
        <S.SearchRow>
          <UserSearchInput
            errors={{}}
            label="Search for recipient"
            name="recipient"
            onChange={handleRecipientChange}
            touched={{}}
            value={recipient}
          />
          <S.SendButton disabled={!recipient} onClick={handleSendClick} text={`Send ${activeWallet.currency.ticker}`} />
        </S.SearchRow>
      </S.Container>
      {sendModalIsOpen && recipient && <SendModal close={toggleSendModal} recipient={recipient} />}
    </>
  );
};

export default SendCoinsSection;
