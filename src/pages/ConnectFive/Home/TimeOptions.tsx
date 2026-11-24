import {Field} from 'formik';

import * as S from './Styles';

const TIME_LIMITS = [
  {label: '5 min', value: '300'},
  {label: '10 min', value: '600'},
  {label: '15 min', value: '900'},
  {label: '30 min', value: '1800'},
];

// The clock of each player for the whole match, as a segmented control bound to the timeLimitSeconds field of the
// surrounding Formik form
const TimeOptions = ({idPrefix}: {idPrefix: string}) => (
  <S.Fieldset>
    <S.Legend>Time per player</S.Legend>
    <S.Segmented>
      {TIME_LIMITS.map(({label, value}) => (
        <S.Segment key={value}>
          <Field id={`${idPrefix}-time-${value}`} name="timeLimitSeconds" type="radio" value={value} />
          <span>{label}</span>
        </S.Segment>
      ))}
    </S.Segmented>
  </S.Fieldset>
);

export default TimeOptions;
