import {SquarePen} from 'lucide-react';

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
        aria-label="New post"
        className={className}
        onClick={togglePostModal}
        type="button"
      >
        <SquarePen aria-hidden size={24} strokeWidth={2} />
      </S.Button>
      {postModalIsOpen ? <PostModal close={togglePostModal} /> : null}
    </>
  );
};

export default FloatingCreatePostButton;
