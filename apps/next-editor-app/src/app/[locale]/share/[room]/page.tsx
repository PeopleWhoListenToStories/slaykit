'use client'

import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { HocuspocusProvider } from '@hocuspocus/provider'
import { Watermark as WatermarkJS } from '@slaykit/watermark'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Doc as YDoc } from 'yjs'

import 'iframe-resizer/js/iframeResizer.contentWindow'
import { BlockEditor } from '~/components/BlockEditor'
import { DarkModeSwitcher } from '~/components/DarkModeSwitcher'
import { Banner } from '~/components/ui/Banner'
import { Loader } from '~/components/ui/Loader'
// import { AUTH_TOKEN_KEY, AUTH_USER_KEY, getStorage } from '~/helpers/storage'
import { useNetwork } from '~/hooks/useNetwork'
import { useToggle } from '~/hooks/useToggle'

export interface AiState {
  isAiLoading: boolean
  aiError?: string | null
}

export type ProviderStatus = 'connecting' | 'connected' | 'disconnected' | 'loadCacheSuccess'

export default function Document({ params }: { params: { room: string } }) {
  const t = useTranslations()

  const { online } = useNetwork()
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null)
  const [collabToken, setCollabToken] = useState<string | null>(null)
  const [aiToken, setAiToken] = useState<string | null>(null)
  const [loading, toggleLoading] = useToggle(true)
  const [status, setStatus] = useState<ProviderStatus>('connecting')
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1

  const { room } = params

  useEffect(() => {
    initWatermark()
    setCollabToken(searchParams.get('token'))
  }, [])

  useEffect(() => {
    setAiToken(searchParams.get('aiToken') || 'aiToken')
  }, [])

  const initWatermark = () => {
    new WatermarkJS({
      content: '快将尘埃掸落 别将你眼眸弄脏',
      height: 32,
      width: 165,
      // image: 'https://uiwjs.github.io/react-watermark/watermark-example.svg',
    })
      .create()
      .then(base64String => {
        const oDiv = document.createElement('div')

        // Define the watermark style
        const watermarkStyle: Partial<CSSStyleDeclaration> = {
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '2147483647',
          width: '100%',
          height: '100%',
          backgroundSize: '332px',
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          backgroundImage: `url(${base64String})`,
        }

        // Apply styles to the div
        Object.assign(oDiv.style, watermarkStyle)

        // Append the div to the body
        document.body.appendChild(oDiv)
      })
      .catch(() => { })
  }

  const ydoc = useMemo(() => new YDoc(), [])

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new HocuspocusProvider({
          url: process.env.COLLABORATION_API_URL as string,
          name: room,
          document: ydoc,
          token: collabToken,
          parameters: {
            targetId: room,
            userId: searchParams.get('userId'),
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
            // setError(e || new Error('鉴权失败！暂时无法提供服务'))
          },
          onSynced() {
            toggleLoading(false)
          },
          onStatus({ status }) {
            setStatus(status)
          },
        }),
      )
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab])
  if ((hasCollab && (!collabToken || !provider)) || !aiToken) return

  return (
    <>
      <DarkModeSwitcher />
      {loading && <Loader label={t('global.connecting')} />}
      {(!online || status === 'disconnected') && (
        <Banner
          type="warning"
          description={hasCollab ? t('global.connectingDisconnectOnlyEdit') : t('global.connectingDisconnectOnlyRead')}
        />
      )}
      <BlockEditor editable={false} aiToken={aiToken} hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
    </>
  )
}
