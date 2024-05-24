import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin-top: 16px;
  max-width: 100%;
  overflow-x: auto;
  padding: 20px;
  width: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead,
  tbody {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  th,
  td {
    padding: 2px 0;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid ${colors.border};
  }

  tbody {
    display: block;
    width: 100%;
  }
`;

export const Tbody = styled.tbody`
  .fixed-width {
    color: ${colors.gray};
    width: 5%;
  }
  & > tr {
    border-collapse: collapse;
    display: table;
    table-layout: fixed;
    width: 100%;
  }
  & > tr > td {
    font-weight: 600;
    padding: 10px 0;
  }
`;

export const Thead = styled.thead`
  .fixed-width {
    width: 5%;
  }
  & > tr > th {
    color: ${colors.gray};
    padding-bottom: 12px;
    text-transform: uppercase;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding-bottom: 15px;
  width: 100%;
`;

export const Heading = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;

export const Div = styled.div`
  min-width: 600px;
`;
