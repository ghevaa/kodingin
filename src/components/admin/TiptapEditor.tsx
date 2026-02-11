'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
    FaBold, FaItalic, FaStrikethrough, FaCode, FaListUl, FaListOl,
    FaQuoteRight, FaUndo, FaRedo, FaLink, FaImage, FaHeading
} from 'react-icons/fa';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        consturl = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="flex flex-wrap gap-2 p-3 bg-[var(--bg-tertiary)]/50 border-b border-[var(--border-color)] rounded-t-xl backdrop-blur-sm">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Bold"
            >
                <FaBold />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Italic"
            >
                <FaItalic />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Strikethrough"
            >
                <FaStrikethrough />
            </button>

            <div className="w-px bg-[var(--border-color)] mx-1 self-stretch"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Heading 2"
            >
                <span className="font-bold text-xs">H2</span>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Heading 3"
            >
                <span className="font-bold text-xs">H3</span>
            </button>

            <div className="w-px bg-[var(--border-color)] mx-1 self-stretch"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Bullet List"
            >
                <FaListUl />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Ordered List"
            >
                <FaListOl />
            </button>

            <div className="w-px bg-[var(--border-color)] mx-1 self-stretch"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Blockquote"
            >
                <FaQuoteRight />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('codeBlock') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Code Block"
            >
                <FaCode />
            </button>

            <div className="w-px bg-[var(--border-color)] mx-1 self-stretch"></div>

            <button
                type="button"
                onClick={setLink}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'}`}
                title="Link"
            >
                <FaLink />
            </button>
            <button
                type="button"
                onClick={addImage}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors"
                title="Image"
            >
                <FaImage />
            </button>

            <div className="w-px bg-[var(--border-color)] mx-1 self-stretch ml-auto"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                title="Undo"
            >
                <FaUndo />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                title="Redo"
            >
                <FaRedo />
            </button>
        </div>
    );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[var(--color-primary-light)] hover:text-[var(--color-primary)] underline decoration-[var(--color-primary)]/30 hover:decoration-[var(--color-primary)] transition-all',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl shadow-lg border border-[var(--border-color)] my-8 max-h-[500px] object-cover mx-auto',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write your story...',
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[300px] px-6 py-4 text-[var(--text-primary)] prose-headings:text-white prose-p:text-[var(--text-secondary)] prose-strong:text-white prose-code:text-[var(--color-primary-light)] prose-pre:bg-[var(--bg-tertiary)] prose-pre:border prose-pre:border-[var(--border-color)] prose-blockquote:border-l-[var(--color-primary)] prose-li:marker:text-[var(--color-primary)]',
            },
        },
        immediatelyRender: false,
    });

    return (
        <div className="border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--bg-tertiary)]/30 focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
