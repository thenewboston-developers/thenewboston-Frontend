import {CSSProperties, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
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

const dropDownRoot = document.getElementById('dropdown-root') as HTMLElement;

const EmojiPicker: SFC<EmojiPickerProps> = ({field, setFieldValue, value, displayMode = 'inline'}) => {
  const [emojiPickerPosition, setEmojiPickerPosition] = useState<CSSProperties | undefined>(undefined);
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpenEmojiPicker) {
      setEmojiPickerPosition(undefined);
      return;
    }

    const updateEmojiPickerPosition = () => {
      const button = emojiButtonRef.current;
      const picker = emojiPickerRef.current;

      if (!button || !picker) {
        return;
      }

      const buttonRect = button.getBoundingClientRect();
      const pickerRect = picker.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const viewportOffset = 8;

      const preferredTop = buttonRect.bottom + viewportOffset;
      const top =
        preferredTop + pickerRect.height <= viewportHeight
          ? preferredTop
          : Math.max(viewportOffset, buttonRect.top - pickerRect.height - viewportOffset);
      const desiredLeft = displayMode === 'textarea' ? buttonRect.left : buttonRect.right + 50 - pickerRect.width;
      const maxLeft = viewportWidth - pickerRect.width - viewportOffset;
      const left = Math.min(Math.max(viewportOffset, desiredLeft), Math.max(viewportOffset, maxLeft));

      setEmojiPickerPosition({
        left: `${left}px`,
        position: 'fixed',
        right: 'auto',
        top: `${top}px`,
        zIndex: 1102,
      });
    };

    updateEmojiPickerPosition();

    window.addEventListener('resize', updateEmojiPickerPosition);
    window.addEventListener('scroll', updateEmojiPickerPosition, true);

    return () => {
      window.removeEventListener('resize', updateEmojiPickerPosition);
      window.removeEventListener('scroll', updateEmojiPickerPosition, true);
    };
  }, [displayMode, isOpenEmojiPicker]);

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

  const handleEmojiButtonClick = () => {
    setIsOpenEmojiPicker((prevIsOpen) => !prevIsOpen);
  };

  const handleEmojiClick = (emoji: string) => {
    const updatedValue = value + emoji;
    setFieldValue(field, updatedValue);
  };

  const filteredEmojis = getFilteredEmojis();

  return (
    <S.Container $displayMode={displayMode}>
      <S.EmojiButton
        $displayMode={displayMode}
        $isOpenEmojiPicker={isOpenEmojiPicker}
        onClick={handleEmojiButtonClick}
        ref={emojiButtonRef}
        type="button"
      >
        <Icon path={mdiEmoticonOutline} size="24px" />
      </S.EmojiButton>
      {isOpenEmojiPicker &&
        createPortal(
          <S.EmojiPicker $displayMode={displayMode} ref={emojiPickerRef} style={emojiPickerPosition}>
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
              {filteredEmojis.map((emoji, index) => (
                <S.EmojiItem
                  key={`${emoji.emoji}-${index}`}
                  onClick={() => handleEmojiClick(emoji.emoji)}
                  title={emoji.name}
                  type="button"
                >
                  {emoji.emoji}
                </S.EmojiItem>
              ))}
              {filteredEmojis.length === 0 && <S.NoResults>No emojis found</S.NoResults>}
            </S.EmojiGrid>
          </S.EmojiPicker>,
          dropDownRoot,
        )}
    </S.Container>
  );
};

export default EmojiPicker;
