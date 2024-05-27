import {SFC} from 'types';
import Overview from './Overview';
import QA from './QA';
import * as S from './Styles';
const LearnMore: SFC = ({className}) => {
  const renderPageContent = () => {
    return (
      <>
        <S.Grid>
          <Overview />
          <QA />
        </S.Grid>
      </>
    );
  };
  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};
export default LearnMore;
