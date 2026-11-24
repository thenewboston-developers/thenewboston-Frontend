import {ComputerReward} from 'types/gameFund';

import * as S from './Styles';

const ComputerRewardNotice = ({reward}: {reward?: ComputerReward | null}) => {
  if (!reward) return null;
  if (reward.status === 'paid')
    return (
      <S.Notice $paid role="status">
        <strong>+{reward.amount.toLocaleString()} TNB game reward</strong>
        <span>Paid to your wallet from the community game fund.</span>
      </S.Notice>
    );
  if (reward.status === 'fund_empty')
    return (
      <S.Notice role="status">
        <strong>No reward was available when this match ended.</strong>
        <span>Computer games remain free. Future wins can earn rewards when the fund is replenished.</span>
      </S.Notice>
    );
  return (
    <S.Notice role="status">
      <span>This result did not qualify for a computer-win reward.</span>
    </S.Notice>
  );
};

export default ComputerRewardNotice;
