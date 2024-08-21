import { Editor, Node, PMPlugin } from "@slaykit/core";

export interface FileHandlerOptions {
  /**
   * 允许的MIME类型
   * @default ["image/png"]
   * @example allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"]
   */
  allowedMimeTypes: string[];

  /**
   * 拖拽事件
   */
  onDrop: (editor: Editor, files: Array<File>, pos: number) => void;

  /**
   * 粘贴事件
   */
  onPaste: (editor: Editor, files: Array<File>, pos: number) => void;
}

declare module "@slaykit/core" {
  interface Commands<ReturnType> {}
}

/**
 * This extension allows you to undo and redo recent changes.
 * @see https://www.tiptap.dev/api/extensions/history
 *
 * **Important**: If the `@tiptap/extension-collaboration` package is used, make sure to remove
 * the `history` extension, as it is not compatible with the `collaboration` extension.
 *
 * `@tiptap/extension-collaboration` uses its own history implementation.
 */

export const FileHandler = Node.create<FileHandlerOptions>({
  name: "fileHandler",

  addOptions() {
    return {
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      onDrop: () => {},
      onPaste: () => {},
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new PMPlugin({
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              const { allowedMimeTypes, onDrop } = this.options;
              const files = Array.from(event.dataTransfer.files).filter((file) =>
                allowedMimeTypes.includes(file.type),
              );

              if (files.length > 0) {
                event.preventDefault();
                if (onDrop) {
                  onDrop(editor, files, editor.state.selection.anchor);
                }
                return true;
              }

              return false;
            },
            paste: (view, event) => {
              const { allowedMimeTypes, onPaste } = this.options;
              const files = Array.from(event.clipboardData.files).filter((file) =>
                allowedMimeTypes.includes(file.type),
              );

              if (files.length > 0) {
                event.preventDefault();
                if (onPaste) {
                  onPaste(editor, files, editor.state.selection.anchor);
                }
                return true;
              }

              return false;
            },
          },
        },
      }),
    ];
  },
});
