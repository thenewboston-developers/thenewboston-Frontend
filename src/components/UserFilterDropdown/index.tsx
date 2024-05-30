import React, {useEffect, useState, ChangeEvent} from 'react';
import axios from 'axios';

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

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(API_URL);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    // Filter users based on the search term
    const filterUsers = () => {
      const filtered = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [searchTerm, users]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
