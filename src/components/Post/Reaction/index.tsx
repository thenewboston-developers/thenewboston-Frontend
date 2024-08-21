import {useEffect, useRef, useState} from 'react';
import EmojiPicker from 'emoji-picker-react';
import {mdiThumbUpOutline} from '@mdi/js';

import {SFC} from 'types';
import {PostReactionSerializer, AppDispatch} from 'types';
import {createPostReaction} from 'dispatchers/reactions';
import {breakpoints} from 'styles';

import * as S from './Styles';
import {useDispatch} from 'react-redux';
import {displayErrorToast} from 'utils/toasts';

export interface ReactionProps {
  postId: number;
  userReaction: string;
  userReactions: PostReactionSerializer[];
}

const Reaction: SFC<ReactionProps> = ({userReaction, postId}) => {
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(window.innerWidth <= parseInt(breakpoints.mini));
  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isOpenEmojiPicker && document.querySelectorAll('.epr_-3yva2a').length > 0) {
      const emojiFooter = document.querySelectorAll('.epr_-3yva2a')[0];
      emojiFooter.remove();
    }
  }, [isOpenEmojiPicker]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= parseInt(breakpoints.mini));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiBoxRef.current &&
        !emojiBoxRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpenEmojiPicker(false);
      }
    };
    if (isOpenEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpenEmojiPicker]);

  const handleEmojiSelection = async (emoji: string) => {
    try {
      await dispatch(
        createPostReaction({
          post: postId,
          reaction: emoji,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Error in reacting to post');
    }
  };

  const emojiIcon = userReaction ? (
    <S.EmojiIcon>
      {userReaction} <span>Reacted</span>
    </S.EmojiIcon>
  ) : (
    <S.EmojiIcon>
      <S.Icon path={mdiThumbUpOutline} size="20px" />
      <span>Like</span>
    </S.EmojiIcon>
  );

  return (
    <>
      <S.EmojiButton
        ref={emojiButtonRef}
        $isOpenEmojiPicker={isOpenEmojiPicker}
        onClick={() => setIsOpenEmojiPicker(!isOpenEmojiPicker)}
        type="button"
      >
        <S.EmojiBox ref={emojiBoxRef}>
          <EmojiPicker
            open={isOpenEmojiPicker}
            searchDisabled
            reactionsDefaultOpen
            skinTonesDisabled
            width={isMobileDevice ? 250 : 280}
            allowExpandReactions={false}
            onReactionClick={(e) => {
              handleEmojiSelection(e.emoji);
              setIsOpenEmojiPicker(false);
            }}
          />
        </S.EmojiBox>
        {emojiIcon}
      </S.EmojiButton>
    </>
  );
};

export default Reaction;
