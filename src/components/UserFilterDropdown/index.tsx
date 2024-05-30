import React, {useEffect, useState, ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {filterUserList} from 'dispatchers/users';
import {displayErrorToast} from 'utils/toasts';
import {AppDispatch, SFC} from 'types';

// Define the User type
interface User {
  id: number;
  username: string;
  // Add other fields as needed
}

// Define the fixed API URL
const API_URL = 'https://dixeam.com/users';

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
      const response = await dispatch(filterUserList(searchTerm));
      console.log(response);
      setUsers([]);
      setFilteredUsers([]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Search by username" value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserFilterDropdown;
