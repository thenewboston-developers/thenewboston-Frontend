import styled from 'styled-components';

import {fonts} from 'styles';

import {table, tablePanel} from '../theme';

export const Columns = styled.div`
  display: grid;
  gap: 22px 34px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 18px;

  h3 {
    color: ${table.goldLight};
    font-size: 15px;
    font-weight: ${fonts.weight.bold};
    margin: 0 0 8px;
  }

  li {
    margin-bottom: 4px;
  }

  ol,
  ul {
    margin: 0 0 10px;
    padding-left: 20px;
  }

  p {
    margin: 0 0 10px;
  }

  @media (max-width: 1040px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Rules = styled.section`
  ${tablePanel};
  color: ${table.mist};
  font-size: 13.5px;
  line-height: 1.7;
  margin-top: 24px;
  padding: 24px 28px 18px;
  scroll-margin-top: 20px;

  &:focus-visible {
    outline: 2px solid ${table.goldLight};
    outline-offset: 4px;
  }

  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 20px 18px 12px;
  }
`;
