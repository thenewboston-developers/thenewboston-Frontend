import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import SectionHeading from 'components/SectionHeading';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {getContributions} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {longDate} from 'utils/dates';
import * as S from './Styles';

const Contributions: SFC = ({className}) => {
  const contributions = useSelector(getContributions);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      await dispatch(_getContributions());
    })();
  }, [dispatch]);

  const contributionList = useMemo(() => {
    return orderBy(Object.values(contributions), ['created_date'], ['desc']);
  }, [contributions]);

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
          {contributionList.map((contribution) => (
            <S.Tr key={contribution.id}>
              <S.Td>{longDate(contribution.created_date)}</S.Td>
              <S.Td>{contribution.user.username}</S.Td>
              <S.Td>{contribution.github_user.github_username}</S.Td>
              <S.Td>{contribution.repo.name}</S.Td>
              <S.Td>{contribution.issue?.title}</S.Td>
              <S.Td>{contribution.pull?.title}</S.Td>
              <S.Td>
                {contribution.reward_amount} {contribution.core.ticker}
              </S.Td>
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
