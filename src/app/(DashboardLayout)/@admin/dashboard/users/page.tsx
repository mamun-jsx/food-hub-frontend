"use client";
import React from "react";
import { fetchAllUsers } from "../../../../../../service/admin-apdpoint";
import UserTable from "@/components/ui/UserTable";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: "ADMIN" | "PROVIDER" | "USER";
  createdAt: string;
  updatedAt: string;
}

const Users = () => {
  const { data: allusers, isLoading, isError, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchAllUsers(),
  });

  if (isLoading)
    return (
      <div className="p-4 flex justify-center">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="p-4">
        <p className="text-red-600">Error: {error instanceof Error ? error.message : "Failed to fetch users"}</p>
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
