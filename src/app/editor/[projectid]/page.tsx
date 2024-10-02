import Editor from '@/features/editor/components/editor';
import { protectServer } from '@/features/auth/utils';

export default async function EditorProjectIdPage() {
    await protectServer();

    return <Editor />;
}