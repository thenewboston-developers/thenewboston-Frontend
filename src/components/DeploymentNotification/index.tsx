import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {dismissUpdateNotification} from 'dispatchers/frontendDeployments';
import {AppDispatch} from 'types';

import * as S from './Styles';

interface FrontendDeploymentsState {
  updateAvailable: boolean;
}

const COUNTDOWN_SECONDS = 10;

const DeploymentNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_SECONDS);
  const [isVisible, setIsVisible] = useState(false);

  const updateAvailable = useSelector(
    (state: {frontendDeployments: FrontendDeploymentsState}) => state.frontendDeployments.updateAvailable,
  );

  useEffect(() => {
    if (updateAvailable) {
      setIsVisible(true);
      setCountdown(COUNTDOWN_SECONDS);
    }
  }, [updateAvailable]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleReload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    dispatch(dismissUpdateNotification());
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <S.Container>
      <S.Content>
        <S.Message>
          New version available! Refreshing in <S.Countdown>{countdown}</S.Countdown> seconds...
        </S.Message>
        <S.ButtonGroup>
          <S.Button onClick={handleReload}>Refresh Now</S.Button>
          <S.DismissButton onClick={handleDismiss}>Dismiss</S.DismissButton>
        </S.ButtonGroup>
      </S.Content>
    </S.Container>
  );
};

export default DeploymentNotification;
