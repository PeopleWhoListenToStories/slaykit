import { Extension } from '@slaykit/core'
import Suggestion from '@slaykit/suggestion'

export interface EmojiOptions {
  /**
   * @default true
   * @example true
   */
  enableEmoticons: boolean;

  /**
   * @default null
   */
  suggestion: any;
}

export const Emoji = Extension.create<EmojiOptions>({
  name: 'emoji',

  addOptions() {
    return {
      enableEmoticons: true,
      suggestion: null,
    }
  },

  addStorage() {
    return {
      emojis: [
        { shortcodes: [':smile:', ':happy:'], tags: ['smile', 'happy'], char: '😊' },
        { shortcodes: [':sad:', ':unhappy:'], tags: ['sad', 'unhappy'], char: '😢' },
        // 你可以添加更多的表情符号
      ],
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.suggestion) {
      return []
    }

    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
