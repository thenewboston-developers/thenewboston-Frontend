import {Navigate, Route, Routes} from 'react-router-dom';

import {
  PATH_ART,
  PATH_CONTRIBUTIONS,
  PATH_CONTRIBUTIONS_SELF,
  PATH_COURSES,
  PATH_COURSES_SELF,
  PATH_CURRENCIES,
  PATH_DEFAULT,
  PATH_EXCHANGE,
  PATH_FEED,
  PATH_IA,
  PATH_LECTURES,
  PATH_LECTURES_SELF,
  PATH_NOTIFICATIONS,
  PATH_PROFILE,
  PATH_SHOP,
  PATH_WALLETS,
} from 'constants/paths';
import Art from 'pages/Art';
import Contributions from 'pages/Contributions';
import Cores from 'pages/Cores';
import Courses from 'pages/University/Courses';
import Exchange from 'pages/Exchange';
import Feed from 'pages/Feed';
import Ia from 'pages/Ia';
import Lectures from 'pages/University/Lectures';
import Notifications from 'pages/Notifications';
import Profile from 'pages/Profile';
import Shop from 'pages/Shop';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="*" element={<Navigate to={PATH_DEFAULT} replace />} />
        <Route path={PATH_ART} element={<Art />} />
        <Route path={PATH_CONTRIBUTIONS_SELF} element={<Contributions selfContributions={true} />} />
        <Route path={PATH_CONTRIBUTIONS} element={<Contributions />} />
        <Route path={PATH_COURSES_SELF} element={<Courses selfCourses={true} />} />
        <Route path={PATH_COURSES} element={<Courses />} />
        <Route path={PATH_CURRENCIES} element={<Cores />} />
        <Route path={PATH_EXCHANGE} element={<Exchange />} />
        <Route path={PATH_FEED} element={<Feed />} />
        <Route path={PATH_IA} element={<Ia />} />
        <Route path={PATH_LECTURES_SELF} element={<Lectures selfLectures={true} />} />
        <Route path={PATH_LECTURES} element={<Lectures />} />
        <Route path={PATH_NOTIFICATIONS} element={<Notifications />} />
        <Route path={PATH_PROFILE} element={<Profile />} />
        <Route path={PATH_SHOP} element={<Shop />} />
        <Route path={PATH_WALLETS} element={<Wallets />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
