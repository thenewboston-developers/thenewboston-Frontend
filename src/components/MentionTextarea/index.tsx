import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react';

import {searchUsers} from 'api/userSearch';
import Loader from 'components/Loader';
import {SFC, UserReadSerializer} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const extractMentionUsernames = (text: string): string[] => {
  if (!text) return [];

  const regex = /@(\w+)/g;
  const usernames: string[] = [];
  let match: RegExpExecArray | null = regex.exec(text);

  while (match !== null) {
    usernames.push(match[1]);
    match = regex.exec(text);
  }

  return usernames;
};

export interface MentionTextareaProps {
  errors: {[field: string]: string};
  dropdownYOffset?: number;
  initialMentionedUsers?: UserReadSerializer[];
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
  dropdownYOffset = 60,
  initialMentionedUsers,
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
  const [mentionedUsers, setMentionedUsers] = useState<UserReadSerializer[]>(initialMentionedUsers ?? []);
  const [searchResults, setSearchResults] = useState<UserReadSerializer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionCacheRef = useRef<Map<string, UserReadSerializer | null>>(new Map());
  const pendingLookupsRef = useRef<Set<string>>(new Set());
  const initialMentionedUsersRef = useRef<string | null>(null);

  const addMentionedUser = useCallback((user: UserReadSerializer) => {
    mentionCacheRef.current.set(user.username.toLowerCase(), user);
    setMentionedUsers((prev) => {
      if (prev.some((existing) => existing.id === user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  }, []);

  const fetchUsersForMentions = useCallback(
    async (usernames: string[]) => {
      const normalized = Array.from(new Set(usernames.map((username) => username.toLowerCase())));
      await Promise.all(
        normalized.map(async (username) => {
          if (mentionCacheRef.current.has(username) || pendingLookupsRef.current.has(username)) return;
          pendingLookupsRef.current.add(username);

          try {
            const results = await searchUsers(username);
            const exactMatch = results.find((user) => user.username.toLowerCase() === username) ?? null;
            mentionCacheRef.current.set(username, exactMatch);

            if (exactMatch) {
              addMentionedUser(exactMatch);
            }
          } catch {
            mentionCacheRef.current.set(username, null);
          } finally {
            pendingLookupsRef.current.delete(username);
          }
        }),
      );
    },
    [addMentionedUser],
  );

  const calculateDropdownPosition = (cursorPosition: number) => {
    if (!textareaRef.current || !containerRef.current) return;

    const textarea = textareaRef.current;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const lines = textBeforeCursor.split('\n');
    const currentLineIndex = lines.length - 1;
    const currentLineText = lines[currentLineIndex];

    const lineHeight = 24;
    const charWidth = 8;
    const top = currentLineIndex * lineHeight + dropdownYOffset;
    const left = currentLineText.length * charWidth;

    setDropdownPosition({left, top});
  };

  const detectMention = (text: string, cursorPosition: number) => {
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex === -1) {
      setShowDropdown(false);
      setMentionStartIndex(null);
      setMentionQuery('');
      return;
    }

    const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
    if (textAfterAt.includes(' ')) {
      setShowDropdown(false);
      setMentionStartIndex(null);
      setMentionQuery('');
      return;
    }

    setMentionStartIndex(lastAtIndex);
    setMentionQuery(textAfterAt);

    if (!textAfterAt) {
      setShowDropdown(false);
      return;
    }

    calculateDropdownPosition(cursorPosition);
    setShowDropdown(true);

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

    const newValue = `${beforeMention}@${user.username} ${afterCursor}`;

    const syntheticEvent = {
      target: {
        name: textarea.name,
        value: newValue,
      },
    } as ChangeEvent<HTMLTextAreaElement>;

    onChange?.(syntheticEvent);
    addMentionedUser(user);

    setShowDropdown(false);
    setMentionStartIndex(null);
    setMentionQuery('');
    setSearchResults([]);
    setSelectedIndex(0);

    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = beforeMention.length + user.username.length + 2;
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
    const incoming = initialMentionedUsers ?? [];
    const incomingIds = incoming
      .map((user) => user.id)
      .sort((a, b) => a - b)
      .join(',');

    if (incomingIds === initialMentionedUsersRef.current) return;
    initialMentionedUsersRef.current = incomingIds;

    setMentionedUsers(incoming);
    incoming.forEach((user) => {
      mentionCacheRef.current.set(user.username.toLowerCase(), user);
    });
  }, [initialMentionedUsers]);

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

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  useEffect(() => {
    if (showDropdown && dropdownItemRefs.current[selectedIndex]) {
      dropdownItemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex, showDropdown]);

  useEffect(() => {
    const usernamesInContent = extractMentionUsernames(value);
    const normalizedSet = new Set(usernamesInContent.map((username) => username.toLowerCase()));

    setMentionedUsers((prev) => {
      const filtered = prev.filter((user) => normalizedSet.has(user.username.toLowerCase()));
      return filtered.length === prev.length ? prev : filtered;
    });

    const usernamesToLoad = Array.from(normalizedSet).filter(
      (username) => !mentionCacheRef.current.has(username) && !pendingLookupsRef.current.has(username),
    );

    if (usernamesToLoad.length) {
      fetchUsersForMentions(usernamesToLoad);
    }
  }, [fetchUsersForMentions, value]);

  useEffect(() => {
    onMentionedUsersChange?.(mentionedUsers);
  }, [mentionedUsers, onMentionedUsersChange]);

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
