import React from 'react';
import * as S from './Styles';

interface NotificationDotProps {
  children: React.ReactNode;
  showDot: boolean;
  dotColor?: string;
}

const NotificationDot: React.FC<NotificationDotProps> = ({children, showDot, dotColor = 'red'}) => {
  return (
    <S.Container>
      {children}
      {showDot && <S.Dot $color={dotColor} />}
    </S.Container>
  );
};

export default NotificationDot;
