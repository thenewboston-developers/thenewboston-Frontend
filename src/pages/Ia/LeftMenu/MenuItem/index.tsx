import {useDispatch, useSelector} from 'react-redux';

import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

export interface MenuItemProps {
  text: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, text}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const handleClick = () => {
    console.log('click');
    dispatch(updateManager({activeWalletId: null}));
  };

  return (
    <S.Container $isActive={manager.activeWalletId === 123} className={className} onClick={handleClick}>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default MenuItem;
