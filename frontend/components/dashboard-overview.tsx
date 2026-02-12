"use client"

import React from "react"

import { monitors, upCount, downCount, maintenanceCount, overallUptime } from "@/lib/mock-data"
import { HeartbeatBar } from "@/components/heartbeat-bar"
import { StatusDot } from "@/components/status-badge"
import { Activity, ArrowUpRight, ArrowDownRight, Wrench, Globe } from "lucide-react"

export function DashboardOverview({ onSelectMonitor }: { onSelectMonitor: (id: number) => void }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Monitoring {monitors.length} services
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
          <Activity size={14} className="text-success" />
          <span className="text-sm font-medium text-foreground">{overallUptime}%</span>
          <span className="text-xs text-muted-foreground">overall</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard
          label="Up"
          count={upCount}
          icon={<ArrowUpRight size={16} />}
          iconBg="bg-success/15"
          iconColor="text-success"
        />
        <SummaryCard
          label="Down"
          count={downCount}
          icon={<ArrowDownRight size={16} />}
          iconBg="bg-destructive/15"
          iconColor="text-destructive"
        />
        <SummaryCard
          label="Maintenance"
          count={maintenanceCount}
          icon={<Wrench size={16} />}
          iconBg="bg-muted"
          iconColor="text-muted-foreground"
        />
        <SummaryCard
          label="Total"
          count={monitors.length}
          icon={<Globe size={16} />}
          iconBg="bg-pending/15"
          iconColor="text-pending"
        />
      </div>

      {/* Current incidents */}
      {downCount > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-medium text-foreground">Active Incidents</h2>
          <div className="mt-2 space-y-2">
            {monitors
              .filter((m) => m.status === "down")
              .map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSelectMonitor(m.id)}
                  className="flex w-full items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-left transition-colors hover:bg-destructive/10"
                >
                  <StatusDot status="down" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.url}</p>
                  </div>
                  <span className="text-xs text-destructive">Down for 5m</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* All monitors table */}
      <div className="mt-6">
        <h2 className="text-sm font-medium text-foreground">All Monitors</h2>
        <div className="mt-2 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Name</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground sm:table-cell">Type</th>
                <th className="hidden px-4 py-2.5 text-left text-xs font-medium text-muted-foreground md:table-cell">Heartbeat</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Uptime</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Ping</th>
              </tr>
            </thead>
            <tbody>
              {monitors.map((monitor) => (
                <tr
                  key={monitor.id}
                  onClick={() => onSelectMonitor(monitor.id)}
                  className="cursor-pointer border-b border-border transition-colors last:border-b-0 hover:bg-accent/50"
                >
                  <td className="px-4 py-2.5">
                    <StatusDot status={monitor.status} />
                  </td>
                  <td className="px-4 py-2.5">
                    <div>
                      <span className="font-medium text-foreground">{monitor.name}</span>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{monitor.url}</p>
                    </div>
                  </td>
                  <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{monitor.type}</td>
                  <td className="hidden px-4 py-2.5 md:table-cell">
                    <div className="w-32">
                      <HeartbeatBar heartbeat={monitor.heartbeat.slice(-30)} slim />
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span
                      className={`text-xs font-medium ${
                        monitor.uptime24h >= 99.5
                          ? "text-success"
                          : monitor.uptime24h >= 95
                            ? "text-warning"
                            : "text-destructive"
                      }`}
                    >
                      {monitor.uptime24h}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">
                    {monitor.status === "up" ? `${monitor.avgPing}ms` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  label,
  count,
  icon,
  iconBg,
  iconColor,
}: {
  label: string
  count: number
  icon: React.ReactNode
  iconBg: string
  iconColor: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-md ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-foreground">{count}</p>
    </div>
  )
}
