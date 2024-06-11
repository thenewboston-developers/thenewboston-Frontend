import {SFC} from 'types';

import * as S from './Styles';

export interface LearnMoreListProps {
  list: any[]; // TODO (muhammad) LOW: Define type for this list instead of 'any'
}

const LearnMoreList: SFC<LearnMoreListProps> = ({className, list}) => {
  return (
    <S.ListContainer className={className}>
      <S.DottedLine />
      {list.map((item, index) => (
        <S.ListItem key={index}>
          <S.ListItemNumber>{index + 1}</S.ListItemNumber>
          <S.ListLine>
            <S.ListTitle>{item[0]}</S.ListTitle>
            <S.ListDetail>{item[1]}</S.ListDetail>
          </S.ListLine>
        </S.ListItem>
      ))}
    </S.ListContainer>
  );
};

export default LearnMoreList;
