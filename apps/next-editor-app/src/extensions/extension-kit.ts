'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'
import { lowlight } from 'lowlight'

import {
  AiImage,
  AiWriter,
  // BulletList,
  BlockquoteFigure,
  BlockTile,
  CharacterCount,
  CodeBlockLowlight,
  Document,
  Dropcursor,
  Emoji,
  EmojiSuggestion,
  Figcaption,
  FileHandler,
  Focus,
  // EnSlashExtension,
  FontSize,
  Gapcursor,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  ImageBlock,
  ImageUpload,
  Link,
  Mention,
  Placeholder,
  Selection,
  SlashCommand,
  Suggestion,
  Table,
  TableCell,
  TableHeader,
  TableOfContents,
  TableRow,
  TaskKit,
  TextKit,
  TrailingNode,
  Uuid,
  // ZhSlashExtension,
  // Color,
  // Document,
  // Dropcursor,
  // Emoji,
  // Figcaption,
  // FileHandler,
  // Focus,
  // FontFamily,
  // FontSize,
  // Heading,
  // Highlight,
  // HorizontalRule,
  // ImageBlock,
  // Link,
  // Placeholder,
  // Selection,
  // SlashCommand,
  // StarterKit,
  // Subscript,
  // Superscript,
  // Table,
  // TableOfContents,
  // TableCell,
  // TableHeader,
  // TableRow,
  // TextAlign,
  // TextStyle,
  // TrailingNode,
  // Typography,
  // Underline,
  // emojiSuggestion,
  // Columns,
  // Column,
  // TaskItem,
  // TaskList,
} from '.'
import { placeholders } from './constants'

import API from '~/helpers/api'
interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
  userId?: string
  userName?: string
  userColor?: string
}

export const ExtensionKit = ({ provider, userId, userName = 'Maxi' }: ExtensionKitProps) => [
  AiWriter.configure({
    authorId: userId,
    authorName: userName,
  }),
  AiImage.configure({
    authorId: userId,
    authorName: userName,
    baseUrl: '/ai',
  }),
  // BulletList,
  BlockTile,
  BlockquoteFigure,
  CharacterCount.configure({ limit: 50000 }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  Document,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: EmojiSuggestion,
  }),
  Focus,
  FontSize,
  Figcaption,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (editor, files, pos) => {
      files.forEach(async file => {
        const url = await API.uploadImage(file)

        editor
          .chain()
          .setImageBlockAt({ pos, src: url as string })
          .focus()
          .run()
      })
    },
    onPaste: (editor, files) => {
      files.forEach(async file => {
        const url = await API.uploadImage(file)

        return editor
          .chain()
          .setImageBlockAt({ pos: editor.state.selection.anchor, src: url as string })
          .focus()
          .run()
      })
    },
  }),
  Gapcursor,
  HorizontalRule,
  History,
  Highlight.configure({ multicolor: true }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  ImageBlock,
  ImageUpload.configure({
    clientId: provider?.document?.clientID,
  }),
  Link,
  Mention,
  Placeholder.configure({
    placeholder: ({ node, editor }) => {
      // if (node.type.name === "title") {
      //   return editor.isEditable ? "请输入标题" : "未命名文档";
      // }

      if (!editor.isEditable) return
      return placeholders[~~(Math.random() * placeholders.length)]
    },
    includeChildren: true,
    considerAnyAsEmpty: true,
    showOnlyCurrent: true,
    showOnlyWhenEditable: true,
  }),
  // Document.extend({ content: 'blockTile+' }),
  TextKit,
  TaskKit.configure({
    taskItem: { nested: true },
  }),
  Table,
  TableCell,
  TableHeader,
  TableOfContents,
  TableRow,
  Suggestion,
  // EnSlashExtension,
  // ZhSlashExtension,
  SlashCommand,
  Selection,
  TrailingNode,
  Uuid,
  // Mind.configure({
  //   getCreateUserId: () => "xulai",
  // }),
  // Excalidraw,
  // Flow,
  // EventEmitter,
  // ...LinkExtensions,
  // ...BoldExtensions,
  // ...SlashExtensions,
  // ...CodeBlockExtensions,
  // ...CalloutExtensions,
  // ...StatusExtensions,
  // ...MentionExtensions,
  // Columns,
  // TaskList,
  // TaskItem.configure({
  //   nested: true,
  // }),
  // AiWriter.configure({
  //   authorId: userId,
  //   authorName: userName,
  // }),
  // AiImage.configure({
  //   authorId: userId,
  //   authorName: userName,
  // }),
  // Column,
  // Selection,
  // Heading.configure({
  //   levels: [1, 2, 3, 4, 5, 6],
  // }),
  // HorizontalRule,
  // StarterKit.configure({
  //   document: false,
  //   dropcursor: false,
  //   heading: false,
  //   horizontalRule: false,
  //   blockquote: false,
  //   history: false,
  //   codeBlock: false,
  // }),
  // CodeBlockLowlight.configure({
  //   lowlight,
  //   defaultLanguage: null,
  // }),
  // TextStyle,
  // FontSize,
  // FontFamily,
  // Color,
  // TrailingNode,
  // Link.configure({
  //   openOnClick: false,
  // }),
  // Highlight.configure({ multicolor: true }),
  // Underline,
  // CharacterCount.configure({ limit: 50000 }),
  // TableOfContents,
  // TableOfContentsNode,
  // ImageUpload.configure({
  //   clientId: provider?.document?.clientID,
  // }),
  // ImageBlock,
  // FileHandler.configure({
  //   allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage();

  //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
  //     });
  //   },
  //   onPaste: (currentEditor, files) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage();

  //       return currentEditor
  //         .chain()
  //         .setImageBlockAt({
  //           pos: currentEditor.state.selection.anchor,
  //           src: url,
  //         })
  //         .focus()
  //         .run();
  //     });
  //   },
  // }),
  // Emoji.configure({
  //   enableEmoticons: true,
  //   suggestion: emojiSuggestion,
  // }),
  // TextAlign.extend({
  //   addKeyboardShortcuts() {
  //     return {};
  //   },
  // }).configure({
  //   types: ["heading", "paragraph"],
  // }),
  // Subscript,
  // Superscript,
  // Table,
  // TableCell,
  // TableHeader,
  // TableRow,
  // Typography,
  // Placeholder.configure({
  //   includeChildren: true,
  //   showOnlyCurrent: false,
  //   placeholder: () => "",
  // }),
  // SlashCommand,
  // Focus,
  // Figcaption,
  // BlockquoteFigure,
  // Dropcursor.configure({
  //   width: 2,
  //   class: "ProseMirror-dropcursor border-black",
  // }),
]

export default ExtensionKit
