import {Link} from 'react-router-dom';
import {mdiArrowLeft, mdiArrowRight} from '@mdi/js';
import styled from 'styled-components';

import Icon from 'components/Icon';
import {colors, fonts} from 'styles';
import {SFC} from 'types';

import {bonsaiLearnMoreChapters} from '../chapters';

interface ChapterNavigationProps {
  currentPath: string;
}

const Container = styled.nav`
  border-top: 1px solid ${colors.border};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 32px;
`;

const NavButton = styled(Link)`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.primary};
  display: flex;
  flex: 1;
  gap: 12px;
  max-width: 280px;
  padding: 16px;
  text-decoration: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${colors.palette.blue[300]};
    box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
    text-decoration: none;
  }
`;

const PrevButton = styled(NavButton)`
  margin-right: auto;
`;

const NextButton = styled(NavButton)`
  flex-direction: row-reverse;
  margin-left: auto;
  text-align: right;
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

const NavLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  text-transform: uppercase;
`;

const NavTitle = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Placeholder = styled.div`
  flex: 1;
  max-width: 280px;
`;

const ChapterNavigation: SFC<ChapterNavigationProps> = ({className, currentPath}) => {
  const currentIndex = bonsaiLearnMoreChapters.findIndex((chapter) => chapter.path === currentPath);
  const prevChapter = currentIndex > 0 ? bonsaiLearnMoreChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < bonsaiLearnMoreChapters.length - 1 ? bonsaiLearnMoreChapters[currentIndex + 1] : null;

  const getChapterTitle = (title: string) => title.replace(/^Chapter \d+:\s*/, '');

  return (
    <Container className={className}>
      {prevChapter ? (
        <PrevButton to={`/bonsai/learn-more/${prevChapter.path}`}>
          <Icon icon={mdiArrowLeft} size={20} />
          <NavContent>
            <NavLabel>Previous</NavLabel>
            <NavTitle>{getChapterTitle(prevChapter.title)}</NavTitle>
          </NavContent>
        </PrevButton>
      ) : (
        <Placeholder />
      )}
      {nextChapter ? (
        <NextButton to={`/bonsai/learn-more/${nextChapter.path}`}>
          <Icon icon={mdiArrowRight} size={20} />
          <NavContent>
            <NavLabel>Next</NavLabel>
            <NavTitle>{getChapterTitle(nextChapter.title)}</NavTitle>
          </NavContent>
        </NextButton>
      ) : (
        <Placeholder />
      )}
    </Container>
  );
};

export default ChapterNavigation;
