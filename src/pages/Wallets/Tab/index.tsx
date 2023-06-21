import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import {WalletTab} from 'enums';
import {getManager} from 'selectors/state';
import {GenericVoidFunction, SFC} from 'types';
import * as S from './Styles';

export interface TabProps {
  children: ReactNode;
  onClick: GenericVoidFunction;
  walletTab: WalletTab;
}

const Tab: SFC<TabProps> = ({children, className, onClick, walletTab}) => {
  const manager = useSelector(getManager);

  return (
    <S.Tab $isActive={manager.activeWalletTab === walletTab} className={className} onClick={() => onClick(walletTab)}>
      {children}
    </S.Tab>
  );
};

export default Tab;
