import { Extension } from "@slaykit/core";

import { DragHandlePlugin, type DragHandlePluginProps } from "./drag-handle-plugin";

export type DragHandleOptions = Omit<DragHandlePluginProps, "editor" | "element"> & {
  element: HTMLElement | null;
};

export const DragHandle = Extension.create<DragHandleOptions>({
  name: "dragHandle",

  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "dragHandle",
      updateDelay: undefined,
      shouldShow: null,
      onNodeChange: () => {},
    };
  },

  addProseMirrorPlugins() {
    if (!this.options.element) {
      return [];
    }

    return [
      DragHandlePlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow,
        onNodeChange: this.options.onNodeChange
      }),
    ];
  },
});
