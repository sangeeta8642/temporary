import React, { useState } from 'react'
import { ActiveTool, Editor, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from '../type'
import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isTextType, isImageType } from '../utils'
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Copy, SquareSplitHorizontal, Trash } from 'lucide-react'
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa'
import FontSizeInput from './font-size-input'
import { STROKE_COLOR } from '../constants'
import { BsBorderWidth } from 'react-icons/bs'
import { RxTransparencyGrid } from 'react-icons/rx'
import { TbColorFilter } from 'react-icons/tb';

interface ToolbarProps {
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool: ActiveTool) => void
}

const Toolbar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ToolbarProps) => {

    const selectedObject = editor?.canvas.getActiveObject()
    const selectedObjectType = editor?.selectedObjects[0]?.type
    const isText = isTextType(selectedObjectType)

    const initalFillColor = editor?.getActiveFillColor()
    const initalFontFamily = editor?.getActiveFontFamily() ?? FONT_FAMILY
    const initialFontWeight = editor?.getActiveFontWeight() ?? FONT_WEIGHT;
    const initialFontStyle = editor?.getActiveFontStyle()
    const initialFontLinethrough = editor?.getActiveFontLinethrough()
    const initialFontUnderline = editor?.getActiveFontUnderline()
    const initialTextAlign = editor?.getActiveTextAlign()
    const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE
    const initialStrokeColor = editor?.getActiveStrokeColor() ?? STROKE_COLOR


    const [properties, setProperties] = useState({
        fontWeight: initialFontWeight,
        fontFamily: initalFontFamily,
        fillColor: initalFillColor,
        fontStyle: initialFontStyle,
        fontLinethrough: initialFontLinethrough,
        fontUnderline: initialFontUnderline,
        textAlign: initialTextAlign,
        fontSize: initialFontSize,
        strokeColor: initialStrokeColor
    })
    const isBold = properties.fontWeight > 500;
    const getProperty = (property: any) => {
        if (!selectedObject) return null

        return selectedObject.get(property)
    }

    const isImage = isImageType(selectedObjectType);


    if (editor?.selectedObjects.length === 0) {
        return (

            <div className='shrink-0 h-[56px] border-b bg-white 
           w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'/>
        )
    }

    const toggleBold = () => {
        const newValue = isBold ? 500 : 700;

        editor?.changeFontWeight(newValue);
        setProperties((prev) => ({
            ...prev,
            fontWeight: newValue
        }));
    };
    const toggleItalic = () => {
        const selectedObject = editor?.selectedObjects[0]

        if (!selectedObject) {
            return
        }

        const isItalic = properties.fontStyle === "italic"
        const newValue = isItalic ? "normal" : "italic"

        editor?.changeFontStyle(newValue)
        setProperties((current) => ({
            ...current,
            fontStyle: newValue
        }))
    }
    const toggleLinethrough = () => {
        const selectedObject = editor?.selectedObjects[0]

        if (!selectedObject) {
            return
        }
        const newValue = properties.fontLinethrough ? false : true

        editor?.changeFontLinethrough(newValue)
        setProperties((current) => ({
            ...current,
            fontLinethrough: newValue
        }))
    }
    const toggleUnderline = () => {
        const selectedObject = editor?.selectedObjects[0]

        if (!selectedObject) {
            return
        }
        const newValue = properties.fontUnderline ? false : true

        editor?.changeFontUnderline(newValue)
        setProperties((current) => ({
            ...current,
            fontUnderline: newValue
        }))
    }

    const onChangeTextAlign = (value: string) => {
        const selectedObject = editor?.selectedObjects[0]

        if (!selectedObject) {
            return
        }

        editor?.changeTextAlign(value)
        setProperties((current) => ({
            ...current,
            textAlign: value
        }))
    }

    const onChangeFontSize = (value: number) => {
        if (!selectedObject) {
            return
        }

        editor?.changeFontSize(value)
        setProperties((current) => ({
            ...current,
            fontSize: value
        }))
    }

    const handleDuplicate = () => {
        editor?.copy();
        editor?.paste();
    };


    return (
        <div className='shrink-0 h-[56px] border-b bg-white 
        w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'>
            <div className='flex items-center h-full justify-center'>
                <Hint label='Color' side='bottom' sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "fill" && "bg-gray-100"
                        )}
                    >
                        <div
                            className='rounded-sm size-4 border'
                            style={{ backgroundColor: properties.fillColor }}
                        />
                    </Button>
                </Hint>
                <Hint
                    side="bottom"
                    sideOffset={5}
                    label="Stroke color"
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onChangeActiveTool('stroke-color')}
                        className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
                    >
                        <div className="size-4 rounded-sm border-2 bg-white" style={{ borderColor: properties.strokeColor }} />
                    </Button>
                </Hint>
                <Hint
                    side="bottom"
                    sideOffset={5}
                    label="Stroke width"
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onChangeActiveTool('stroke-width')}
                        className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
                    >
                        <BsBorderWidth className='size-4' />
                    </Button>
                </Hint>
                <Hint
                    side="bottom"
                    sideOffset={5}
                    label="Bring forward"
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => editor?.bringForward()}
                    >
                        <ArrowUp className='size-4' />
                    </Button>
                </Hint>
                <Hint
                    side="bottom"
                    sideOffset={5}
                    label="send backwards"
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => editor?.sendBackwards()}
                    >
                        <ArrowDown className='size-4' />
                    </Button>
                </Hint>
                <Hint
                    side="bottom"
                    sideOffset={5}
                    label="Opacity"
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onChangeActiveTool("opacity")}
                        className={cn(activeTool === 'opacity' && 'bg-gray-100')}
                    >
                        <RxTransparencyGrid className='size-4' />
                    </Button>
                </Hint>
                <Hint
                    side="bottom"
                    sideOffset={5}
                    label="Duplicate"
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleDuplicate}
                    >
                        <Copy className='size-4' />
                    </Button>
                </Hint>

                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Font' side='bottom' sideOffset={5}>
                            <Button
                                onClick={() => onChangeActiveTool("font")}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    "w-auto px-2 text-sm",
                                    activeTool === "font" && "bg-gray-100"
                                )}
                            >
                                <div className='max-w-[100px] truncate'>{properties.fontFamily}</div>
                                <ChevronDown className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isImage && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Filters' side='bottom' sideOffset={5}>
                            <Button
                                onClick={() => onChangeActiveTool("filter")}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    "w-auto px-2 text-sm",
                                    activeTool === "filter" && "bg-gray-100"
                                )}
                            >
                                <TbColorFilter className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isImage && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Remove background' side='bottom' sideOffset={5}>
                            <Button
                                onClick={() => onChangeActiveTool("remove-bg")}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    "w-auto px-2 text-sm",
                                    activeTool === "remove-bg" && "bg-gray-100"
                                )}
                            >
                                <SquareSplitHorizontal className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}


                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Bold' side='bottom' sideOffset={5}>
                            <Button
                                onClick={toggleBold}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    isBold && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <FaBold className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Italic' side='bottom' sideOffset={5}>
                            <Button
                                onClick={toggleItalic}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    properties.fontStyle === "italic" && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <FaItalic className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Underline' side='bottom' sideOffset={5}>
                            <Button
                                onClick={toggleUnderline}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    properties.fontUnderline && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <FaUnderline className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Strike' side='bottom' sideOffset={5}>
                            <Button
                                onClick={toggleLinethrough}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    properties.fontLinethrough && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <FaStrikethrough className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Align left' side='bottom' sideOffset={5}>
                            <Button
                                onClick={() => onChangeTextAlign("left")}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    properties.textAlign === "left" && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <AlignLeft className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Align center' side='bottom' sideOffset={5}>
                            <Button
                                onClick={() => onChangeTextAlign("center")}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    properties.textAlign === "center" && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <AlignCenter className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <Hint label='Align right' side='bottom' sideOffset={5}>
                            <Button
                                onClick={() => onChangeTextAlign("right")}
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    // "w-auto px-2 text-sm",
                                    properties.textAlign === "right" && "bg-gray-100"
                                )}
                            >
                                {/* <div className='max-w-[100px] truncate'>{fontFamily}</div> */}
                                <AlignRight className='size-4' />
                            </Button>
                        </Hint>
                    </div>
                )}
                {isText && (
                    <div className='flex items-center h-full justify-center'>
                        <FontSizeInput
                            value={properties.fontSize}
                            onChange={onChangeFontSize}
                        />
                    </div>
                )}
                <div className='flex items-center h-full justify-center'>
                    <Hint label='Delete' side='bottom' sideOffset={5}>
                        <Button
                            onClick={() => editor?.delete()}
                            size="icon"
                            variant="ghost"
                        >
                            <Trash className='size-4' />
                        </Button>
                    </Hint>
                </div>
            </div>
        </div>
    )
}

export default Toolbar