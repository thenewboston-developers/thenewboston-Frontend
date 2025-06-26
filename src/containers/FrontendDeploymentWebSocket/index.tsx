import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {setPollingEnabled} from 'store/frontendDeployments';
import {AppDispatch} from 'types';

const FrontendDeploymentWebSocket: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useMemo((): ReconnectingWebSocket => {
    const url = `${process.env.REACT_APP_WS_URL}/ws/frontend-deployments`;
    return new ReconnectingWebSocket(url, [], {
      maxRetries: 3,
      reconnectionDelayGrowFactor: 1.3,
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onerror = () => {
      dispatch(setPollingEnabled(true));
    };

    socket.onclose = (event) => {
      if (!event.wasClean) {
        dispatch(setPollingEnabled(true));
      }
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onopen = () => {
      dispatch(setPollingEnabled(false));
    };

    return () => {
      socket.close();
    };
  }, [dispatch, socket]);

  return null;
};

export default FrontendDeploymentWebSocket;
