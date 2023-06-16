import React from 'react';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useIsAuthenticated} from 'hooks';
import Authenticated from 'layouts/Authenticated';
import Unauthenticated from 'layouts/Unauthenticated';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  const renderLayout = () => {
    if (isAuthenticated) return <Authenticated />;
    return <Unauthenticated />;
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
    </>
  );
};

export default App;
