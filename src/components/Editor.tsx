import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorBubbleMenu } from './editor/EditorBubbleMenu';
import { EditorContent } from './editor/EditorContent';

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      Link,
    ],
    content: '',
  });

  if (!editor) return null;

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto p-8">
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;