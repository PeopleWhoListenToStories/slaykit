import { mergeAttributes, PMEditorView, PMPlugin } from '@slaykit/core'
import { Link as SlaykitLink } from '@slaykit/link'

export const Link = SlaykitLink.extend({
  inclusive: false,

  parseHTML() {
    return [{ tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'link' }), 0]
  },

  addProseMirrorPlugins() {
    const { editor } = this

    return [
      ...(this.parent?.() || []),
      new PMPlugin({
        props: {
          handleKeyDown: (view: PMEditorView, event: KeyboardEvent) => {
            const { selection } = editor.state

            if (event.key === 'Escape' && selection.empty !== true) {
              editor.commands.focus(selection.to, { scrollIntoView: false })
            }

            return false
          },
        },
      }),
    ]
  },
})

export default Link
