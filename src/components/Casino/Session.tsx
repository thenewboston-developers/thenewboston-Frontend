import {Fragment, ReactNode} from 'react';
import {useSelector} from 'react-redux';

import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';

// Remount all game and financial UI state when the signed-in member changes.
const CasinoSession = ({children}: {children: ReactNode}) => {
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);
  const viewerKey = isAuthenticated ? String(self.id) : 'guest';
  return <Fragment key={viewerKey}>{children}</Fragment>;
};

export default CasinoSession;
