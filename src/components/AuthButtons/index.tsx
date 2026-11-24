import {useLocation, useNavigate} from 'react-router-dom';

import Button, {ButtonColor} from 'components/Button';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {GenericVoidFunction, SFC} from 'types';
import {getAuthenticationPath, getLocationPath} from 'utils/authentication';
import {captureGameSignupClick, GameAnalyticsSource} from 'utils/gameAnalytics';

import * as S from './Styles';

export interface AuthButtonsProps {
  analyticsSource?: GameAnalyticsSource;
  onNavigate?: GenericVoidFunction;
}

/**
 * The pair of buttons that takes a signed-out visitor to the sign in or create account page. Either way they are
 * returned to the page they are on once they are authenticated.
 */
const AuthButtons: SFC<AuthButtonsProps> = ({analyticsSource, className, onNavigate}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (authenticationPath: string) => {
    if (authenticationPath === PATH_AUTHENTICATION.CREATE_ACCOUNT) captureGameSignupClick(analyticsSource);
    onNavigate?.();
    navigate(getAuthenticationPath(authenticationPath, getLocationPath(location)));
  };

  return (
    <S.Container className={className}>
      <Button
        analyticsName="sign_in"
        color={ButtonColor.secondary}
        onClick={() => handleClick(PATH_AUTHENTICATION.SIGN_IN)}
        text="Sign In"
      />
      <Button
        analyticsName="create_account"
        color={ButtonColor.danger}
        onClick={() => handleClick(PATH_AUTHENTICATION.CREATE_ACCOUNT)}
        text="Create Account"
      />
    </S.Container>
  );
};

export default AuthButtons;
