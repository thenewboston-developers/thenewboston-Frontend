import {useDispatch} from 'react-redux';

import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

export interface SelectAssetPairModalProps {
  close(): void;
}

const SelectAssetPairModal: SFC<SelectAssetPairModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  console.log(dispatch);

  return (
    <S.Modal className={className} close={close} header="Select Asset Pair">
      <h1>hey</h1>
    </S.Modal>
  );
};

export default SelectAssetPairModal;
