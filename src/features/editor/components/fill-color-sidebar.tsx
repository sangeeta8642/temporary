import React from 'react'
import { ActiveTool, Editor, FILL_COLOR } from '../type'
import { IoTriangle } from 'react-icons/io5'
import { cn } from '@/lib/utils'
import ToolSidebarHeader from './tool-sidebar-header'
import ToolSidebarClose from './tool-sidebar-close'
import { ScrollArea } from '@/components/ui/scroll-area'
import ShapeTool from './shape-tool'
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa'
import { FaDiamond } from 'react-icons/fa6'
import { ColorPicker } from './color-picker'

interface FillColorSidebarProps {
    activeTool: ActiveTool,
    editor: Editor | undefined,
    onChangeActiveTool: (tool: ActiveTool) => void
}

const FillColorSidebar = ({ activeTool, editor, onChangeActiveTool }: FillColorSidebarProps) => {
    const value = editor?.fillColor || FILL_COLOR


    const onClose = () => {
        onChangeActiveTool("select")
    }

    const onChange = (value: string) => {
        editor?.changeFillColor(value)
    }

    return (
        <aside className={cn(
            "flex flex-col border-r h-full bg-white relative z-[40] w-[360px]",
            activeTool === "fill" ? "visible" : "hidden"
        )}>
            <ToolSidebarHeader
                title='Fill Colour'
                description='Add fill color to your element'
            />

            <ScrollArea>
                <div className="space-y-6 p-4">
                    <ColorPicker
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </ScrollArea>

            <ToolSidebarClose
                onClick={onClose}
            />
        </aside>
    )
}

export default FillColorSidebar