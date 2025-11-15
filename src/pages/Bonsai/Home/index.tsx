import SectionHeading from 'components/SectionHeading';
import {SFC} from 'types';

import {bonsaiTrees} from '../data';

import * as S from './Styles';

const BonsaiHome: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SectionHeading heading="Bonsai" />
      <S.CardGrid>
        {bonsaiTrees.map((tree) => (
          <S.Card key={tree.id} to={`/bonsai/${tree.id}`}>
            <S.CardImage alt={tree.name} src={tree.images[0]} />
            <S.CardBody>
              <S.CardTitle>{tree.name}</S.CardTitle>
              <S.CardMeta>{tree.species}</S.CardMeta>
              <S.CardTeaser>{tree.teaser}</S.CardTeaser>
            </S.CardBody>
          </S.Card>
        ))}
      </S.CardGrid>
    </S.Container>
  );
};

export default BonsaiHome;
