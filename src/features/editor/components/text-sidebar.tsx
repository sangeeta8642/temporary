import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

// import { ActiveTool, Editor } from ;
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ActiveTool, Editor } from '../type';
import { Button } from '@/components/ui/button';

type TextSidebarProps = {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (too: ActiveTool) => void;
}

export default function TextSidebar(props: TextSidebarProps) {
    const {
        editor,
        activeTool,
        onChangeActiveTool
    } = props;

    // const initialValue = editor?.getActiveOpacity() ?? 1;

    // const [opacity, setOpacity] = useState<number>(initialValue);

    // const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

    /**
     * Reset the opacity state when the selected object changes.
     */


    /**
     * Handles the close action.
     */
    const handleClose = () => {
        onChangeActiveTool('select');
    };

    /**
     * Handles the opacity change action.
     */


    return (
        <aside
            className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
                activeTool === 'text' ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Text" description="Add test to your canvas" />

            <ScrollArea>
                <div className="space-y-4 border-b p-4">
                    <Button
                        variant="destructive"
                        size="lg"
                        className='w-full h-10'
                        onClick={() => editor?.addText("Textbox")}
                    >
                        <span className='text-xl font-medium'>Add a Textbox</span>
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className='w-full h-16'
                        onClick={() => editor?.addText("Header", {
                            fontSize: 90,
                            fontWeight: 700
                        })}
                    >
                        <span className='text-3xl font-bold'>Add a Heading</span>
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className='w-full h-16'
                        onClick={() => editor?.addText("Subheading", {
                            fontSize: 50,
                            fontWeight: 500
                        })}
                    >
                        <span className='text-xl font-semibold'>Add a Subheading</span>
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className='w-full h-16'
                        onClick={() => editor?.addText("Paragraph", {
                            fontSize: 40,
                        })}
                    >
                        Add a Paragraph
                    </Button>
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={handleClose} />
        </aside>
    );
}