import CoreLogo from 'components/CoreLogo';
import {AppDispatch, Core, SFC} from 'types';
import * as S from './Styles';
import Line from 'components/Line';
import {useToggle} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import {getSelf} from 'selectors/state';
import {deleteCore} from 'dispatchers/cores';
import DropdownMenu from 'components/DropdownMenu';
import CoreModal from 'modals/CoreModal';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';

export interface CoreLabelProps {
  domain: string;
  logo: string | null;
  ticker: string;
  core: Core;
}

const CoreLabel: SFC<CoreLabelProps> = ({className, domain, logo, ticker, core}) => {
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
            <CoreLogo logo={logo} />
            <S.Text>
              <S.Ticker>{ticker}</S.Ticker>
            </S.Text>
          </S.BoxLeft>
          {renderDropdownMenu()}
        </S.Box>
        <Line />
        <S.Domain>{domain}</S.Domain>
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} core={core} /> : null}
    </>
  );
};

export default CoreLabel;
