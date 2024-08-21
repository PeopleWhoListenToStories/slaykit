import { Editor } from '@slaykit/react'
import React from 'react'

import { Editor as CoreEditor, EditorState, PMEditorView } from '@slaykit/core'

export interface MenuProps {
  editor: Editor
  appendTo?: React.RefObject<any>
  shouldHide?: boolean
}

export interface ShouldShowProps {
  editor?: CoreEditor
  view: PMEditorView
  state?: EditorState
  oldState?: EditorState
  from?: number
  to?: number
}
