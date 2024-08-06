import { Decoration, DecorationSet, Extension, PMPlugin, PMPluginKey } from '@slaykit/core'

export const Selection = Extension.create({
  name: 'selection',

  addProseMirrorPlugins() {
    const { editor } = this

    return [
      new PMPlugin({
        key: new PMPluginKey('selection'),
        props: {
          decorations(state) {
            if (state.selection.empty) {
              return null
            }

            if (editor.isFocused === true) {
              return null
            }

            return DecorationSet.create(state.doc, [
              Decoration.inline(state.selection.from, state.selection.to, {
                class: 'selection',
              }),
            ])
          },
        },
      }),
    ]
  },
})

export default Selection
