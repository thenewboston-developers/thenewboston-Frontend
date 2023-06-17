import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import CoreLabel from 'components/CoreLabel';
import DropdownMenu from 'components/DropdownMenu';
import {deleteCore} from 'dispatchers/cores';
import {useToggle} from 'hooks';
import CoreModal from 'modals/CoreModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Core, SFC} from 'types';
import * as S from './Styles';

export interface CoreCardProps {
  core: Core;
}

const CoreCard: SFC<CoreCardProps> = ({className, core}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleDelete = async () => {
    await dispatch(deleteCore(core.id));
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: toggleCoreModal,
    },
    {
      label: 'Delete',
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
        <CoreLabel domain={core.domain} logo={core.logo} ticker={core.ticker} />
        {renderDropdownMenu()}
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} core={core} /> : null}
    </>
  );
};

export default CoreCard;
