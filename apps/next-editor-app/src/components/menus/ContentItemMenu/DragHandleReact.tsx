import React, { useEffect, useState } from 'react'

import { Editor, PMNode } from '@slaykit/core'
import { DragHandlePlugin, DragHandlePluginProps } from '@slaykit/drag-handle'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type DragHandleReactProps = Omit<Optional<DragHandlePluginProps, 'pluginKey' | 'editor'>, 'element'> & {
  className?: string
  children: React.ReactNode
  updateDelay?: number
  onNodeChange: (options: { node: PMNode | null; editor: Editor; pos: number }) => void
}

export const DragHandleReact = (props: DragHandleReactProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!element) {
      return
    }

    if (props.editor?.isDestroyed) {
      return
    }

    const {
      pluginKey = 'dragHandleReact',
      editor,
      tippyOptions = {},
      updateDelay,
      shouldShow = null,
      onNodeChange,
    } = props

    if (!editor) {
      console.warn('DragHandle component is not rendered inside of an editor component or does not have editor prop.')
      return
    }

    const plugin = DragHandlePlugin({
      updateDelay,
      editor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
      onNodeChange,
    })

    editor.registerPlugin(plugin)
    return () => editor.unregisterPlugin(pluginKey)
  }, [props.editor, element])

  return (
    <div ref={setElement} className={props.className} style={{ visibility: 'hidden' }}>
      {props.children}
    </div>
  )
}
