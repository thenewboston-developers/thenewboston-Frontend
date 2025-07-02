import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';
import {CalloutType} from './types';

export interface CalloutProps {
  children: ReactNode;
  type?: CalloutType;
}

const Callout: SFC<CalloutProps> = ({children, className, type = CalloutType.INFO}) => {
  return (
    <S.Container $type={type} className={className}>
      {children}
    </S.Container>
  );
};

export default Callout;
export {CalloutType} from './types';
