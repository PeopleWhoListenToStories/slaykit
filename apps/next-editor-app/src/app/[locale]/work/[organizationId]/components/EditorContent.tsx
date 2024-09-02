'use client'

import { useEffect, useLayoutEffect, useMemo, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import { HocuspocusProvider } from '@hocuspocus/provider'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Doc as YDoc } from 'yjs'

import { BlockEditor } from '~/components/BlockEditor'
import { DarkModeSwitcher } from '~/components/DarkModeSwitcher'
import { Banner } from '~/components/ui/Banner'
import { Loader } from '~/components/ui/Loader'
import { toast } from '~/components/ui/Toast/use-toast'
import { AUTH_TOKEN_KEY, AUTH_USER_INFO_KEY, getStorage } from '~/helpers/storage'
import { useNetwork } from '~/hooks/useNetwork'
import { useToggle } from '~/hooks/useToggle'

export type ProviderStatus = 'connecting' | 'connected' | 'disconnected' | 'loadCacheSuccess'

interface IProps {
  documentId: string
}

export const WikiEditorContent = ({ documentId }: IProps) => {
  const t = useTranslations()

  const { online } = useNetwork()
  const providerRef = useRef()
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null)
  const [collabToken, setCollabToken] = useState<string | null>(null)
  const [aiToken, setAiToken] = useState<string | null>(null)
  const [loading, toggleLoading] = useToggle(true)
  const [status, setStatus] = useState<ProviderStatus>('connecting')
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1

  useEffect(() => {
    setCollabToken(getStorage(AUTH_TOKEN_KEY))
    setAiToken('aiToken')
    return () => {
      // 离开当前页面 销毁连接
      providerRef.current && providerRef.current.disconnect()
    }
  }, [])

  const ydoc = useMemo(() => new YDoc(), [])

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      const _provider = new HocuspocusProvider({
        url: process.env.COLLABORATION_API_URL as string,
        name: documentId,
        document: ydoc,
        token: collabToken,
        parameters: {
          targetId: documentId,
          userId: getStorage(AUTH_USER_INFO_KEY).id,
          docType: 'document',
          editable: true,
        },
        onAwarenessUpdate: ({ states }) => {
          // const users = states.map(state => ({ clientId: state.clientId, user: state.user }))
          // if (deepEqual(user, lastAwarenessRef.current)) {
          //   return
          // }
          // onAwarenessUpdate && onAwarenessUpdate(users)
          // lastAwarenessRef.current = users
        },
        onAuthenticationFailed(e) {
          toggleLoading(false)
          toast({
            title: `提示`,
            description: <div>鉴权失败！暂时无法提供服务 {JSON.stringify(e)}</div>,
          })
        },
        onSynced() {
          toggleLoading(false)
        },
        onStatus({ status }) {
          setStatus(status)
        },
      })
      providerRef.current = _provider
      setProvider(_provider)
    }
  }, [setProvider, collabToken, ydoc, documentId, hasCollab])

  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return

  return (
    <>
      {DarkModeSwitcher}
      {loading && <Loader label={t('global.connecting')} />}
      {(!online || status === 'disconnected') && (
        <Banner
          type="warning"
          description={hasCollab ? t('global.connectingDisconnectOnlyEdit') : t('global.connectingDisconnectOnlyRead')}
        />
      )}
      <BlockEditor editable={true} shareDocumentId={documentId} aiToken={aiToken} hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
    </>
  )
}
