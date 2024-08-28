import {SFC} from 'types';
import * as S from './Styles';
import {ReactSelect as Select} from 'components/FormElements';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from 'types';
import {useCallback, useEffect, useMemo} from 'react';
import {getUsers} from 'dispatchers/users';
import {getUsers as getUsersSelector, getSelf} from 'selectors/state';
import DefaultAvatar from 'assets/default_avatar.svg';

export interface UsersDropdownProps {
  error: string | null;
  touched: boolean | null;
  handleSelect: (userId: string | number | null) => void;
  label?: string | 'User';
  name?: string | 'user';
  placeholder?: string | 'Select user...';
  includeSelf?: boolean | false;
}

export interface UserOption {
  value: number;
  label: string;
  avatar: string | null;
}

const UsersDropdown: SFC<UsersDropdownProps> = ({label, name, handleSelect, includeSelf, error, touched}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selfUser = useSelector(getSelf);

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      await dispatch(getUsers());
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const users = useSelector(getUsersSelector);

  const usersOptions =
    useMemo((): UserOption[] => {
      const optionUsers = includeSelf
        ? Object.values(users)
        : Object.values(users).filter((user) => user.id != selfUser.id);

      return optionUsers.map((user) => ({
        avatar: user.avatar,
        label: user.username,
        value: user.id,
      }));
    }, [users, includeSelf, selfUser.id]) || [];

  useEffect(() => {
    fetchUsers();
  }, [dispatch, fetchUsers]);

  return (
    <div>
      <S.Label htmlFor="user-select">{label}</S.Label>
      <Select
        id="user-select"
        name={name}
        isSearchable
        options={usersOptions}
        onChange={(option) => handleSelect(option?.value || null)}
        formatOptionLabel={(user) => (
          <S.Option>
            <S.Label>{user.label}</S.Label>
            <S.Avatar src={user.avatar || DefaultAvatar} alt="avatar" />
          </S.Option>
        )}
        placeholder="Select new owner..."
      />
      {touched && error && <S.ErrorField>{error}</S.ErrorField>}
    </div>
  );
};

export default UsersDropdown;
