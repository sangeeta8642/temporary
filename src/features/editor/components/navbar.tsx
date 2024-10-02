"use client"
import React from 'react';
import Logo from '@/features/editor/components/logo'
import { useFilePicker } from 'use-file-picker';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, MousePointerClick, Undo2, Redo2, Download } from 'lucide-react'
import { CiFileOn } from 'react-icons/ci'
import { Separator } from '@/components/ui/separator'
import Hint from '@/components/hint'
import { BsCloudCheck } from 'react-icons/bs'
import { ActiveTool, Editor } from '../type'
import { cn } from '@/lib/utils'

interface NavbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool,
    onChangeActiveTool: (tool: ActiveTool) => void
}


export const Navbar = ({
    editor,
    activeTool,
    onChangeActiveTool
}: NavbarProps) => {

    const { openFilePicker } = useFilePicker({
        accept: '.json',
        onFilesSuccessfullySelected: ({ plainFiles }: any) => {
            if (plainFiles && plainFiles.length > 0) {
                const file = plainFiles[0];
                const reader = new FileReader();

                reader.readAsText(file, 'UTF-8');
                reader.onload = () => {
                    editor?.loadJson(reader.result as string);
                };
            }
        }
    });

    /**
     * Handles the JSON export action.
     */
    const handleExportJson = () => {
        editor?.saveJson();
    };

    /**
     * Handles the PNG export action.
     */
    const handleExportPng = () => {
        editor?.savePng();
    };

    /**
     * Handles the JPG export action.
     */
    const handleExportJpg = () => {
        editor?.saveJpg();
    };

    /**
     * Handles the SVG export action.
     */
    const handleExportSvg = () => {
        editor?.saveSvg();
    };


    const handleUndo = () => {
        editor?.undo();
    };

    /**
     * Handles the redo action.
     */
    const handleRedo = () => {
        editor?.redo();
    };


    return (
        <nav className='w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]'>
            <Logo />
            <div className="w-full flex items-center gap-x-1 h-full">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                            File
                            <ChevronDown className='size-4 ml-2' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' className='min-w-60' >
                        <DropdownMenuItem
                            className='flex items-center gap-x-2'
                            onClick={openFilePicker}
                        >
                            <CiFileOn className='size-8' />
                            <div>
                                <p>Open</p>
                                <p className='text-xs text-muted-foreground'>
                                    Open a JSON file
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation='vertical' />
                <Hint label='Select' side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onChangeActiveTool("select")}
                        className={cn(activeTool === "select" && "bg-gray-100")}
                    >
                        <MousePointerClick className='size-4' />
                    </Button>
                </Hint>
                <Hint label='Undo' side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleUndo}
                        disabled={!editor?.canUndo()}
                    >
                        <Undo2 className='size-4' />
                    </Button>
                </Hint>
                <Hint label='Redo' side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRedo}
                        disabled={!editor?.canRedo()}
                    >
                        <Redo2 className='size-4' />
                    </Button>
                </Hint>
                <Separator orientation='vertical' />
                <div className='flex items-center gap-x-2'>
                    <BsCloudCheck className="size-[20px] text-muted-foreground" />
                    <div className='text-xs text-muted-foreground' >Saved</div>
                </div>
                <div className='ml-auto flex items-center gap-x-4'>
                    <DropdownMenu modal={false} >
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                                Export
                                <Download className='size-4 ml-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-60" >
                            <DropdownMenuItem
                                className='flex items-center gap-x-2'
                                onClick={handleExportJson}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>JSON</p>
                                    <p className='text-xs text-muted-foreground'>Save for later editing</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className='flex items-center gap-x-2'
                                onClick={handleExportPng}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>PNG</p>
                                    <p className='text-xs text-muted-foreground'>Best for sharing on web</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className='flex items-center gap-x-2'
                                onClick={handleExportJpg}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>JPG</p>
                                    <p className='text-xs text-muted-foreground'>Best for printing</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className='flex items-center gap-x-2'
                                onClick={handleExportSvg}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>SVG</p>
                                    <p className='text-xs text-muted-foreground'>Best for editing vector software</p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Add user button component */}
                </div>
            </div>
        </nav>
    )
}

