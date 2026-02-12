"use client"

import type { HeartbeatEntry } from "@/lib/mock-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const statusColors: Record<string, string> = {
  up: "bg-success",
  down: "bg-destructive",
  pending: "bg-pending",
  maintenance: "bg-muted-foreground",
}

export function HeartbeatBar({ heartbeat, slim = false }: { heartbeat: HeartbeatEntry[]; slim?: boolean }) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className={`flex items-end gap-px ${slim ? "h-6" : "h-8"}`}>
        {heartbeat.map((beat, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className={`${statusColors[beat.status]} rounded-sm transition-all hover:opacity-80 cursor-default ${slim ? "w-1 min-w-[3px]" : "w-1.5 min-w-[4px]"}`}
                style={{ height: "100%" }}
              />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-card text-card-foreground border-border text-xs">
              <p className="font-medium">
                {beat.status === "up" ? "Up" : beat.status === "down" ? "Down" : "Maintenance"}
              </p>
              {beat.ping > 0 && <p className="text-muted-foreground">{beat.ping}ms</p>}
              <p className="text-muted-foreground">{new Date(beat.time).toLocaleTimeString()}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
