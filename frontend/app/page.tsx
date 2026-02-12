"use client"

import { useState } from "react"
import { monitors } from "@/lib/mock-data"
import { MonitorList } from "@/components/monitor-list"
import { MonitorDetail } from "@/components/monitor-detail"
import { DashboardOverview } from "@/components/dashboard-overview"
import { PanelLeftClose, PanelLeft } from "lucide-react"

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
          <DashboardOverview onSelectMonitor={setSelectedId} />
        )}
      </main>
    </div>
  )
}
