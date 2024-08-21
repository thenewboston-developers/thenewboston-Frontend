import {useEffect, useRef, useState} from 'react';
import EmojiPicker from 'emoji-picker-react';
import Icon from '@mdi/react';
import {mdiThumbUpOutline} from '@mdi/js';

import {SFC} from 'types';
import {breakpoints} from 'styles';

import * as S from './Styles';

export interface ReactionProps {
  postId: number;
}

const Reaction: SFC<ReactionProps> = ({}) => {
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(window.innerWidth <= parseInt(breakpoints.mini));
  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  // const dispatch = useDispatch<AppDispatch>();

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

  const emojiIcon = (
    <S.EmojiIcon>
      <Icon path={mdiThumbUpOutline} size="20px" />
      <span>Like</span>
    </S.EmojiIcon>
  ) || (
    <S.EmojiIcon>
      😢 <span>Reacted</span>
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
              console.log('EMOJI: ', e, e.emoji);
            }}
          />
        </S.EmojiBox>
        {emojiIcon}
      </S.EmojiButton>
    </>
  );
};

export default Reaction;
