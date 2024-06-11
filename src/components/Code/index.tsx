import {SFC} from 'types';

import * as S from './Styles';

export interface CodeProps {
  data: any;
}

const Code: SFC<CodeProps> = ({data}) => {
  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      // Recursively render nested objects
      return <Code data={value} />;
    }
    return <span>{String(value)}</span>;
  };

  return (
    <S.Container>
      {'{'}
      {Object.entries(data).map(([key, value], index) => (
        <S.Obj key={index}>
          {'\t'}
          {`"${key}": `}
          {renderValue(value)}
        </S.Obj>
      ))}
      {'}'}
    </S.Container>
  );
};

export default Code;
