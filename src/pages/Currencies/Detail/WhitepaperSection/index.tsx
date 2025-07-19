import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import {Currency, SFC, Whitepaper} from 'types';

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
      <S.MarkdownContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{whitepaper.content}</ReactMarkdown>
      </S.MarkdownContainer>
    </S.Container>
  );
};

export default WhitepaperSection;
