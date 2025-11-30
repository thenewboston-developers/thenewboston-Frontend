import * as S from 'components/LearnMore';
import {SFC} from 'types';

import bonsai1 from './assets/bonsai-1.jpg';
import bonsai2 from './assets/bonsai-2.jpg';
import bonsai3 from './assets/bonsai-3.jpg';
import {BonsaiImage} from './Styles';

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
            tree available here comes directly from Bucky's personal collection and can be purchased using digital
            currency. Years of patience. Early mornings. Late nights. Quiet moments spent shaping something that refuses
            to be rushed. These are not just trees. They are living stories.
          </S.Paragraph>
          <S.Paragraph>And our story is just getting started.</S.Paragraph>
          <BonsaiImage alt="Bonsai caretaker preparing a specimen for display" src={bonsai1} />
          <S.Paragraph>
            Bucky's quest is simple and impossible at the same time. He is searching for the most beautiful bonsai in
            the world. Some believe it's only a myth, a story whispered among growers. Others say the perfect bonsai is
            out there waiting. Only time will tell.
          </S.Paragraph>
          <BonsaiImage alt="Photographing bonsai under studio lights" src={bonsai2} />
          <S.Paragraph>
            All bonsai sales are pickup only, and the trees are located in NYC. Anyone interested or with questions can
            reach out to him on Discord.
          </S.Paragraph>
          <S.Paragraph>
            Bucky continues to expand his collection and will share new updates, photos, and progress in the feed as
            things grow.
          </S.Paragraph>
          <BonsaiImage alt="Bonsai being showcased in a digital gallery" src={bonsai3} />
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default BonsaiLearnMore;
