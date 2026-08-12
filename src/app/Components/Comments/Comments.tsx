"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

interface CommentType {
  id: number;
  videoId: number;
  author: string;
  text: string;
  likes: number;
  timeAgo: string;
}

function initials(handle: string) {
  return handle.replace(/[_.]/g, " ").trim().slice(0, 2).toUpperCase();
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("/api/comments");
        if (!res.ok) throw new Error(`Failed to fetch comments: ${res.status}`);
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

  if (loading) return <p className="text-center text-muted-foreground">Loading comments...</p>;
  if (error) return <p className="text-center text-destructive">Error: {error}</p>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Comments</h2>
        <p className="text-sm text-muted-foreground">{comments.length} comments across recent uploads.</p>
      </div>

      <Card className="border-border/60">
        <CardContent className="divide-y divide-border/60 p-0">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                  {initials(comment.author)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">@{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground/90">{comment.text}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp className="size-3" />
                    {comment.likes.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-6 text-center text-sm text-muted-foreground">No comments yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;
