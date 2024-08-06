import { Extension } from "@slaykit/core";

export interface AiOptions {
  /**
   * appid
   * @default ""
   */
  appId: string;

  /**
   * ai token
   * @default ""
   */
  token: string;

  /**
   * ai地址
   * @default ""
   */
  baseUrl: string;

  /**
   * 自动补全
   * @default true
   * @example autocompletion: boolean
   */
  autocompletion: boolean;

  onLoading: () => void;

  onSuccess: () => void;

  onError: () => void;
}

export interface ImageOptions {
  [key: string]: [string];
}

declare module "@slaykit/core" {
  interface Commands<ReturnType> {
    ai: {};
  }
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
export const Ai = Extension.create<AiOptions>({
  name: "ai",

  addOptions() {
    return {
      appId: "",
      token: "",
      baseUrl: "",
      autocompletion: false,
      onLoading: () => {},
      onSuccess: () => {},
      onError: () => {},
    };
  },

  addCommands() {
    return {
      // fetchAICompletion: () =>
      //   async ({ editor }) => {
      //     const { appId, token, baseUrl, onLoading, onSuccess, onError } = this.options;
      //     onLoading();
      //     try {
      //       const response = await fetch(`${baseUrl}/autocomplete`, {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //         body: JSON.stringify({
      //           appId,
      //           content: editor.getHTML(),
      //         }),
      //       });
      //       if (!response.ok) {
      //         throw new Error("Failed to fetch AI completion");
      //       }
      //       const data = await response.json();
      //       editor.commands.insertContent(data.completion);
      //       onSuccess();
      //     } catch (error) {
      //       onError(error);
      //     }
      // },
    };
  },
});
