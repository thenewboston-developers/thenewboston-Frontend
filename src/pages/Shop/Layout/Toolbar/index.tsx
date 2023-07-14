import {SFC} from 'types';
import * as S from './Styles';

export interface ToolbarProps {
  toolbarType: string;
}

const Toolbar: SFC<ToolbarProps> = ({className, toolbarType}) => {
  return (
    <S.Container className={className}>
      <span>{toolbarType}</span> Toolbar
    </S.Container>
  );
};

export default Toolbar;
