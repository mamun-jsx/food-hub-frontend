"use client";
import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../../../../service/admin-apdpoint";
import UserTable from "@/components/ui/UserTable";

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

const Users = () => {
  const [allusers, setUsers] = useState<{ data: IUser[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchAllUsers();
        if (isMounted) {
          setUsers(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch users",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="p-4">
        <p>Loading users...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  if (!allusers?.data?.length)
    return (
      <div className="p-4">
        <p>No users found...</p>
      </div>
    );

  const userData: IUser[] = allusers.data;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Users ({userData.length})</h1>
      <UserTable users={userData} />
    </div>
  );
};

export default Users;
