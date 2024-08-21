'use client'

import { EditorContent, PureEditorContent } from '@slaykit/react'
import React, { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { WebSocketStatus } from '@hocuspocus/provider'

import { EditorHeader } from './components/EditorHeader'
import { SlaykitProps } from './types'

import '~/styles/index.css'
import { Sidebar } from '~/components/BlockEditor/components/Sidebar'
import { ContentItemMenu } from '~/components/menus/ContentItemMenu'
import { LinkMenu } from '~/components/menus/LinkMenu'
import { TextMenu } from '~/components/menus/TextMenu'
import { Loader } from '~/components/ui/Loader'
import { EditorContext } from '~/context/EditorContext'
import ImageBlockMenu from '~/extensions/ImageBlock/components/ImageBlockMenu'
import { TableColumnMenu, TableRowMenu } from '~/extensions/Table/menus'
import { useAIState } from '~/hooks/useAIState'
import { useBlockEditor } from '~/hooks/useBlockEditor'

export const BlockEditor = ({ editable = false, shareDocumentId = '', aiToken, ydoc, provider }: SlaykitProps) => {
  const aiState = useAIState()

  const menuContainerRef = useRef(null)
  const editorRef = useRef<PureEditorContent | null>(null)

  const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({
    editable,
    aiToken,
    ydoc,
    provider,
  })

  const displayedUsers = users.slice(0, 3)

  const providerValue = useMemo(() => {
    return {
      isAiLoading: aiState.isAiLoading,
      aiError: aiState.aiError,
      setIsAiLoading: aiState.setIsAiLoading,
      setAiError: aiState.setAiError,
    }
  }, [aiState])

  if (!editor) {
    return null
  }

  const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full" ref={menuContainerRef}>
        {/* <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} /> */}
        <div className="relative flex flex-col flex-1 h-full overflow-hidden">
          <EditorHeader
            shareDocumentId={shareDocumentId}
            editable={editable}
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <div className="relative flex flex-1 h-full overflow-hidden">
            <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
            <div className="w-full overflow-y-auto">
              <EditorContent editor={editor} ref={editorRef} />
              <ContentItemMenu editor={editor} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} />
              {/* <ColumnsMenu editor={editor} appendTo={menuContainerRef} /> */}
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </div>
          </div>
        </div>
      </div>
      {aiState.isAiLoading && aiLoaderPortal}
    </EditorContext.Provider>
  )
}

export default BlockEditor
