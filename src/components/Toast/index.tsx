import {ReactNode, useCallback} from 'react';
import {mdiAlertCircleOutline, mdiCheckCircle} from '@mdi/js';
import {ToastType} from 'enums';
import {SFC} from 'types';

import * as S from './Styles';

export interface ToastProps {
  children: ReactNode;
  type: ToastType;
}

const Toast: SFC<ToastProps> = ({children, className, type = ToastType.ERROR}) => {
  const renderIcon = useCallback((): ReactNode => {
    switch (type) {
      case ToastType.SUCCESS:
        return <S.CheckCircleIcon icon={mdiCheckCircle} />;
      default:
        return <S.AlertCircleOutlineIcon icon={mdiAlertCircleOutline} />;
    }
  }, [type]);

  return (
    <S.Container className={className} type={type}>
      {renderIcon()}
      <S.Text>{children}</S.Text>
    </S.Container>
  );
};

export default Toast;
