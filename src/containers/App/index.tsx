import React from 'react';
import {useSelector} from 'react-redux';
import {matchPath, useLocation} from 'react-router-dom';
import {Flip, ToastContainer} from 'react-toastify';

import DeploymentNotification from 'components/DeploymentNotification';
import {PATH_AUTHENTICATION} from 'constants/paths';
import FrontendDeploymentWebSocket from 'containers/FrontendDeploymentWebSocket';
import WebSocket from 'containers/WebSocket';
import {useDeploymentPolling, useIsAuthenticated} from 'hooks';
import Main from 'layouts/Main';
import Unauthenticated from 'layouts/Unauthenticated';
import AuthPromptModal from 'modals/AuthPromptModal';
import {getSelf} from 'selectors/state';

import 'react-toastify/dist/ReactToastify.css';

const AUTHENTICATION_PAGE_PATHS = [PATH_AUTHENTICATION.CREATE_ACCOUNT, PATH_AUTHENTICATION.SIGN_IN];

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const self = useSelector(getSelf);

  useDeploymentPolling();

  const isAuthenticationPage = AUTHENTICATION_PAGE_PATHS.some((path) => !!matchPath(path, location.pathname));

  const renderLayout = () => {
    if (isAuthenticationPage) return <Unauthenticated />;

    // Everything else is open to signed-out visitors too. The key remounts the pages when a session starts or ends
    // while they are open, so they load their data again for the new session.
    return <Main key={isAuthenticated ? 'authenticated' : 'guest'} />;
  };

  const renderWebSockets = () => {
    if (!isAuthenticated) return null;
    return (
      <>
        <FrontendDeploymentWebSocket />
        <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/connect-five/${self.id}`} />
        <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/notifications/${self.id}`} />
        <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/wallet/${self.id}`} />
      </>
    );
  };

  return (
    <>
      {renderLayout()}
      <AuthPromptModal />
      <DeploymentNotification />
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        transition={Flip}
      />
      {renderWebSockets()}
    </>
  );
};

export default App;
