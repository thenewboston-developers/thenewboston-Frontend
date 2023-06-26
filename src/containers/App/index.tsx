import React from 'react';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WebSocket from 'containers/WebSocket';
import {useIsAuthenticated} from 'hooks';
import Authenticated from 'layouts/Authenticated';
import Unauthenticated from 'layouts/Unauthenticated';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  const renderLayout = () => {
    if (isAuthenticated) return <Authenticated />;
    return <Unauthenticated />;
  };

  const renderWebSocket = () => {
    if (!isAuthenticated) return null;
    return <WebSocket />;
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
      {renderWebSocket()}
    </>
  );
};

export default App;
