"use client"
import React, { useEffect, useState } from 'react';
import UserTable from '../../../components/UserTable'; 
import { get } from '@/lib/API';

export default function UserDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get('user/get-users'); 
        setUsers(response?.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId:any) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user?.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Details</h1>
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
}
