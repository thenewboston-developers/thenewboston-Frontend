import {useLocation} from 'react-router-dom';
import {UserPlus} from 'lucide-react';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';
import {getAuthenticationPath, getLocationPath} from 'utils/authentication';

import useIsRail from '../useIsRail';

import * as S from './Styles';

const TEXT = 'Create account';

// Takes the place of the "New post" button for signed-out visitors
const CreateAccountLink: SFC = ({className}) => {
  const isRail = useIsRail();
  const location = useLocation();

  return (
    <S.Link
      {...analyticsTarget('create_account')}
      className={className}
      title={isRail ? TEXT : undefined}
      to={getAuthenticationPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, getLocationPath(location))}
    >
      <UserPlus aria-hidden size={18} strokeWidth={2} />
      <S.Text>{TEXT}</S.Text>
    </S.Link>
  );
};

export default CreateAccountLink;
