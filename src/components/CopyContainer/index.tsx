import Icon from '@mdi/react';
import {mdiContentCopy, mdiLink} from '@mdi/js';

import {SFC} from 'types';
import {ToastType} from 'enums';
import {displayToast} from 'utils/toasts';
import {useResizeObserver} from 'hooks';
import {breakpoints} from 'styles';

import * as S from './Styles';

export interface CopyContainerProps {
  text: string;
}

const CopyContainer: SFC<CopyContainerProps> = ({className, text}) => {
  const isMobileDevice = useResizeObserver(breakpoints.mini);
  const handleCopy = (): void => {
    displayToast('Copied to the clipboard', ToastType.SUCCESS);
  };

  return (
    <S.Container className={className}>
      <S.Text>
        <Icon path={mdiLink} size={1} />
        {isMobileDevice ? `${text.slice(0, 40)}...` : text}
      </S.Text>
      <S.Button text={text} onCopy={handleCopy}>
        <S.CopyText>{isMobileDevice ? <Icon path={mdiContentCopy} size={1} /> : 'Copy'}</S.CopyText>
      </S.Button>
    </S.Container>
  );
};

export default CopyContainer;
