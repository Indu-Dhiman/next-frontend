"use client";

import UserTable from "@/components/UserTable";
import { get } from "@/lib/API";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserPermissions() {
  const router = useRouter();
  const [users, setUsers] = useState<any>([]);
  const columns = [
    { id: "index", label: "Id" },
    { id: "createdAt", label: "Date" },
    { id: "username", label: "Menu Name" },
    { id: "actions", label: "Actions" },
  ];
  const options: any= [
    { label: "Edit", color: "orange" },
    { label: "Delete", color: "red" },
  ];
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

  const renderActions = (row: any) => {
    return (
      <div className="flex space-x-4">
        {options.map((option:any) => (
          <div key={option.label} className="flex items-center">
            <label>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
    <div className="flex justify-end">
        <button
          className="px-4 py-2 text-white bg-[#164e63] rounded disabled:bg-gray-400 transition-colors mb-4"
          onClick={() => router.push("/admin/userpermissions/add-permission")}
        >
          Add
        </button>
      </div>
      <UserTable
        columns={columns}
        data={users}
        renderActions={renderActions}
      />{" "}
      
    </>
  );
}
