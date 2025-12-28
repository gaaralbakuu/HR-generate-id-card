import { Group, Panel, Separator } from "react-resizable-panels"
import { cn } from "@/lib/utils"

function ResizablePanelGroup({ className, ...props }) {
  return (
    <Group
      className={cn("flex h-full w-full", className)}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }) {
  return <Panel className={className} {...props} />
}

function ResizableHandle({ withHandle, className, ...props }) {
  return (
    <Separator
      className={cn(
        "relative flex w-1 items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors",
        "data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-gray-400 h-6 w-1 rounded-full z-10 absolute" />
      )}
    </Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
