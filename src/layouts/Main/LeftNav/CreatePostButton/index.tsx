import {SquarePen} from 'lucide-react';

import {useToggle} from 'hooks';
import PostModal from 'modals/PostModal';
import {SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';

import useIsRail from '../useIsRail';

import * as S from './Styles';

const TEXT = 'New post';

const CreatePostButton: SFC = ({className}) => {
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const isRail = useIsRail();

  return (
    <>
      <S.Button
        {...analyticsTarget('create_post')}
        className={className}
        onClick={togglePostModal}
        title={isRail ? TEXT : undefined}
        type="button"
      >
        <SquarePen aria-hidden size={18} strokeWidth={2} />
        <S.Text>{TEXT}</S.Text>
      </S.Button>
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default CreatePostButton;
