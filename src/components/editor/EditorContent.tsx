import { EditorContent as TiptapContent, Editor } from '@tiptap/react';

interface EditorContentProps {
  editor: Editor;
}

export const EditorContent = ({ editor }: EditorContentProps) => {
  return (
    <TiptapContent
      editor={editor}
      className="prose max-w-none focus:outline-none"
    />
  );
};