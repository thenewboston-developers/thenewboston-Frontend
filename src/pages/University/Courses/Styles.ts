import styled from 'styled-components';
import _Icon from '@mdi/react';

import USectionHeading from 'components/SectionHeading';
import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const CoursesContainer = styled.div`
  padding: 24px 20px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 60px;

  @media (min-width: ${breakpoints.mini}) {
    margin-top: 32px;
  }
`;

export const Icon = styled(_Icon)`
  left: 20px;
  position: absolute;
  top: 9px;
`;

export const Input = styled.input`
  border-radius: 14px;
  border: none;
  box-shadow: 0 2px 2px rgba(211, 211, 211, 0.25);
  padding: 10px 14px;
  position: relative;

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

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 20px;
`;

export const SectionSubHeading = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    font-weight: ${fonts.weight.semiBold};
  }
`;
