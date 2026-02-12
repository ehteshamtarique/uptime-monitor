"use client"

import React from "react"

import type { Monitor } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"
import { HeartbeatBar } from "@/components/heartbeat-bar"
import { ResponseChart } from "@/components/response-chart"
import {
  Globe,
  Clock,
  Shield,
  ArrowUpRight,
  Pause,
  RotateCcw,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react"

export function MonitorDetail({ monitor }: { monitor: Monitor }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              monitor.status === "up"
                ? "bg-success/15 text-success"
                : monitor.status === "down"
                  ? "bg-destructive/15 text-destructive"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            <Globe size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">{monitor.name}</h1>
              <StatusBadge status={monitor.status} />
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{monitor.url}</span>
              <a
                href={monitor.url.startsWith("http") ? monitor.url : `https://${monitor.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open URL"
              >
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionButton icon={<Pause size={14} />} label="Pause" />
          <ActionButton icon={<RotateCcw size={14} />} label="Recheck" />
          <ActionButton icon={<Edit size={14} />} label="Edit" />
          <ActionButton icon={<Copy size={14} />} label="Clone" />
          <ActionButton icon={<Trash2 size={14} />} label="Delete" variant="danger" />
        </div>
      </div>

      {/* Tags */}
      {monitor.tags.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          {monitor.tags.map((tag) => (
            <span
              key={tag.name}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Monitor Type"
          value={monitor.type}
          icon={<Globe size={14} className="text-muted-foreground" />}
        />
        <StatCard
          label="Avg. Response"
          value={monitor.status === "up" ? `${monitor.avgPing}ms` : "N/A"}
          icon={<Clock size={14} className="text-muted-foreground" />}
          valueColor={monitor.avgPing < 100 ? "text-success" : monitor.avgPing < 300 ? "text-warning" : "text-destructive"}
        />
        <StatCard
          label="Uptime (24h)"
          value={`${monitor.uptime24h}%`}
          icon={<ArrowUpRight size={14} className="text-muted-foreground" />}
          valueColor={monitor.uptime24h >= 99.5 ? "text-success" : monitor.uptime24h >= 95 ? "text-warning" : "text-destructive"}
        />
        {monitor.certificateExpiry !== undefined ? (
          <StatCard
            label="Cert. Expiry"
            value={`${monitor.certificateExpiry} days`}
            icon={<Shield size={14} className="text-muted-foreground" />}
            valueColor={monitor.certificateExpiry > 30 ? "text-success" : "text-warning"}
          />
        ) : (
          <StatCard
            label="Uptime (30d)"
            value={`${monitor.uptime30d}%`}
            icon={<ArrowUpRight size={14} className="text-muted-foreground" />}
            valueColor={monitor.uptime30d >= 99.5 ? "text-success" : "text-warning"}
          />
        )}
      </div>

      {/* Heartbeat section */}
      <div className="mt-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Heartbeat</h2>
            <span className="text-xs text-muted-foreground">Last 90 checks</span>
          </div>
          <div className="mt-3">
            <HeartbeatBar heartbeat={monitor.heartbeat} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>90 min ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>

      {/* Response time chart */}
      <div className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Response Time</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" />
              Avg: {monitor.avgPing}ms
            </div>
          </div>
          <div className="mt-3 h-48">
            <ResponseChart data={monitor.responseTimes} />
          </div>
        </div>
      </div>

      {/* Uptime summary */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <UptimeCard period="24 Hours" percentage={monitor.uptime24h} />
        <UptimeCard period="30 Days" percentage={monitor.uptime30d} />
      </div>

      {/* Important events */}
      <div className="mt-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="text-sm font-medium text-foreground">Important Events</h2>
          <div className="mt-3 space-y-2">
            {monitor.status === "down" ? (
              <>
                <EventRow
                  time="2 min ago"
                  type="down"
                  message={`${monitor.name} is DOWN - Connection timeout`}
                />
                <EventRow
                  time="5 min ago"
                  type="down"
                  message={`${monitor.name} is DOWN - HTTP 503`}
                />
                <EventRow
                  time="1 hour ago"
                  type="up"
                  message={`${monitor.name} is back UP`}
                />
              </>
            ) : monitor.status === "maintenance" ? (
              <EventRow
                time="3 hours ago"
                type="maintenance"
                message={`${monitor.name} - Scheduled maintenance started`}
              />
            ) : (
              <>
                <EventRow
                  time="2 days ago"
                  type="up"
                  message={`${monitor.name} is back UP - Response: 200 OK`}
                />
                <EventRow
                  time="2 days ago"
                  type="down"
                  message={`${monitor.name} was DOWN for 23s - HTTP 502`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionButton({
  icon,
  label,
  variant = "default",
}: {
  icon: React.ReactNode
  label: string
  variant?: "default" | "danger"
}) {
  return (
    <button
      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        variant === "danger"
          ? "border-destructive/30 text-destructive hover:bg-destructive/10"
          : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function StatCard({
  label,
  value,
  icon,
  valueColor = "text-foreground",
}: {
  label: string
  value: string
  icon: React.ReactNode
  valueColor?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className={`mt-1 text-lg font-semibold ${valueColor}`}>{value}</p>
    </div>
  )
}

function UptimeCard({ period, percentage }: { period: string; percentage: number }) {
  const color = percentage >= 99.5 ? "bg-success" : percentage >= 95 ? "bg-warning" : "bg-destructive"
  const textColor = percentage >= 99.5 ? "text-success" : percentage >= 95 ? "text-warning" : "text-destructive"
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{period}</span>
        <span className={`text-lg font-semibold ${textColor}`}>{percentage}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

function EventRow({
  time,
  type,
  message,
}: {
  time: string
  type: "up" | "down" | "maintenance"
  message: string
}) {
  const dotColor = type === "up" ? "bg-success" : type === "down" ? "bg-destructive" : "bg-muted-foreground"
  return (
    <div className="flex items-start gap-2 rounded-md p-2 hover:bg-accent/50 transition-colors">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{message}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}
