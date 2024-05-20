import {useDispatch, useSelector} from 'react-redux';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';
import Line from 'components/Line';
import CoreLogo from 'components/CoreLogo';
import DropdownMenu from 'components/DropdownMenu';
import {deleteCore} from 'dispatchers/cores';
import {useToggle} from 'hooks';
import CoreModal from 'modals/CoreModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Core, SFC} from 'types';
import * as S from './Styles';

export interface CoreDetailProps {
  core: Core;
}

const CoreDetail: SFC<CoreDetailProps> = ({className, core}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleDelete = async () => {
    await dispatch(deleteCore(core.id));
  };

  const menuOptions = [
    {
      label: 'Edit',
      menuIcon: mdiSquareEditOutline,
      onClick: toggleCoreModal,
    },
    {
      label: 'Delete',
      menuIcon: mdiDeleteOutline,
      onClick: handleDelete,
    },
  ];

  const renderDropdownMenu = () => {
    if (core.owner !== self.id) return null;
    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };
  return (
    <>
      <S.Container className={className}>
        <S.Box>
          <S.BoxLeft>
            <CoreLogo logo={core.logo} />
            <S.Text>
              <S.Ticker>{core.ticker}</S.Ticker>
            </S.Text>
          </S.BoxLeft>
          {renderDropdownMenu()}
        </S.Box>
        <Line />
        <S.Domain>{core.domain}</S.Domain>
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} core={core} /> : null}
    </>
  );
};

export default CoreDetail;
