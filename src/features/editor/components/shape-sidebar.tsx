import React from 'react'
import { ActiveTool, Editor } from '../type'
import { IoTriangle } from 'react-icons/io5'
import { cn } from '@/lib/utils'
import ToolSidebarHeader from './tool-sidebar-header'
import ToolSidebarClose from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import ShapeTool from './shape-tool'
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa'
import { FaDiamond } from 'react-icons/fa6'

interface ShapeSidebarProps {
  activeTool: ActiveTool,
  editor: Editor | undefined,
  onChangeActiveTool: (tool: ActiveTool) => void
}

const ShapeSidebar = ({ activeTool, editor, onChangeActiveTool }: ShapeSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool("select")
  }

  return (
    <aside className={cn(
      "flex flex-col border-r h-full bg-white relative z-[40] w-[360px]",
      activeTool === "shapes" ? "visible" : "hidden"
    )}>
      <ToolSidebarHeader
        title='Shapes'
        description='Add shapes to your canvas'
      />

      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            onClick={() => editor?.addCircle()}
            icon={FaCircle}
          />
          <ShapeTool
            onClick={() => editor?.addSoftRectangle()}
            icon={FaSquare}
          />
          <ShapeTool
            onClick={() => editor?.addRectangle()}
            icon={FaSquareFull}
          />
          <ShapeTool
            onClick={() => editor?.addTriagle()}
            icon={IoTriangle}
          />
          <ShapeTool
            onClick={() => editor?.addInverseTriagle()}
            icon={IoTriangle}
            iconClassName='rotate-180'
          />
          <ShapeTool
            onClick={() => editor?.addDiamond()}
            icon={FaDiamond}
          />
        </div>
      </ScrollArea>

      <ToolSidebarClose
        onClick={onClose}
      />
    </aside>
  )
}

export default ShapeSidebar