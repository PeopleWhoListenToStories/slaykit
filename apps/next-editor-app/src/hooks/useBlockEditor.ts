import { Editor, useEditor } from '@slaykit/react'
import { useContext, useEffect, useMemo, useState } from 'react'

import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Ai from '@slaykit/ai'
import type { Doc as YDoc } from 'yjs'

import { EditorUser } from '../components/BlockEditor/types'
import { EditorContext } from '../context/EditorContext'
import { emptyContent } from '../helpers/data/initialContent'
import { useSidebar } from './useSidebar'

import { Collaboration } from '~/extensions/Collaboration'
import { CollaborationCursor } from '~/extensions/CollaborationCursor'
import { ExtensionKit } from '~/extensions/extension-kit'
import { userColors, userNames } from '~/helpers/constants'
import { randomElement } from '~/helpers/utils'
import { AUTH_USER_INFO_KEY, getStorage } from '~/helpers/storage'

const TIPTAP_AI_APP_ID = process.env.NEXT_PUBLIC_TIPTAP_AI_APP_ID
const TIPTAP_AI_TOKEN = process.env.NEXT_PUBLIC_TIPTAP_AI_TOKEN
const TIPTAP_AI_BASE_URL = process.env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  editable = false,
  aiToken,
  ydoc,
  provider,
}: {
  editable: boolean
  aiToken: string
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const leftSidebar = useSidebar()
  const [collabState, setCollabState] = useState<WebSocketStatus>(WebSocketStatus.Connecting)
  const { setIsAiLoading, setAiError } = useContext(EditorContext)

  const editor = useEditor(
    {
      editable,
      autofocus: true,
      onCreate: ({ editor }) => {
        provider?.on('synced', () => {
          if (editor.isEmpty) {
            editor.commands.setContent(emptyContent)
          }
        })
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: getStorage(AUTH_USER_INFO_KEY).name || randomElement(userNames),
            color: randomElement(userColors),
            nickName: getStorage(AUTH_USER_INFO_KEY).nickName || null,
            id: getStorage(AUTH_USER_INFO_KEY).id || null,
            avatar: getStorage(AUTH_USER_INFO_KEY).avatar || null,
          },
        }),
        Ai.configure({
          appId: TIPTAP_AI_APP_ID,
          token: TIPTAP_AI_TOKEN || aiToken,
          baseUrl: TIPTAP_AI_BASE_URL,
          autocompletion: true,
          onLoading: () => {
            setIsAiLoading(true)
            setAiError(null)
          },
          onSuccess: () => {
            setIsAiLoading(false)
            setAiError(null)
          },
          onError: error => {
            setIsAiLoading(false)
            setAiError(error.message)
          },
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [ydoc, provider],
  )

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return []
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ')
      const firstName = names?.[0]
      const lastName = names?.[names.length - 1]
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

      return { ...user, initials: initials.length ? initials : '?' }
    })
  }, [editor?.storage.collaborationCursor?.users])

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  }

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status)
    })
  }, [provider])

  window.editor = editor

  return { editor, users, characterCount, collabState, leftSidebar }
}
