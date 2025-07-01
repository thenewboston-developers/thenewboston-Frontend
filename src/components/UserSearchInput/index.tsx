import {useCallback, useEffect, useRef, useState} from 'react';

import {searchUsers} from 'api/users';
import {SFC, UserReadSerializer} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface UserSearchInputProps {
  errors: {[field: string]: string};
  label: string;
  name: string;
  onChange?(selectedUser: UserReadSerializer | null): void;
  placeholder?: string;
  touched: {[field: string]: boolean};
  value: UserReadSerializer | null;
}

const UserSearchInput: SFC<UserSearchInputProps> = ({
  className,
  errors,
  label,
  name,
  onChange,
  placeholder = 'Search for a user...',
  touched,
  value,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserReadSerializer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClearSelection = () => {
    setSearchQuery('');
    setSearchResults([]);
    onChange?.(null);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchUsers(query);
      setSearchResults(results);
      setShowDropdown(true);
    } catch (error) {
      displayErrorToast('Error searching users');
    }
  }, []);

  const handleSelectUser = (user: UserReadSerializer) => {
    setSearchQuery(user.username);
    setShowDropdown(false);
    onChange?.(user);
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

  return (
    <S.Container className={className} ref={containerRef}>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        <S.Input
          $error={!!(errors[name] && touched[name])}
          autoComplete="off"
          name={name}
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          value={searchQuery}
        />
        {value && (
          <S.ClearButton onClick={handleClearSelection} type="button">
            ×
          </S.ClearButton>
        )}
      </S.InputWrapper>
      {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      {showDropdown && searchResults.length > 0 && (
        <S.Dropdown>
          {searchResults.map((user) => (
            <S.DropdownItem key={user.id} onClick={() => handleSelectUser(user)}>
              <S.UserLabel avatar={user.avatar} description="" id={user.id} username={user.username} />
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      )}
      {showDropdown && searchQuery.trim() && searchResults.length === 0 && (
        <S.Dropdown>
          <S.NoResultsMessage>No users found</S.NoResultsMessage>
        </S.Dropdown>
      )}
    </S.Container>
  );
};

export default UserSearchInput;
