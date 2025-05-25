import {useEffect, useRef, useState} from 'react';
import {mdiEmoticonOutline} from '@mdi/js';
import Icon from '@mdi/react';
import EmojiPicker from 'emoji-picker-react';
import {SFC} from 'types';

import * as S from './Styles';

interface EmojiBoxProps {
  field: string;
  setFieldValue: (field: string, value: string) => void;
  value: string;
}
const EmojiBox: SFC<EmojiBoxProps> = ({field, setFieldValue, value}) => {
  const [isOpenEmojiBox, setIsOpenEmojiBox] = useState(false);

  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpenEmojiBox && document.querySelectorAll('.epr_-3yva2a').length > 0) {
      const emojiFooter = document.querySelectorAll('.epr_-3yva2a')[0];
      emojiFooter.remove();
    }
  }, [isOpenEmojiBox]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiBoxRef.current &&
        !emojiBoxRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpenEmojiBox(false);
      }
    };
    if (isOpenEmojiBox) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpenEmojiBox]);

  return (
    <>
      {isOpenEmojiBox && (
        <S.EmojiBox ref={emojiBoxRef}>
          <EmojiPicker
            width={300}
            height={350}
            skinTonesDisabled
            onEmojiClick={(e) => {
              const updatedValue = value + e.emoji;
              setFieldValue(field, updatedValue);
            }}
          />
        </S.EmojiBox>
      )}
      <S.EmojiButton
        $isOpenEmojiBox={isOpenEmojiBox}
        ref={emojiButtonRef}
        onClick={() => setIsOpenEmojiBox(!isOpenEmojiBox)}
        type="button"
      >
        <Icon path={mdiEmoticonOutline} size="24px" />
      </S.EmojiButton>
    </>
  );
};
export default EmojiBox;
