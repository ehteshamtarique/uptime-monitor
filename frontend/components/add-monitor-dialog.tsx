"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Monitor } from "@/lib/mock-data"

interface AddMonitorDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddMonitor: (monitor: Omit<Monitor, "id" | "status" | "uptime24h" | "uptime30d" | "avgPing" | "heartbeat" | "tags" | "responseTimes" | "certificateExpiry">) => void
}

export function AddMonitorDialog({ isOpen, onClose, onAddMonitor }: AddMonitorDialogProps) {
  const [monitorType, setMonitorType] = useState<Monitor["type"]>("HTTP(s)")
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = () => {
    // Basic validation
    if (!name || !url) {
      alert("Please fill in all fields.")
      return
    }

    onAddMonitor({
      type: monitorType,
      name,
      url,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Monitor</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new uptime monitor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monitor-type" className="text-right">
              Monitor Type
            </Label>
            <Select value={monitorType} onValueChange={(value: Monitor["type"]) => setMonitorType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HTTP(s)">HTTP(s)</SelectItem>
                <SelectItem value="TCP">TCP</SelectItem>
                <SelectItem value="Ping">Ping</SelectItem>
                <SelectItem value="DNS">DNS</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="Push">Push</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Friendly Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="e.g. My Website"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL or IP
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Monitor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
