import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorBubbleMenu } from './editor/EditorBubbleMenu';
import { EditorHeader } from './editor/EditorHeader';
import { EditorCommandMenu } from './editor/EditorCommandMenu';
import { useEditorStore } from '../store/editor';
import { useEffect } from 'react';

const Editor = () => {
  const { currentPage, updatePage } = useEditorStore();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Type "/" for commands...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: currentPage?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      if (currentPage) {
        updatePage({
          ...currentPage,
          content: editor.getHTML(),
          updated_at: new Date().toISOString(),
        });
      }
    },
  });

  useEffect(() => {
    if (editor && currentPage) {
      editor.commands.setContent(currentPage.content);
    }
  }, [currentPage?.id, editor]);

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <EditorHeader />
      <EditorBubbleMenu editor={editor} />
      <EditorCommandMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;