import {mdiPlus} from '@mdi/js';

import {useToggle} from 'hooks';
import PostModal from 'modals/PostModal';
import {SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

const FloatingCreatePostButton: SFC = ({className}) => {
  const [postModalIsOpen, togglePostModal] = useToggle(false);

  return (
    <>
      <S.Button
        {...analyticsTarget('create_post')}
        aria-label="Create post"
        className={className}
        onClick={togglePostModal}
        type="button"
      >
        <S.Icon path={mdiPlus} size="28px" />
      </S.Button>
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default FloatingCreatePostButton;
