import Button from 'components/Button';
import CoreModal from 'modals/CoreModal';
import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import {useToggle} from 'hooks';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);

  const renderButton = () => {
    return <Button onClick={toggleCoreModal} text="Add Currency" />;
  };
  return (
    <>
      <S.Container className={className}>
        <S.Center>
          <ToolbarMenuLink text="Home" to="/currencies/home" />
          <ToolbarMenuLink text="Learn More" to="/currencies/learn-more" />
        </S.Center>
        <S.ButtonContainer>{renderButton()}</S.ButtonContainer>
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} /> : null}
    </>
  );
};

export default Toolbar;
