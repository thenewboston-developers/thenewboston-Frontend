import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding-bottom: 48px;
  padding-top: 48px;
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.2;
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
  }
`;

export const Introduction = styled.p`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 24px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const SubSection = styled.div`
  margin-bottom: 24px;
`;

export const SubSectionTitle = styled.h3`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.4;
  margin-bottom: 12px;
`;

export const Paragraph = styled.p`
  color: ${colors.primary};
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const List = styled.ul`
  list-style: disc;
  margin-bottom: 16px;
  margin-left: 24px;
`;

export const NestedList = styled(List)`
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const ListItem = styled.li`
  color: ${colors.primary};
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Bold = styled.strong`
  font-weight: ${fonts.weight.semiBold};
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${colors.border};
  margin: 40px 0;
`;

export const Footer = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  font-style: italic;
  line-height: 1.6;
  text-align: center;
`;
