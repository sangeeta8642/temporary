import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

// import { ActiveTool, Editor } from ;
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import { ActiveTool, Editor } from '../type';
import { FONTS } from '../constants';
import { Button } from '@/components/ui/button';

type FontSideProps = {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (too: ActiveTool) => void;
}

export default function FontSidebar(props: FontSideProps) {
    const {
        editor,
        activeTool,
        onChangeActiveTool
    } = props;

    const value = editor?.getActiveFontFamily()

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
                activeTool === 'font' ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Font" description="change the font" />

            <ScrollArea>
                <div className="space-y-4 border-b p-4">
                    {FONTS.map((font) => (
                        <Button
                            key={font}
                            variant="secondary"
                            size="lg"
                            className={cn(
                                'w-full h-16 justify-start text-left',
                                value === font && "border-2 border-blue-500"
                            )}
                            style={{
                                fontFamily: font,
                                fontSize: "16px",
                                padding: "8px 16px"
                            }}
                            onClick={() => editor?.changeFontFamily(font)}
                        >
                            {font}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={handleClose} />
        </aside>
    );
}