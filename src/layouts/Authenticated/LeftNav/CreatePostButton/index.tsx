import {mdiPlus} from '@mdi/js';

import {useToggle} from 'hooks';
import PostModal from 'modals/PostModal';
import {SFC} from 'types';
import * as S from './Styles';

const CreatePostButton: SFC = ({className}) => {
  const [postModalIsOpen, togglePostModal] = useToggle(false);

  return (
    <>
      <S.Container className={className} onClick={togglePostModal}>
        <S.Icon path={mdiPlus} size="26px" />
        <S.Text>Post</S.Text>
      </S.Container>
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default CreatePostButton;
