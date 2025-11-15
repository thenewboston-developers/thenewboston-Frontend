import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react';

import {searchUsers} from 'api/userSearch';
import Loader from 'components/Loader';
import {SFC, UserReadSerializer} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface MentionTextareaProps {
  errors: {[field: string]: string};
  label: string;
  maxLength?: number;
  name: string;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
  onMentionedUsersChange?(users: UserReadSerializer[]): void;
  placeholder?: string;
  touched: {[field: string]: boolean};
  value?: string;
}

const MentionTextarea: SFC<MentionTextareaProps> = ({
  className,
  errors,
  label,
  maxLength,
  name,
  onChange,
  onMentionedUsersChange,
  placeholder = '',
  touched,
  value = '',
}) => {
  const [dropdownPosition, setDropdownPosition] = useState<{left: number; top: number} | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionStartIndex, setMentionStartIndex] = useState<number | null>(null);
  const [mentionedUsers, setMentionedUsers] = useState<UserReadSerializer[]>([]);
  const [searchResults, setSearchResults] = useState<UserReadSerializer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const calculateDropdownPosition = (cursorPosition: number) => {
    if (!textareaRef.current || !containerRef.current) return;

    const textarea = textareaRef.current;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lines = textBeforeCursor.split('\n');
    const currentLineIndex = lines.length - 1;
    const currentLineText = lines[currentLineIndex];

    // Approximate position based on line number and character position
    const lineHeight = 24; // Approximate line height in pixels
    const charWidth = 8; // Approximate character width in pixels
    const top = currentLineIndex * lineHeight + 60; // 60px offset for label and padding
    const left = currentLineText.length * charWidth;

    setDropdownPosition({left, top});
  };

  const detectMention = (text: string, cursorPosition: number) => {
    // Find the last @ before cursor
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex === -1) {
      setShowDropdown(false);
      setMentionStartIndex(null);
      setMentionQuery('');
      return;
    }

    // Check if there's a space between @ and cursor (which would end the mention)
    const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
    if (textAfterAt.includes(' ')) {
      setShowDropdown(false);
      setMentionStartIndex(null);
      setMentionQuery('');
      return;
    }

    // Valid mention query
    setMentionStartIndex(lastAtIndex);
    setMentionQuery(textAfterAt);
    calculateDropdownPosition(cursorPosition);
    setShowDropdown(true);

    // Trigger search with debounce
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(textAfterAt);
    }, 300);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {selectionStart, value: newValue} = e.target;
    onChange?.(e);
    detectMention(newValue, selectionStart);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showDropdown || searchResults.length === 0) {
      return;
    }

    // Handle arrow keys and Enter for navigation
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % searchResults.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelectUser(searchResults[selectedIndex]);
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        break;
      default:
        // Allow other keys to work normally
        break;
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      const results = await searchUsers(query);
      setSearchResults(results);
    } catch (error) {
      displayErrorToast('Error searching users');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSelectUser = (user: UserReadSerializer) => {
    if (!textareaRef.current || mentionStartIndex === null) return;

    const textarea = textareaRef.current;
    const currentValue = textarea.value;
    const beforeMention = currentValue.substring(0, mentionStartIndex);
    const afterCursor = currentValue.substring(textarea.selectionStart);

    // Insert username
    const newValue = `${beforeMention}@${user.username} ${afterCursor}`;

    // Update textarea value
    const syntheticEvent = {
      target: {
        name: textarea.name,
        value: newValue,
      },
    } as ChangeEvent<HTMLTextAreaElement>;

    onChange?.(syntheticEvent);

    // Add user to mentioned users if not already there
    const updatedMentionedUsers = [...mentionedUsers];
    if (!updatedMentionedUsers.find((u) => u.id === user.id)) {
      updatedMentionedUsers.push(user);
      setMentionedUsers(updatedMentionedUsers);
      onMentionedUsersChange?.(updatedMentionedUsers);
    }

    // Close dropdown
    setShowDropdown(false);
    setMentionStartIndex(null);
    setMentionQuery('');
    setSearchResults([]);
    setSelectedIndex(0);

    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = beforeMention.length + user.username.length + 2; // +2 for @ and space
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const renderDropdownContent = () => {
    if (isSearching) {
      return (
        <S.LoaderWrapper>
          <Loader size={20} />
        </S.LoaderWrapper>
      );
    }

    if (searchResults.length > 0) {
      return searchResults.map((user, index) => (
        <S.DropdownItem
          key={user.id}
          $isSelected={index === selectedIndex}
          onClick={() => handleSelectUser(user)}
          ref={(el) => {
            dropdownItemRefs.current[index] = el;
          }}
        >
          <S.UserLabel
            avatar={user.avatar}
            clickable={false}
            description={`User ID: ${user.id}`}
            id={user.id}
            username={user.username}
          />
        </S.DropdownItem>
      ));
    }

    if (mentionQuery.trim()) {
      return <S.NoResultsMessage>No users found</S.NoResultsMessage>;
    }

    return null;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Reset selected index when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  // Scroll selected item into view
  useEffect(() => {
    if (showDropdown && dropdownItemRefs.current[selectedIndex]) {
      dropdownItemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex, showDropdown]);

  // Extract mentioned users from content when value changes externally
  useEffect(() => {
    if (!value) {
      setMentionedUsers([]);
      onMentionedUsersChange?.([]);
      return;
    }

    // This is a simplified mention extraction - it won't match users to IDs
    // The parent component should manage the full list of mentioned users
  }, [value, onMentionedUsersChange]);

  const isError = errors[name] && touched[name];

  return (
    <S.Container className={className} ref={containerRef}>
      <S.Label>{label}</S.Label>
      <S.Field
        $error={isError}
        component="textarea"
        innerRef={textareaRef}
        maxLength={maxLength}
        name={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={value}
      />
      <S.SecondaryContainer>{isError && <S.ErrorMessage>{errors[name]}</S.ErrorMessage>}</S.SecondaryContainer>
      {showDropdown && dropdownPosition && (
        <S.Dropdown style={{left: `${dropdownPosition.left}px`, top: `${dropdownPosition.top}px`}}>
          {renderDropdownContent()}
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default MentionTextarea;
