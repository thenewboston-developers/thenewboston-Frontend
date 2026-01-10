import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';
import {SFC} from 'types';

import {bonsaiLearnMoreChapters} from '../chapters';

const ChapterCard = styled(Link)`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  color: ${colors.primary};
  display: block;
  padding: 24px;
  text-decoration: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${colors.palette.blue[300]};
    box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
    text-decoration: none;
  }
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChapterNumber = styled.span`
  color: ${colors.palette.blue[500]};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  text-transform: uppercase;
`;

const ChapterTitle = styled.h2`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  margin-top: 4px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  padding: 32px 24px;
`;

const Subtitle = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  color: ${colors.primary};
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
  margin-bottom: 8px;
`;

const BonsaiLearnMoreHome: SFC = ({className}) => {
  return (
    <Container className={className}>
      <Title>Learn More</Title>
      <Subtitle>Explore the chapters below to learn about growing bonsai from seed.</Subtitle>
      <ChapterList>
        {bonsaiLearnMoreChapters.map(({path, title}, index) => {
          const chapterNumber = index + 1;
          const titleWithoutPrefix = title.replace(/^Chapter \d+:\s*/, '');

          return (
            <ChapterCard key={path} to={path}>
              <ChapterNumber>Chapter {chapterNumber}</ChapterNumber>
              <ChapterTitle>{titleWithoutPrefix}</ChapterTitle>
            </ChapterCard>
          );
        })}
      </ChapterList>
    </Container>
  );
};

export default BonsaiLearnMoreHome;
