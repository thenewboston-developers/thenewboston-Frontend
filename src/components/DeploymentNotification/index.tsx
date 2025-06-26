import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiInformationOutline} from '@mdi/js';

import {DEPLOYMENT_TIMESTAMP_KEY} from 'constants/localStorage';
import {getFrontendDeployments} from 'selectors/state';
import {setUpdateAvailable} from 'store/frontendDeployments';
import {AppDispatch} from 'types';

import * as S from './Styles';

const COUNTDOWN_SECONDS = 10;

const DeploymentNotification = () => {
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_SECONDS);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {currentDeployment, updateAvailable} = useSelector(getFrontendDeployments);

  useEffect(() => {
    if (updateAvailable) {
      setIsVisible(true);
      setCountdown(COUNTDOWN_SECONDS);
    } else {
      setIsVisible(false);
    }
  }, [updateAvailable]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Update localStorage with the new deployment timestamp before reloading
          if (currentDeployment?.created_date) {
            localStorage.setItem(DEPLOYMENT_TIMESTAMP_KEY, currentDeployment.created_date);
          }
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, currentDeployment]);

  const handleDismiss = () => {
    // Update localStorage when dismissing so notification doesn't show again
    if (currentDeployment?.created_date) {
      localStorage.setItem(DEPLOYMENT_TIMESTAMP_KEY, currentDeployment.created_date);
    }
    setIsVisible(false);
    dispatch(setUpdateAvailable(false));
  };

  const handleReload = () => {
    // Update localStorage with the new deployment timestamp before reloading
    if (currentDeployment?.created_date) {
      localStorage.setItem(DEPLOYMENT_TIMESTAMP_KEY, currentDeployment.created_date);
    }
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <S.Container>
      <S.Content>
        <S.MessageContainer>
          <S.InfoIcon icon={mdiInformationOutline} />
          <S.Message>
            New version available! Refreshing in <S.Countdown>{countdown}</S.Countdown> seconds...
          </S.Message>
        </S.MessageContainer>
        <S.ButtonGroup>
          <S.Button onClick={handleReload}>Refresh Now</S.Button>
          <S.DismissButton onClick={handleDismiss}>Dismiss</S.DismissButton>
        </S.ButtonGroup>
      </S.Content>
    </S.Container>
  );
};

export default DeploymentNotification;
