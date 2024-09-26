"use client"
import React, { useEffect, useState } from 'react';
import UserTable from '../../../components/UserTable'; 
import { del, get } from '@/lib/API';
import { formatDate } from '@/constants/Date';
import ConfirmationPopup from '@/components/ConfirmationPopup';

export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const columns = [
    { id: 'index', label: 'Id' },
    { id: 'createdAt', label: 'Date' },
    { id: 'username', label: 'User Name' },
    { id: 'role', label: 'Role' },
    { id: 'email', label: 'Email' },
    { id: 'actions', label: 'Action' },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response :any = await get('user/get-users'); 
        const formattedUsers = response?.data.map((user:any, index:any) => ({
          ...user,
          index: index + 1,
          createdAt: formatDate(user.createdAt),
        }));
        setUsers(formattedUsers); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await del(`user/delete-user/${userIdToDelete}`)
      setUsers((prevUsers:any) => prevUsers.filter((user:any) => user.id !== userIdToDelete));
      setIsPopupOpen(false); 
      setUserIdToDelete(null); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderActions = (user:any) => {
    return (
      <button
        onClick={() => {
          setUserIdToDelete(user.id);
          setIsPopupOpen(true);
        }}
        className="bg-red-500 p-2 text-white rounded hover:bg-red-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Delete
      </button>
    );
  };

  return (
    <div>
      <h1>User Details</h1>
      <UserTable columns={columns} data={users} renderActions={renderActions} />
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
