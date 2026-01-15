import {useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {SFC} from 'types';

import * as S from './Styles';

const NAV_ITEMS = [
  {label: 'Lobby', path: '/connect-five/home'},
  {label: 'Leaderboard', path: '/connect-five/leaderboard'},
];

const ConnectFiveNavigation: SFC = ({className}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  const renderTabs = () => {
    return (
      <Tabs stackOnMobile>
        {NAV_ITEMS.map((item) => (
          <Tab
            isActive={location.pathname.startsWith(item.path)}
            key={item.path}
            onClick={() => handleTabClick(item.path)}
          >
            {item.label}
          </Tab>
        ))}
      </Tabs>
    );
  };

  return <S.Container className={className}>{renderTabs()}</S.Container>;
};

export default ConnectFiveNavigation;
