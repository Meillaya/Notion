import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { useEditorStore } from '../store/editor';
import { useEffect } from 'react';
import { EditorBubbleMenu } from './editor/EditorBubbleMenu';
import { EditorCommandMenu } from './editor/EditorCommandMenu';
import { EditorHeader } from './editor/EditorHeader';
import { EditorToolbar } from './editor/EditorToolbar';

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
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2 bg-gray-100',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2',
        },
      }),
    ],
    content: currentPage?.content || '<p>Start writing here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-4',
      },
      handleKeyDown: (view, event) => {
        if (event.key === '/' && !event.isComposing) {
          view.dispatch(view.state.tr.insertText('/'));
          editor?.emit('slash');
          return true;
        }
        return false;
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
      editor.commands.setContent(currentPage.content || '<p>Start writing here...</p>');
    }
  }, [currentPage?.id, editor]);

  if (!editor || !currentPage) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Select or create a page</h2>
          <p className="text-gray-500">Choose a page from the sidebar to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EditorHeader />
      <EditorToolbar editor={editor} />
      <EditorBubbleMenu editor={editor} />
      <EditorCommandMenu editor={editor} />
      <div className="px-8 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;