import {SFC} from 'types';
import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const renderButtonContainer = () => {
    return (
      <S.ButtonContainer>
        <S.Button
          onClick={() => {
            console.log(123);
          }}
          text="New Conversation"
        />
      </S.ButtonContainer>
    );
  };

  return (
    <S.Container className={className}>
      {renderButtonContainer()}
      <MenuItem text="hey" />
      <MenuItem text="now" />
      <MenuItem text="hey" />
      <MenuItem text="now" />
      <MenuItem text="hey" />
      <MenuItem text="now" />
      <MenuItem text="hey" />
      <MenuItem text="now" />
      <MenuItem text="hey" />
      <MenuItem text="now" />
    </S.Container>
  );
};

export default LeftMenu;
