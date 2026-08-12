"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Circle, Goal, Repeat, Square } from "lucide-react";
import { cn } from "@/lib/utils";

// Set a real YouTube video ID here to go live — until then the panel
// shows a broadcast-style placeholder instead of an embed pointing at
// unrelated content.
const LIVE_STREAM_VIDEO_ID = "";

const match = {
  competition: "Premier League · Matchday 24",
  venue: "Emirates Stadium",
  minute: 67,
  home: { name: "Arsenal", short: "ARS", score: 2 },
  away: { name: "Chelsea", short: "CHE", score: 1 },
};

const stats: { label: string; home: number; away: number; suffix?: string }[] = [
  { label: "Possession", home: 58, away: 42, suffix: "%" },
  { label: "Shots", home: 14, away: 9 },
  { label: "Shots on Target", home: 6, away: 3 },
  { label: "Corners", home: 7, away: 4 },
];

const events = [
  { minute: 12, type: "goal", team: "ARS", text: "Goal — Saka" },
  { minute: 29, type: "card", team: "CHE", text: "Yellow card — Silva" },
  { minute: 41, type: "goal", team: "CHE", text: "Goal — Palmer" },
  { minute: 58, type: "goal", team: "ARS", text: "Goal — Ødegaard" },
  { minute: 63, type: "sub", team: "CHE", text: "Substitution — Nkunku on for Jackson" },
] as const;

const eventIcon = { goal: Goal, card: Square, sub: Repeat } as const;

function TeamCrest({ short, className }: { short: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-lg text-xs font-bold",
        className
      )}
    >
      {short}
    </div>
  );
}

export default function LiveMatch() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Live Match</h2>
          <p className="text-sm text-muted-foreground">{match.competition}</p>
        </div>
        <Badge className="gap-1.5 bg-accent text-accent-foreground">
          <Circle className="size-2 animate-pulse fill-current" />
          LIVE · {match.minute}&apos;
        </Badge>
      </div>

      <Card className="overflow-hidden border-border/60 py-0">
        <div className="relative aspect-video w-full bg-sidebar">
          {LIVE_STREAM_VIDEO_ID ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube.com/embed/${LIVE_STREAM_VIDEO_ID}?autoplay=0`}
              title="Live match stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sidebar via-sidebar to-sidebar-accent text-sidebar-foreground">
              <button
                type="button"
                aria-label="Play live stream"
                className="flex size-14 items-center justify-center rounded-full bg-sidebar-foreground/15 backdrop-blur transition-colors hover:bg-sidebar-foreground/25"
              >
                <Play className="size-6 fill-current" />
              </button>
              <p className="text-xs font-medium text-sidebar-foreground/70">
                Connect a YouTube live stream ID to go live here
              </p>
            </div>
          )}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
            <Circle className="size-2 animate-pulse fill-red-500 text-red-500" />
            LIVE
          </div>
        </div>

        <CardContent className="flex items-center justify-center gap-6 py-6">
          <div className="flex flex-col items-center gap-2">
            <TeamCrest short={match.home.short} className="bg-sidebar text-sidebar-foreground" />
            <span className="text-sm font-semibold text-foreground">{match.home.name}</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
              {match.home.score}&ndash;{match.away.score}
            </div>
            <div className="mt-1 text-xs font-medium tabular-nums text-muted-foreground">
              {match.minute}&apos; · {match.venue}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TeamCrest short={match.away.short} className="bg-muted text-foreground" />
            <span className="text-sm font-semibold text-foreground">{match.away.name}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Match Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                  <span className="tabular-nums text-foreground">
                    {stat.home}
                    {stat.suffix ?? ""}
                  </span>
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="tabular-nums text-foreground">
                    {stat.away}
                    {stat.suffix ?? ""}
                  </span>
                </div>
                <Progress
                  value={(stat.home / (stat.home + stat.away)) * 100}
                  className="bg-muted [&>div]:bg-accent"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Match Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events
              .slice()
              .reverse()
              .map((event) => {
                const Icon = eventIcon[event.type];
                return (
                  <div key={`${event.minute}-${event.text}`} className="flex items-start gap-3">
                    <span className="w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                      {event.minute}&apos;
                    </span>
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon className="size-3.5" />
                    </div>
                    <div className="text-sm text-foreground">
                      <span className="font-medium">{event.team}</span> — {event.text.split("—")[1]?.trim() ?? event.text}
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
