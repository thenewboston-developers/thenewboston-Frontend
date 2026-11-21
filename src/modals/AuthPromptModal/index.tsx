import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import AuthButtons from 'components/AuthButtons';
import {ModalBody, ModalFooter} from 'components/Modal';
import {getAuthPrompt} from 'selectors/state';
import {closeAuthPrompt} from 'store/authPrompt';
import {AppDispatch, SFC} from 'types';

import * as S from './Styles';

/**
 * Shown when a signed-out visitor tries something that needs an account. It is opened through the
 * useRequireAuthentication hook and rendered once for the whole app.
 */
const AuthPromptModal: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const {intent} = useSelector(getAuthPrompt);

  // The prompt belongs to the page it was opened on
  useEffect(() => {
    dispatch(closeAuthPrompt());
  }, [dispatch, location.pathname]);

  const handleClose = () => {
    dispatch(closeAuthPrompt());
  };

  if (!intent) return null;

  return (
    <S.Modal className={className} close={handleClose} header="Join thenewboston">
      <ModalBody>
        <S.Message>Sign in or create an account to {intent}.</S.Message>
      </ModalBody>
      <ModalFooter>
        <AuthButtons onNavigate={handleClose} />
      </ModalFooter>
    </S.Modal>
  );
};

export default AuthPromptModal;
