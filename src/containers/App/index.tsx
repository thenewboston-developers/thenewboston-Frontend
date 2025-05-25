import React from 'react';
import {useSelector} from 'react-redux';
import {Flip, ToastContainer} from 'react-toastify';

import WebSocket from 'containers/WebSocket';
import {useIsAuthenticated} from 'hooks';
import Authenticated from 'layouts/Authenticated';
import Unauthenticated from 'layouts/Unauthenticated';
import {getSelf} from 'selectors/state';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);

  const renderLayout = () => {
    if (isAuthenticated) return <Authenticated />;
    return <Unauthenticated />;
  };

  const renderWebSockets = () => {
    if (!isAuthenticated) return null;
    return (
      <>
        <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/exchange_orders`} />
        <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/notifications/${self.id}`} />
        <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/wallet/${self.id}`} />
      </>
    );
  };

  return (
    <>
      {renderLayout()}
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
