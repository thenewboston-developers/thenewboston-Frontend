import styled from 'styled-components';
import USectionHeading from 'components/SectionHeading';
import {breakpoints, colors, fonts} from 'styles';
import _Icon from '@mdi/react';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const CoursesContainer = styled.div`
  padding: 24px 20px;
`;

export const ContentContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${breakpoints.mini}) {
    margin-top: 32px;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: ${fonts.weight.semiBold};
    font-size: 22px;
    line-height: 32px;
    text-align: center;
  }

  @media (min-width: ${breakpoints.mini}) {
    gap: 8px;
    align-items: center;
    h2 {
      text-align: start;
    }
  }

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  padding-left: 10px;
  position: relative;

  @media (min-width: ${breakpoints.mini}) {
    margin-left: -10px;
    width: 60%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    margin-left: 0;
    width: fit-content;
  }
`;

export const Input = styled.input`
  padding: 10px 14px;
  padding-left: 2rem;
  border-radius: 14px;
  border: none;
  position: relative;
  box-shadow: 0 2px 2px rgba(211, 211, 211, 0.25);

  &::placeholder {
    position: absolute;
    left: 2rem;
    top: 10px;
    color: ${colors.gray};
  }

  @media (min-width: ${breakpoints.mini}) {
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    width: fit-content;
  }
`;

export const Icon = styled(_Icon)`
  position: absolute;
  left: 20px;
  top: 9px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  @media (min-width: ${breakpoints.mobile}) {
    justify-content: space-around;
  }
`;

export const Col = styled.div`
  width: 270px;
  border-radius: 14px;

  @media (min-width: ${breakpoints.tablet}) {
    width: 373px;
  }
`;
