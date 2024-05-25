import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';
import Button from 'components/Button';
import {useToggle} from 'hooks';

const Toolbar: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);

  const renderButton = () => {
    return <Button onClick={toggleCoreModal} text="Add Currency" />;
  };
  return (
    <S.Container className={className}>
      <S.Center>
        <ToolbarMenuLink text="Home" to="/currencies/home" />
        <ToolbarMenuLink text="Learn More" to="/currencies/learn-more" />
      </S.Center>
      {renderButton()}
    </S.Container>
  );
};

export default Toolbar;
