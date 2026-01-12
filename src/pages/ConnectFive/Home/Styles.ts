import Icon from '@mdi/react';
import styled from 'styled-components';

import UPagination from 'components/Pagination';
import {colors, fonts, hiddenScroll, pagePadding} from 'styles';

export const ChallengeActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ChallengeCard = styled.div`
  align-items: stretch;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const ChallengeHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`;

export const ChallengeInfo = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  width: 100%;
`;

export const ChallengeInfoLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  text-transform: uppercase;
`;

export const ChallengeInfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ChallengeInfoValue = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.medium};
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

export const GamesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MatchCard = styled.button`
  align-items: stretch;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  gap: 16px;
  outline: none;
  padding: 16px;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${colors.whiteHover};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    box-shadow:
      0 0 0 2px ${colors.palette.blue[200]},
      0 1px 3px rgba(0, 0, 0, 0.08);
  }
`;

export const MatchHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`;

export const MatchHeaderMain = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const MatchIcon = styled(Icon)`
  color: ${colors.palette.gray[500]};
  flex-shrink: 0;
`;

export const MatchInfo = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  width: 100%;
`;

export const MatchInfoLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  text-transform: uppercase;
`;

export const MatchInfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const MatchInfoValue = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.medium};
`;

export const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Pagination = styled(UPagination)`
  align-self: center;
  margin-top: 12px;
`;

export const Section = styled.section`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 18px;
  margin: 0 0 16px;
`;

export const SubmitRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
