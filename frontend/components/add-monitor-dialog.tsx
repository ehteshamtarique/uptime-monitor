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
import { ApiClient } from "@/src/api-client"
import { MonitorCreateDTO, MonitorType, MonitorDTO } from "@/src/api-client"
import { useToast } from "@/hooks/use-toast"

interface AddMonitorDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddMonitor: (monitor: MonitorCreateDTO) => void
}

export function AddMonitorDialog({ isOpen, onClose, onAddMonitor }: AddMonitorDialogProps) {
  const [monitorType, setMonitorType] = useState<MonitorType>(MonitorType.HTTP_S_)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const apiClient = new ApiClient()

  const handleSubmit = async () => {
    if (!name || !url) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const newMonitor: MonitorCreateDTO = {
        name,
        url,
        monitor_type: monitorType,
      }
      await apiClient.monitors.createMonitorMonitorPost(newMonitor)
      toast({
        title: "Success",
        description: "Monitor added successfully!",
      })
      onAddMonitor(newMonitor) // Pass the new monitor data up
      onClose()
    } catch (error) {
      console.error("Failed to add monitor:", error)
      toast({
        title: "Error",
        description: "Failed to add monitor. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
            <Select value={monitorType} onValueChange={(value: MonitorType) => setMonitorType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(MonitorType).map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
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
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Monitor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
