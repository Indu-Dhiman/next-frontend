"use client";
import UserTable from '@/components/UserTable';
import { formatDate } from '@/constants/Date';
import { get } from '@/lib/API';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@/components/buttons/Button';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// Define the valid colors for options
type CustomColor = 'red' | 'green' | 'orange' | 'gray';

interface Option {
  label: string;
  color: CustomColor; // Allow custom colors
}

interface MenuItem {
  id: number; // Assuming each menu item has a unique ID
  permissions: {
    create: boolean;
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
}

export default function UserPermissions() {
  const [menulist, setMenuList] = useState<any>([]);
  const [permissionData, setPermissionData] = useState<MenuItem[]>([]);

  const columns = [
    { id: 'index', label: 'Id' },
    { id: 'createdAt', label: 'Date' },
    { id: 'name', label: 'Menu Name' },
    { id: 'actions', label: 'Actions' } // Action column
  ];

  const options: Option[] = [
    { label: "Create", color: "green" },   // Use green for Add
    { label: "Edit", color: "orange" }, // Use orange for Edit
    { label: "Delete", color: "red" },   // Use red for Delete
    { label: "View", color: "gray" },    // Use gray for View
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response: any = await get('get-menu-list');
      const formattedUsers = response?.data.map((user: any, index: any) => ({
        ...user,
        index: index + 1,
        createdAt: formatDate(user.createdAt),
        permissions: {
          create: false,
          edit: false,
          delete: false,
          view: false,
        },
      }));
      setMenuList(formattedUsers);
      setPermissionData(formattedUsers); // Initialize permission data
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCheckboxChange = (menuId: number, optionLabel: string, isChecked: boolean) => {
    setPermissionData((prevData) => 
      prevData.map(item => 
        item.id === menuId ? {
          ...item,
          permissions: {
            ...item.permissions,
            [optionLabel.toLowerCase()]: isChecked,
          },
        } : item
      )
    );
  };

  const renderActions = (row: any) => {
    return (
      <div className="flex space-x-4">
        {options.map((option) => (
          <div key={option.label} className="flex items-center">
            <label>
              <Checkbox
                {...label}
                checked={row.permissions[option.label.toLowerCase()]}
                onChange={(e) => handleCheckboxChange(row.id, option.label, e.target.checked)}
                sx={{
                  color: option.color,
                  '&.Mui-checked': {
                    color: option.color,
                  },
                }}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    // Create an array of objects for submission
    const submittedData = permissionData.map(item => ({
      id: item.id,
      permissions: item.permissions,
    }));
    console.log(submittedData); // Log the submitted data
  };

  return (
    <>
      <UserTable columns={columns} data={menulist} renderActions={renderActions} />
      <div className='mt-4 flex justify-end'>
        <Button label={"Submit"} onClick={handleSubmit} className="px-4 py-2 text-white bg-[#164e63] rounded disabled:bg-gray-400 transition-colors" />
      </div>
    </>
  );
}
