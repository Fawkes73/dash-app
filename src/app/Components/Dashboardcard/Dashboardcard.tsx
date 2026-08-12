import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, Radio, Clock, Video, MessageSquare, ArrowUpRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatIndianNumber } from "@/lib/utils";

interface VideoType {
  id: number;
  title: string;
  category: string;
  views: number;
  duration: string;
  uploadedAt: string;
}

interface CommentType {
  id: number;
  videoId: number;
  author: string;
  text: string;
  likes: number;
  timeAgo: string;
}

export default function DashboardCard() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then(setVideos)
      .catch((error) => console.error("Error fetching videos:", error));

    fetch("/api/comments")
      .then((res) => res.json())
      .then(setComments)
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = comments.reduce((sum, comment) => sum + comment.likes, 0);
  const engagementRate = totalViews > 0 ? ((totalLikes + comments.length) / totalViews) * 100 : 0;

  const viewsByCategory = Object.values(
    videos.reduce<Record<string, { name: string; value: number }>>((acc, video) => {
      acc[video.category] ??= { name: video.category, value: 0 };
      acc[video.category].value += video.views;
      return acc;
    }, {})
  );

  const stats = [
    {
      key: "totalViews",
      label: "Total Views",
      value: totalViews > 0 ? totalViews.toLocaleString() : "—",
      change: "All uploads combined",
      icon: Eye,
    },
    { key: "subscribers", label: "Subscribers", value: "284.6K", change: "+2.1% this week", icon: Users },
    {
      key: "liveViewers",
      label: "Live Viewers Now",
      value: formatIndianNumber(1_000_000),
      change: "Matchday 24 stream",
      icon: Radio,
    },
    { key: "watchTime", label: "Watch Time (30d)", value: "2,180 hrs", change: "+12% vs last month", icon: Clock },
    {
      key: "totalVideos",
      label: "Videos Published",
      value: videos.length > 0 ? String(videos.length) : "—",
      change: "Across 6 categories",
      icon: Video,
    },
    {
      key: "engagement",
      label: "Engagement Rate",
      value: totalViews > 0 ? `${engagementRate.toFixed(2)}%` : "—",
      change: `${comments.length > 0 ? comments.length : "—"} comments tracked`,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Channel Overview</h2>
        <p className="text-sm text-muted-foreground">Live stream and video performance at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ key, label, value, change, icon: Icon }) => (
          <Card key={key} className="border-border/60">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
                <p className="text-[11px] text-muted-foreground">{change}</p>
              </div>
              {key === "totalViews" && <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Views by Content Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={viewsByCategory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(value: number) => (value >= 1000 ? `${Math.round(value / 1000)}K` : `${value}`)}
              />
              <Tooltip
                formatter={(value: number) => value.toLocaleString()}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--card-foreground)",
                  fontSize: 12,
                }}
                cursor={{ fill: "var(--accent)", fillOpacity: 0.08 }}
              />
              <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
