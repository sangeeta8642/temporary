"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useEditor } from '@/features/editor/Hooks/useEditor'
import { fabric } from 'fabric'
import { Navbar } from '@/features/editor/components/navbar'
import Sidebar from '@/features/editor/components/sidebar'
import Toolbar from '@/features/editor/components/toolbar'
import Footer from '@/features/editor/components/footer'
import { ActiveTool } from '@/features/editor/type'
import ShapeSidebar from './shape-sidebar'
import FillColorSidebar from './fill-color-sidebar'
import TextSidebar from './text-sidebar'
import FontSidebar from './font-sidebar'
import StrokeColorSidebar from './stroke-color-sidebar';
import StrokeOptionsSidebar from './stroke-options-sidebar'
import OpacitySidebar from './opacity-sidebar'
import ImageSidebar from './images-sidebar'
import FilterSidebar from './filter-sidebar';
import AiSidebar from './ai-sidebar'
import RemoveBgSidebar from './removebg-sidebar'
import DrawSidebar from './draw-sidbar'
import { SELECTION_DEPENDENT_TOOLS } from '../constants'
import SettingsSidebar from './settings-sidebar'



const Editor = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>("select")

    const handleClearSelection = useCallback(() => {
        if (SELECTION_DEPENDENT_TOOLS.includes(activeTool)) {
            setActiveTool('select');
        }
    }, [activeTool]);


    const { init, editor } = useEditor({ clearSelectionCallback: handleClearSelection })
    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)
    // const { init, editor } = useEditor({ clearSelectionCallback: handleClearSelection });

    const onChangeActiveTool = useCallback((tool: ActiveTool) => {

        if (tool === "draw") {
            //TODO:Enable draw mode
            editor?.disableDrawMode();
        }

        if (activeTool === "draw") {
            //TODO:Disable draw mode
            editor?.enableDrawMode();
        }
        if (tool === activeTool) {
            return setActiveTool("select")
        }

        setActiveTool(tool)
    }, [activeTool, editor])

    useEffect(() => {
        const canvas = new fabric.Canvas(
            canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true
        })

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!
        })

        return () => {
            canvas.dispose()
        }
    }, [init])


    return (
        <div className='flex h-full flex-col'>
            <Navbar
            editor={editor}
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FillColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <StrokeOptionsSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <OpacitySidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ImageSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <TextSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FontSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FilterSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <AiSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <RemoveBgSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <DrawSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <SettingsSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <main className='bg-muted flex-1 overflow-auto related flex flex-col'>
                    <Toolbar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                        key={JSON.stringify(editor?.canvas.getActiveObject())}
                    />
                    <div className='flex-1 h-[calc(100%-124px)] bg-muted' ref={containerRef}>
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer  editor={editor} />
                </main>
            </div>
        </div>
    )
}

export default Editor