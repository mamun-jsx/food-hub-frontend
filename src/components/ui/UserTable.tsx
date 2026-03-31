"use client";

import React, { useState } from "react";
import { updateUserRole } from "../../../service/admin-apdpoint";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
  createdAt: string;
  updatedAt: string;
}

interface Props {
  users: IUser[];
}

const UserTable = ({ users: initialUsers }: Props) => {
  const [users, setUsers] = useState<IUser[]>(initialUsers);

  const handleUserRole = async (id: string, role: string) => {
    await updateUserRole(id, role);
    alert("Role updated successfully");
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: role as "ADMIN" | "PROVIDER" | "CUSTOMER" } : user)),
    );
  };
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px] border border-gray-200 rounded-lg">
        {/* Header */}
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Promote</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50 transition">
              {/* User */}
              <td className="p-3 flex items-center gap-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{user.name}</span>
              </td>

              {/* Email */}
              <td className="p-3 text-sm text-gray-600">{user.email}</td>

              {/* Role */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold
                  ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : user.role === "PROVIDER"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-2 border">
                <select
                  defaultValue={user.role}
                  onChange={(e) => handleUserRole(user.id, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="PROVIDER">Provider</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              {/* Date */}
              <td className="p-3 text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
