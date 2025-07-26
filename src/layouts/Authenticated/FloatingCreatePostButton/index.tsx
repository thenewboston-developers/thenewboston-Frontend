import {mdiPlus} from '@mdi/js';

import {useToggle} from 'hooks';
import PostModal from 'modals/PostModal';
import {SFC} from 'types';

import * as S from './Styles';

const FloatingCreatePostButton: SFC = ({className}) => {
  const [postModalIsOpen, togglePostModal] = useToggle(false);

  return (
    <>
      <S.Button className={className} onClick={togglePostModal}>
        <S.Icon path={mdiPlus} size="28px" />
      </S.Button>
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default FloatingCreatePostButton;
