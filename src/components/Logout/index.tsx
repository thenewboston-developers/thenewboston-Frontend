import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {logout} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';

const Logout: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate(PATH_AUTHENTICATION.LOGIN);
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
