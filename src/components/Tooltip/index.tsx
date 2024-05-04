import {ReactNode, useState} from 'react';

import {SFC} from 'types';
import * as S from './Styles';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: SFC<TooltipProps> = ({children, text}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <S.TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <S.TooltipBox $isVisible={isVisible}>
        {text}
        <S.Arrow />
      </S.TooltipBox>
    </S.TooltipContainer>
  );
};

export default Tooltip;
