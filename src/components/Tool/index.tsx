import {GenericVoidFunction, SFC} from 'types';
import * as S from './Styles';

export interface ToolsProps {
  icon: string;
  onClick: GenericVoidFunction;
}

const Tool: SFC<ToolsProps> = ({className, icon, onClick}) => {
  return <S.Container className={className} icon={icon} onClick={onClick} size={20} totalSize="unset" />;
};

export default Tool;
