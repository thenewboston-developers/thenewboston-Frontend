import {mdiPlus} from '@mdi/js';

import {useToggle} from 'hooks';
import PostModal from 'modals/PostModal';
import {SFC} from 'types';

import useIsRail from '../useIsRail';

import * as S from './Styles';

const CreatePostButton: SFC = ({className}) => {
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const isRail = useIsRail();

  return (
    <>
      <S.Button className={className} onClick={togglePostModal} title={isRail ? 'Post' : undefined} type="button">
        <S.Icon path={mdiPlus} size="20px" />
        <S.Text>Post</S.Text>
      </S.Button>
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default CreatePostButton;
