import React, {useEffect, useState, ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterUserList} from 'dispatchers/users';
import {displayErrorToast} from 'utils/toasts';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';
import axios from 'axios';
import {UserReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/users`;

interface User {
  id: number;
  username: string;
}

const UserFilterDropdown: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Filter users based on the search term
    const filterUsers = () => {
      const filtered = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [searchTerm, users]);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    try {
      const response = await axios.get<UserReadSerializer, any>(
        `${BASE_URL}?search=${event.target.value}`,
        authorizationHeaders(),
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <S.Input type="text" placeholder="Search by username" value={searchTerm} onChange={handleSearch} />
      <S.Ulist>
        {filteredUsers.map((user) => (
          <S.Uli key={user.id}>{user.username}</S.Uli>
        ))}
      </S.Ulist>
    </div>
  );
};

export default UserFilterDropdown;
