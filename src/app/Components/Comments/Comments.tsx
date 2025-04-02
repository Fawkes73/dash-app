"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

interface CommentType {
  id: number;

  authorName: string;
  authorEmail: string;
  text: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("/api/comments");

        if (!res.ok) {
          throw new Error(`Failed to fetch comments: ${res.status}`);
        }

        const data: CommentType[] = await res.json();
        setComments(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  if (loading) return <p className="text-center">Loading comments...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <Table>
        <TableCaption>A list of recent comments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Comment ID</TableHead>

            <TableHead>Author</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="font-medium">{comment.id}</TableCell>

                <TableCell>{comment.authorName}</TableCell>
                <TableCell>{comment.authorEmail}</TableCell>
                <TableCell className="text-right">{comment.text}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No comments available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Comments;
