"use client"

import { useState, useEffect } from "react"
import { StatusDot } from "@/components/status-badge"
import { Search, Plus, ChevronDown } from "lucide-react"
import { AddMonitorDialog } from "./add-monitor-dialog"
import { ApiClient } from "@/src/api-client"
import { MonitorDTO, MonitorStatus } from "@/src/api-client"
import { useToast } from "@/hooks/use-toast"

export function MonitorList({
  selectedId,
  onSelect,
}: {
  selectedId: number | null
  onSelect: (id: number) => void
}) {
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [monitors, setMonitors] = useState<MonitorDTO[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const apiClient = new ApiClient()

  useEffect(() => {
    fetchMonitors()
  }, [])

  const fetchMonitors = async () => {
    try {
      setLoading(true)
      const fetchedMonitors = await apiClient.monitors.getAllMonitorsMonitorAllGet()
      setMonitors(fetchedMonitors)
    } catch (error) {
      console.error("Failed to fetch monitors:", error)
      toast({
        title: "Error",
        description: "Failed to load monitors. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddMonitor = (newMonitor: MonitorDTO) => {
    setMonitors((prevMonitors) => [...prevMonitors, newMonitor])
  }

  const filteredMonitors = monitors.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.url.toLowerCase().includes(search.toLowerCase()),
  )

  const upCount = monitors.filter((m) => m.status === MonitorStatus.UP).length
  const downCount = monitors.filter((m) => m.status === MonitorStatus.DOWN).length

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-success">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-sidebar-foreground">Uptime Monitor</span>
        </div>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          aria-label="Add monitor"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-sidebar-border bg-sidebar-accent/50 py-1.5 pl-8 pr-3 text-xs text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-3 px-4 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {upCount} Up
        </span>
        {downCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
            {downCount} Down
          </span>
        )}
      </div>

      {/* Group header */}
      <button
        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-sidebar-foreground transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronDown size={12} className={`transition-transform ${collapsed ? "-rotate-90" : ""}`} />
        All Monitors ({filteredMonitors.length})
      </button>

      {/* Monitor list */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-1.5 pb-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading monitors...</p>
          ) : filteredMonitors.length === 0 ? (
            <p className="text-center text-muted-foreground">No monitors found.</p>
          ) : (
            filteredMonitors.map((monitor) => (
              <button
                key={monitor.id}
                onClick={() => onSelect(monitor.id)}
                className={`group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                  selectedId === monitor.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {/* <StatusDot status={monitor.status} /> */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{monitor.name}</span>
                    {/* avgPing and heartbeat are not directly available in MonitorDTO */}
                    {/* {monitor.status === "up" && (
                      <span className="shrink-0 text-xs text-muted-foreground">{monitor.avgPing}ms</span>
                    )} */}
                  </div>
                  {/* <div className="mt-1">
                    <HeartbeatBar heartbeat={monitor.heartbeat.slice(-45)} slim />
                  </div> */}
                </div>
              </button>
            ))
          )}
        </div>
      )}
      <AddMonitorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddMonitor={handleAddMonitor}
      />
    </div>
  )
}
