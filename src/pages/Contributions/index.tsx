import SectionHeading from 'components/SectionHeading';
import {SFC} from 'types';
import * as S from './Styles';

const Contributions: SFC = ({className}) => {
  const renderTable = () => {
    return (
      <S.Table>
        <thead>
          <S.Tr>
            <th>Date</th>
            <th>User</th>
            <th>GitHub User</th>
            <th>Repo</th>
            <th>Issue</th>
            <th>PR</th>
            <th>Reward Amount</th>
          </S.Tr>
        </thead>
        <tbody>
          {[1, 2].map((number) => (
            <S.Tr key={number}>
              <S.Td>November 12, 2023 at 3:00:06 PM EST</S.Td>
              <S.Td>BUCKY</S.Td>
              <S.Td>buckyroberts</S.Td>
              <S.Td>TNB-BACKEND</S.Td>
              <S.Td>ISSUE 1</S.Td>
              <S.Td>PR 2</S.Td>
              <S.Td>2,600 TNB</S.Td>
            </S.Tr>
          ))}
        </tbody>
      </S.Table>
    );
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="Contributions" />
      {renderTable()}
    </S.Container>
  );
};

export default Contributions;
