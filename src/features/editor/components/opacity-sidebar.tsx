import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveTool, Editor } from '../type';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { useEffect, useMemo, useState } from 'react';

type OpacitySidebarProps = {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (too: ActiveTool) => void;
}

export default function OpacitySidebar(props: OpacitySidebarProps) {
    const {
        editor,
        activeTool,
        onChangeActiveTool
    } = props;

    const initialValue = editor?.getActiveOpacity() ?? 1;
    const [opacity, setOpacity] = useState(initialValue)
    const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects])


    useEffect(() => {
        if (selectedObject) {
            setOpacity(selectedObject.get("opacity") || 1)
        }
    }, [selectedObject])
    /**
     * Handles the close action.
     */
    const handleClose = () => {
        onChangeActiveTool('select');
    };

    /**
     * Handles the opacity change action.
     */
    const onChange = (value: number) => {
        editor?.changeOpacity(value);
        // setOpacity(value)
    };


    return (
        <aside
            className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
                activeTool === 'opacity' ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Opacity" description="Change the opacity of the selected object" />

            <ScrollArea>
                <div className='p-4 space-y-4 border-b'>
                    <Slider
                        value={[opacity]}
                        onValueChange={(value) => onChange(value[0])}
                        max={1}
                        min={0}
                        step={0.01} 
                    />
                </div>

            </ScrollArea>

            <ToolSidebarClose onClick={handleClose} />
        </aside>
    );
}
