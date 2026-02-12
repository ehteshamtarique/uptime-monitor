"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function ResponseChart({ data }: { data: number[] }) {
  const chartData = data.map((value, index) => ({
    time: `${index}m`,
    ping: value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="pingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(142, 72%, 45%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(142, 72%, 45%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={Math.floor(data.length / 6)}
        />
        <YAxis
          tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          unit="ms"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(220, 18%, 13%)",
            border: "1px solid hsl(220, 14%, 20%)",
            borderRadius: "8px",
            fontSize: "12px",
            color: "hsl(210, 20%, 92%)",
          }}
          labelStyle={{ color: "hsl(215, 12%, 55%)" }}
          formatter={(value: number) => [`${value}ms`, "Response Time"]}
        />
        <Area
          type="monotone"
          dataKey="ping"
          stroke="hsl(142, 72%, 45%)"
          strokeWidth={1.5}
          fill="url(#pingGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
