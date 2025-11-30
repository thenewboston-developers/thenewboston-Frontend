import * as S from 'components/LearnMore';
import {SFC} from 'types';

import bonsai1 from './assets/bonsai-1.jpg';
import bonsai2 from './assets/bonsai-2.jpg';
import bonsai3 from './assets/bonsai-3.jpg';

const BonsaiLearnMore: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Content>
        <S.Title>Explore the Bonsai Collection</S.Title>

        <S.Paragraph>
          Is Bucky Roberts the greatest bonsai artist to ever live? Some might say so. His grandmas certainly would.
        </S.Paragraph>

        <S.Section>
          <S.Paragraph>
            This bonsai collection brings together a real, living artform with digital currency on thenewboston. Every
            tree available here can be purchased using digital currency and comes directly from Bucky's personal
            collection.
          </S.Paragraph>
          <S.Image alt="Bonsai caretaker preparing a specimen for display" src={bonsai1} />
          <S.Paragraph>
            Bonsai are the only living, growing artform in the world. They develop character over time, change with the
            seasons, and cannot be counterfeited. Buying a bonsai with digital currency means you're getting a genuine,
            one-of-a-kind piece of living art.
          </S.Paragraph>
          <S.Image alt="Photographing bonsai under studio lights" src={bonsai2} />
          <S.Paragraph>
            All bonsai sales are pickup only, and Bucky is located in NYC. Anyone interested or with questions can reach
            out to him on Discord.
          </S.Paragraph>
          <S.Paragraph>
            Bucky continues to expand his collection and will share new updates, photos, and progress in the feed as
            things grow.
          </S.Paragraph>
          <S.Image alt="Bonsai being showcased in a digital gallery" src={bonsai3} />
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMore;
