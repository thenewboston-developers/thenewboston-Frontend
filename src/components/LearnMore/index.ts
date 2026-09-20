import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding, radii} from 'styles';

export const Bold = styled.strong`
  font-weight: ${fonts.weight.semiBold};
`;

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

export const Content = styled.div`
  max-width: 760px;
  min-width: 0;
  width: 100%;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.borderSubtle};
  margin: 32px 0;
`;

export const Image = styled.img`
  border-radius: 12px;
  display: block;
  height: auto;
  margin: 24px auto;
  max-height: 640px;
  max-width: min(640px, 100%);
  object-fit: contain;
  width: auto;
`;

export const ImagePlaceholder = styled.div`
  align-items: center;
  background-color: ${colors.palette.gray[100]};
  border: 1px dashed ${colors.palette.gray[400]};
  border-radius: ${radii.large};
  color: ${colors.secondary};
  display: flex;
  font-size: 14px;
  font-style: italic;
  font-weight: ${fonts.weight.medium};
  justify-content: center;
  margin: 24px 0;
  min-height: 200px;
  padding: 24px;
  text-align: center;
`;

export const Introduction = styled.p`
  color: ${colors.secondary};
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 32px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }
`;

export const List = styled.ul`
  list-style: disc;
  margin-bottom: 16px;
  margin-left: 24px;
  margin-top: 0;
  padding-left: 0;
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

export const Paragraph = styled.p`
  color: ${colors.primary};
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const Section = styled.section`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const Step = styled.div`
  background-color: ${colors.palette.gray[50]};
  border-left: 4px solid ${colors.palette.blue[500]};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 20px;
`;

export const StepList = styled(List)`
  margin-bottom: 0;
  margin-top: 8px;
`;

export const StepNumber = styled.span`
  background-color: ${colors.palette.blue[500]};
  border-radius: 50%;
  color: ${colors.white};
  display: inline-block;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  height: 28px;
  line-height: 28px;
  margin-right: 12px;
  text-align: center;
  width: 28px;
`;

export const StepParagraph = styled(Paragraph)`
  margin-bottom: 0;
  margin-top: 12px;
`;

export const StepTitle = styled.h3`
  color: ${colors.primary};
  display: inline;
  font-size: 17px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
`;

export const SubSection = styled.div`
  margin-bottom: 24px;
`;

export const SubSectionTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 26px;
  }
`;
