import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import {Currency, SFC, Whitepaper} from 'types';
import {renderMarkdown} from 'utils/markdown';

import * as S from './Styles';

interface WhitepaperSectionProps {
  currency: Currency;
  whitepaper: Whitepaper | null;
}

const WhitepaperSection: SFC<WhitepaperSectionProps> = ({className, whitepaper}) => {
  if (!whitepaper) {
    return (
      <S.Container className={className}>
        <EmptyPage
          bottomText="No whitepaper has been created yet"
          graphic={LeavesEmptyState}
          topText="No whitepaper available"
        />
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.MarkdownContainer dangerouslySetInnerHTML={{__html: renderMarkdown(whitepaper.content)}} />
    </S.Container>
  );
};

export default WhitepaperSection;
