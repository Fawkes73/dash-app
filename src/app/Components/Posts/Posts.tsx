"use client";

import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PostType {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/post");
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data: PostType[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) return <p className="text-center text-lg">Loading posts...</p>;

  return (
    <div className="mt-12 mx-auto max-w-[900px]">
      <h2 className="text-3xl font-bold mb-6 text-center">Posts</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-3 text-lg mb-6 w-full rounded-md"
      />

      {/* Posts Table */}
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 border h-14">
              <th className="border p-4 text-lg text-left">ID</th>
              <th className="border p-4 text-lg text-left">Title</th>
              <th className="border p-4 text-lg text-left">Content</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id} className="border hover:bg-gray-100 h-16">
                  <td className="border p-4 text-center text-lg">{post.id}</td>
                  <td className="border p-4 text-lg">{post.title}</td>
                  <td className="border p-4 text-lg">{post.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border p-4 text-center text-lg">
                  No posts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bottom Right */}
      <div className="flex justify-end mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className="text-lg"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Posts;
