import CopyToClipboard from 'react-copy-to-clipboard';

import {ToastType} from 'enums';
import {SFC} from 'types';
import {displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface CopyContainerProps {
  text: string;
}

const CopyContainer: SFC<CopyContainerProps> = ({className, text}) => {
  const handleCopy = (): void => {
    displayToast('Copied to the clipboard', ToastType.SUCCESS);
  };

  return (
    <S.Container className={className}>
      <S.Text>{text}</S.Text>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <S.CopyText>Copy</S.CopyText>
      </CopyToClipboard>
    </S.Container>
  );
};

export default CopyContainer;
