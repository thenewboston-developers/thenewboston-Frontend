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
        <S.EmptyPanel>
          <EmptyPage
            bottomText="No whitepaper has been created yet"
            graphic={LeavesEmptyState}
            topText="No whitepaper available"
          />
        </S.EmptyPanel>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.Panel>
        <S.MarkdownContainer>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{whitepaper.content}</ReactMarkdown>
        </S.MarkdownContainer>
      </S.Panel>
    </S.Container>
  );
};

export default WhitepaperSection;
