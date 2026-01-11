import styled from 'styled-components';

import {colors, fonts, hiddenScroll, pagePadding} from 'styles';

export const ChallengeActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const ChallengeCard = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  padding: 16px;
`;

export const ChallengeDetails = styled.div`
  color: ${colors.secondary};
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ChallengeHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ChallengeStatus = styled.span`
  color: ${colors.palette.blue[600]};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  text-transform: uppercase;
`;

export const ChallengeTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  margin: 0;
`;

export const Container = styled.div`
  ${pagePadding};
  ${hiddenScroll};
  height: 100%;
  overflow-y: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 960px;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const MatchActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const MatchCard = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  padding: 16px;
`;

export const MatchDetails = styled.div`
  color: ${colors.secondary};
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const MatchHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const MatchStatus = styled.span`
  color: ${colors.palette.green[600]};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  text-transform: uppercase;
`;

export const MatchTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  margin: 0;
`;

export const Section = styled.section`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 18px;
  margin: 0 0 16px;
`;

export const Subtitle = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  margin: 8px 0 0;
`;

export const SubmitRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
