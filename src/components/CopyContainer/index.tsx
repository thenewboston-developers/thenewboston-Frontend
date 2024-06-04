import {mdiContentCopy} from '@mdi/js';
import Icon from '@mdi/react';
import link from 'assets/link.svg';
import {useResizeObserver} from 'hooks';
import {ToastType} from 'enums';
import {SFC} from 'types';
import {displayToast} from 'utils/toasts';
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
        <img alt="link" src={link} />
        {isMobileDevice ? `${text.slice(0, 40)}...` : text}
      </S.Text>
      <S.Button text={text} onCopy={handleCopy}>
        <S.CopyText>{isMobileDevice ? <Icon path={mdiContentCopy} size={1} /> : 'Copy'}</S.CopyText>
      </S.Button>
    </S.Container>
  );
};

export default CopyContainer;
