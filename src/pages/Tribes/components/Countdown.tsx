import * as S from '../Styles';

const pad = (value: number) => String(value).padStart(2, '0');

const Countdown = ({now, target}: {now: number; target: number}) => {
  const total = Math.max(0, Math.floor((target - now) / 1000));
  const parts: [string, number][] = [
    ['Days', Math.floor(total / 86400)],
    ['Hours', Math.floor((total % 86400) / 3600)],
    ['Min', Math.floor((total % 3600) / 60)],
    ['Sec', total % 60],
  ];
  return (
    <S.Countdown
      aria-label={`${parts[0][1]} days, ${parts[1][1]} hours and ${parts[2][1]} minutes remaining`}
      role="timer"
    >
      {parts.map(([unit, value]) => (
        <S.CountdownUnit aria-hidden key={unit}>
          <S.CountdownValue>
            <span key={value}>{pad(value)}</span>
          </S.CountdownValue>
          <S.CountdownLabel>{unit}</S.CountdownLabel>
        </S.CountdownUnit>
      ))}
    </S.Countdown>
  );
};

export default Countdown;
