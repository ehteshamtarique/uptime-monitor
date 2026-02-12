import type { MonitorStatus } from "@/lib/mock-data"

const config: Record<MonitorStatus, { label: string; dot: string; bg: string; text: string }> = {
  up: { label: "Up", dot: "bg-success", bg: "bg-success/10", text: "text-success" },
  down: { label: "Down", dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  pending: { label: "Pending", dot: "bg-pending", bg: "bg-pending/10", text: "text-pending" },
  maintenance: { label: "Maintenance", dot: "bg-muted-foreground", bg: "bg-muted/50", text: "text-muted-foreground" },
}

export function StatusBadge({ status }: { status: MonitorStatus }) {
  const { label, dot, bg, text } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${bg} ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}

export function StatusDot({ status }: { status: MonitorStatus }) {
  const dotColor = config[status].dot
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotColor}`} />
}
