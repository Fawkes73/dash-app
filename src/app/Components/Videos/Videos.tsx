"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Eye, Clock } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface VideoType {
  id: number;
  title: string;
  category: string;
  views: number;
  duration: string;
  uploadedAt: string;
}

const categoryColor: Record<string, string> = {
  Highlights: "bg-accent/10 text-accent",
  Analysis: "bg-chart-4/10 text-chart-4",
  News: "bg-chart-3/10 text-chart-3",
  Live: "bg-destructive/10 text-destructive",
  Interview: "bg-chart-2/10 text-chart-2",
  Vlog: "bg-muted text-muted-foreground",
};

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error(`Failed to fetch videos: ${res.status}`);
        const data: VideoType[] = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const filtered = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentVideos = filtered.slice(start, start + perPage);

  if (loading) return <p className="text-center text-muted-foreground">Loading videos...</p>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Videos</h2>
        <p className="text-sm text-muted-foreground">{videos.length} uploads on the channel.</p>
      </div>

      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {currentVideos.length > 0 ? (
          currentVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden border-border/60 py-0">
              <div className="relative flex aspect-video items-center justify-center bg-sidebar">
                <Play className="size-8 text-sidebar-foreground/60" />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {video.duration}
                </span>
              </div>
              <CardContent className="space-y-1.5 p-3">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${categoryColor[video.category] ?? "bg-muted text-muted-foreground"}`}
                >
                  {video.category}
                </span>
                <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">{video.title}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3" /> {video.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {video.uploadedAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No videos found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(p - 1, 1));
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Videos;
