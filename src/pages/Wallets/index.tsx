import {SFC} from 'types';
import MenuItem from './MenuItem';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.LeftMenu>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </S.LeftMenu>
      <div>
        <div>right</div>
        <div>right</div>
        <div>right</div>
        <div>right</div>
      </div>
    </S.Container>
  );
};

export default Wallets;
