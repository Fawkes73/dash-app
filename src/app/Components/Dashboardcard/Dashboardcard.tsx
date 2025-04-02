import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Newspaper, MessageSquare, User } from "lucide-react";
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

const DashboardCard = () => {
  const [users, setUsers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch("/api/user").then((res) => res.json()),
          fetch("/api/post").then((res) => res.json()),
          fetch("/api/comments").then((res) => res.json()),
        ]);

        setUsers(usersRes.length);
        setPosts(postsRes.length);
        setComments(commentsRes.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const data = [
    { name: "Users", value: users },
    { name: "Posts", value: posts },
    { name: "Comments", value: comments },
  ];

  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-lg">
      <CardContent>
        <h3 className="text-4xl text-center mb-6 font-bold text-slate-600 dark:text-slate-300">
          User Activity
        </h3>

        {/* Table */}
        <Table className="w-full border-separate border-spacing-y-4">
          <TableHeader>
            <TableRow className="h-16 bg-gray-200">
              <TableHead className="text-lg">User</TableHead>
              <TableHead className="text-lg">Posts</TableHead>
              <TableHead className="text-lg">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-20">
              <TableCell className="flex items-center gap-64">
                <User className="text-slate-600 dark:text-slate-300" size={64} />
                <span className="text-2xl font-semibold text-slate-600 dark:text-slate-300">{users}</span>
              </TableCell>
              <TableCell className="flex items-center gap-64">
                <Newspaper className="text-slate-600 dark:text-slate-300" size={64} />
                <span className="text-2xl font-semibold text-slate-600 dark:text-slate-300">{posts}</span>
              </TableCell>
              <TableCell className="flex items-center gap-64">
                <MessageSquare className="text-slate-600 dark:text-slate-300" size={64} />
                <span className="text-2xl font-semibold text-slate-600 dark:text-slate-300">{comments}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* 🔹 Bar Chart */}
        <div className="mt-8 flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
