export type MonitorStatus = "up" | "down" | "pending" | "maintenance"

export type HeartbeatEntry = {
  status: MonitorStatus
  time: string
  ping: number
}

export type Monitor = {
  id: number
  name: string
  url: string
  type: "HTTP(s)" | "TCP" | "Ping" | "DNS" | "Docker" | "Push"
  status: MonitorStatus
  uptime24h: number
  uptime30d: number
  avgPing: number
  heartbeat: HeartbeatEntry[]
  tags: { name: string; color: string }[]
  certificateExpiry?: number
  responseTimes: number[]
}

function generateHeartbeat(status: MonitorStatus, count = 90): HeartbeatEntry[] {
  const entries: HeartbeatEntry[] = []
  const now = Date.now()
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now - i * 60000).toISOString()
    const isDown = status === "down" && i < 5
    const isMaintenance = status === "maintenance"
    let entryStatus: MonitorStatus = "up"
    if (isDown) entryStatus = "down"
    else if (isMaintenance) entryStatus = "maintenance"
    else if (Math.random() < 0.02) entryStatus = "down"

    entries.push({
      status: entryStatus,
      time,
      ping: entryStatus === "up" ? Math.floor(Math.random() * 200 + 20) : 0,
    })
  }
  return entries
}

function generateResponseTimes(count = 48): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 180 + 30))
}

export const monitors: Monitor[] = [
  {
    id: 1,
    name: "Google",
    url: "https://google.com",
    type: "HTTP(s)",
    status: "up",
    uptime24h: 100,
    uptime30d: 99.98,
    avgPing: 52,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Search", color: "#22c55e" }],
    certificateExpiry: 364,
    responseTimes: generateResponseTimes(),
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com",
    type: "HTTP(s)",
    status: "up",
    uptime24h: 100,
    uptime30d: 99.95,
    avgPing: 87,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Dev", color: "#3b82f6" }],
    certificateExpiry: 120,
    responseTimes: generateResponseTimes(),
  },
  {
    id: 3,
    name: "API Server",
    url: "https://api.example.com/health",
    type: "HTTP(s)",
    status: "up",
    uptime24h: 99.9,
    uptime30d: 99.8,
    avgPing: 145,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "API", color: "#f59e0b" }, { name: "Production", color: "#22c55e" }],
    certificateExpiry: 45,
    responseTimes: generateResponseTimes(),
  },
  {
    id: 4,
    name: "Database Primary",
    url: "192.168.1.100:5432",
    type: "TCP",
    status: "up",
    uptime24h: 100,
    uptime30d: 99.99,
    avgPing: 3,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Database", color: "#8b5cf6" }],
    responseTimes: generateResponseTimes(),
  },
  {
    id: 5,
    name: "CDN Edge",
    url: "https://cdn.example.com",
    type: "HTTP(s)",
    status: "down",
    uptime24h: 95.2,
    uptime30d: 99.1,
    avgPing: 0,
    heartbeat: generateHeartbeat("down"),
    tags: [{ name: "CDN", color: "#ef4444" }],
    certificateExpiry: 200,
    responseTimes: generateResponseTimes(),
  },
  {
    id: 6,
    name: "Mail Server",
    url: "mail.example.com",
    type: "TCP",
    status: "up",
    uptime24h: 100,
    uptime30d: 99.97,
    avgPing: 22,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Email", color: "#06b6d4" }],
    responseTimes: generateResponseTimes(),
  },
  {
    id: 7,
    name: "Auth Service",
    url: "https://auth.example.com/status",
    type: "HTTP(s)",
    status: "up",
    uptime24h: 100,
    uptime30d: 99.92,
    avgPing: 110,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Auth", color: "#f59e0b" }, { name: "Production", color: "#22c55e" }],
    certificateExpiry: 89,
    responseTimes: generateResponseTimes(),
  },
  {
    id: 8,
    name: "Redis Cache",
    url: "192.168.1.101:6379",
    type: "TCP",
    status: "up",
    uptime24h: 100,
    uptime30d: 100,
    avgPing: 1,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Cache", color: "#dc2626" }],
    responseTimes: generateResponseTimes(),
  },
  {
    id: 9,
    name: "Staging Server",
    url: "https://staging.example.com",
    type: "HTTP(s)",
    status: "maintenance",
    uptime24h: 0,
    uptime30d: 85.5,
    avgPing: 0,
    heartbeat: generateHeartbeat("maintenance"),
    tags: [{ name: "Staging", color: "#6b7280" }],
    certificateExpiry: 300,
    responseTimes: generateResponseTimes(),
  },
  {
    id: 10,
    name: "DNS Check",
    url: "example.com",
    type: "DNS",
    status: "up",
    uptime24h: 100,
    uptime30d: 100,
    avgPing: 15,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "DNS", color: "#10b981" }],
    responseTimes: generateResponseTimes(),
  },
  {
    id: 11,
    name: "Docker Registry",
    url: "registry.example.com:5000",
    type: "Docker",
    status: "up",
    uptime24h: 99.8,
    uptime30d: 99.7,
    avgPing: 34,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Docker", color: "#2563eb" }],
    responseTimes: generateResponseTimes(),
  },
  {
    id: 12,
    name: "Webhook Endpoint",
    url: "https://hooks.example.com/ingest",
    type: "Push",
    status: "up",
    uptime24h: 100,
    uptime30d: 99.88,
    avgPing: 67,
    heartbeat: generateHeartbeat("up"),
    tags: [{ name: "Webhooks", color: "#a855f7" }],
    certificateExpiry: 160,
    responseTimes: generateResponseTimes(),
  },
]

export const overallUptime = 99.4
export const upCount = monitors.filter((m) => m.status === "up").length
export const downCount = monitors.filter((m) => m.status === "down").length
export const maintenanceCount = monitors.filter((m) => m.status === "maintenance").length
export const pendingCount = monitors.filter((m) => m.status === "pending").length
