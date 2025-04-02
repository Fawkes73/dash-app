"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // ✅ Import shadcn table components

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");

        const data: UserType[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registered Users</h2>

      {/* 🔹 Fix ScrollArea Height */}
      <ScrollArea className="h-auto max-h-[300px] w-full rounded-md border overflow-hidden">
        <Table className="w-full border-separate border-spacing-y-2">
          <TableCaption className="text-lg font-semibold">A list of registered users.</TableCaption>
          <TableHeader>
            <TableRow className="h-12 bg-gray-100">
              <TableHead className="w-[100px] px-4">ID</TableHead>
              <TableHead className="px-4">First Name</TableHead>
              <TableHead className="px-4">Last Name</TableHead>
              <TableHead className="text-right px-4">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="h-12 hover:bg-gray-200 transition-colors">
                  <TableCell className="font-medium px-4">{user.id}</TableCell>
                  <TableCell className="px-4">{user.firstName}</TableCell>
                  <TableCell className="px-4">{user.lastName}</TableCell>
                  <TableCell className="text-right px-4">{user.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="h-12">
                <TableCell colSpan={4} className="text-center text-lg">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default User;
