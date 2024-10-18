"use client"
import UserTable from "@/components/UserTable";
import { get } from "@/lib/API";
import { formatDate } from "@/constants/Date";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

type CustomColor = "red" | "green" | "orange" | "gray";
interface Option {
  label: string;
  color: CustomColor;
}

interface MenuItem {
  id: number;
  permissions: {
    create: boolean;
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
}
export default function page() {
  const [menulist, setMenuList] = useState<any>([]);
  const [permissionData, setPermissionData] = useState<MenuItem[]>([]);
  const [users, setUsers] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<any>("");
  const columns = [
    { id: "index", label: "Id" },
    { id: "createdAt", label: "Date" },
    { id: "name", label: "Menu Name" },
    { id: "actions", label: "Actions" },
  ];
  const options: Option[] = [
    { label: "Create", color: "green" },
    { label: "Edit", color: "orange" },
    { label: "Delete", color: "red" },
    { label: "View", color: "gray" },
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await get("user/get-users");
        setUsers(response?.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getData = async () => {
    try {
      const response: any = await get("get-menu-list");
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
      setPermissionData(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCheckboxChange = (
    menuId: number,
    optionLabel: string,
    isChecked: boolean
  ) => {
    setPermissionData((prevData) =>
      prevData.map((item) =>
        item.id === menuId
          ? {
              ...item,
              permissions: {
                ...item.permissions,
                [optionLabel.toLowerCase()]: isChecked,
              },
            }
          : item
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
                onChange={(e) =>
                  handleCheckboxChange(row.id, option.label, e.target.checked)
                }
                sx={{
                  color: option.color,
                  "&.Mui-checked": {
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
    const submittedData = permissionData.map((item) => ({
      id: item.id,
      permissions: item.permissions,
      userId: Number(selectedId),
    }));
    console.log(submittedData);
  };

  return (
    <>
    <div>
         <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="mb-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {users.map((data: any, index: any) => (
          <option key={index} value={data?.id}>
            {data.username}
          </option>
        ))}
      </select> 
       <UserTable
        columns={columns}
        data={menulist}
        renderActions={renderActions}
      />
    </div>
       <div className="mt-4 flex justify-end">
       <Button
         label={"Submit"}
         onClick={handleSubmit}
         className="px-4 py-2 text-white bg-[#164e63] rounded disabled:bg-gray-400 transition-colors"
       />
     </div>
     </>
  );
}
