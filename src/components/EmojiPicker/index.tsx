import {useEffect, useRef, useState} from 'react';
import {mdiEmoticonOutline} from '@mdi/js';
import Icon from '@mdi/react';

import {SFC} from 'types';

import {emojiData} from './emojiData';
import * as S from './Styles';

interface EmojiPickerProps {
  field: string;
  setFieldValue: (field: string, value: string) => void;
  value: string;
  displayMode?: 'textarea' | 'inline';
}

const EmojiPicker: SFC<EmojiPickerProps> = ({field, setFieldValue, value, displayMode = 'inline'}) => {
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
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

  const handleEmojiClick = (emoji: string) => {
    const updatedValue = value + emoji;
    setFieldValue(field, updatedValue);
  };

  const getFilteredEmojis = () => {
    if (!searchQuery) {
      return emojiData[selectedGroup].emojis;
    }

    const query = searchQuery.toLowerCase();
    const allEmojis = emojiData.flatMap((group) => group.emojis);

    return allEmojis.filter(
      (emoji) =>
        emoji.name.toLowerCase().includes(query) ||
        emoji.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
    );
  };

  const filteredEmojis = getFilteredEmojis();

  return (
    <S.Container $displayMode={displayMode}>
      <S.EmojiButton
        $displayMode={displayMode}
        $isOpenEmojiPicker={isOpenEmojiPicker}
        ref={emojiButtonRef}
        onClick={() => setIsOpenEmojiPicker(!isOpenEmojiPicker)}
        type="button"
      >
        <Icon path={mdiEmoticonOutline} size="24px" />
      </S.EmojiButton>
      {isOpenEmojiPicker && (
        <S.EmojiPicker $displayMode={displayMode} ref={emojiPickerRef}>
          <S.SearchContainer>
            <S.SearchInput
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emojis..."
              type="text"
              value={searchQuery}
            />
          </S.SearchContainer>

          {!searchQuery && (
            <S.GroupTabs>
              {emojiData.map((group, index) => (
                <S.GroupTab
                  $isActive={selectedGroup === index}
                  key={group.name}
                  onClick={() => setSelectedGroup(index)}
                  type="button"
                >
                  {group.emojis[0]?.emoji}
                </S.GroupTab>
              ))}
            </S.GroupTabs>
          )}

          <S.EmojiGrid>
            {filteredEmojis.map((emoji) => (
              <S.EmojiItem
                key={emoji.emoji}
                onClick={() => handleEmojiClick(emoji.emoji)}
                title={emoji.name}
                type="button"
              >
                {emoji.emoji}
              </S.EmojiItem>
            ))}
            {filteredEmojis.length === 0 && <S.NoResults>No emojis found</S.NoResults>}
          </S.EmojiGrid>
        </S.EmojiPicker>
      )}
    </S.Container>
  );
};

export default EmojiPicker;
