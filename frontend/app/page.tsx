"use client"

import { useState, useEffect } from "react"
import { MonitorList } from "@/components/monitor-list"
import { MonitorDetail } from "@/components/monitor-detail"
import { DashboardOverview } from "@/components/dashboard-overview"
import { PanelLeftClose, PanelLeft } from "lucide-react"
import { ApiClient, MonitorDTO } from "@/src/api-client"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
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

  const selectedMonitor = monitors.find((m) => m.id === selectedId) ?? null

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`shrink-0 border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0"
        } overflow-hidden`}
      >
        <MonitorList
          monitors={monitors}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
          </button>
          <nav className="flex items-center gap-1 text-xs text-muted-foreground">
            <button
              onClick={() => setSelectedId(null)}
              className="rounded px-1.5 py-0.5 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Dashboard
            </button>
            {selectedMonitor && (
              <>
                <span>/</span>
                <span className="text-foreground">{selectedMonitor.name}</span>
              </>
            )}
          </nav>
        </div>

        {/* Content */}
        {selectedMonitor ? (
          <MonitorDetail monitor={selectedMonitor} />
        ) : (
          <DashboardOverview monitors={monitors} onSelectMonitor={setSelectedId} />
        )}
      </main>
    </div>
  )
}
