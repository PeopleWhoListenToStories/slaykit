import { WebSocketStatus } from '@hocuspocus/provider'
import { useTranslations } from 'next-intl'

import { EditorUser } from '../types'
import { EditorInfo } from './EditorInfo'

import { Icon } from '~/components/ui/Icon'
import { toast } from '~/components/ui/Toast/use-toast'
import { Toolbar } from '~/components/ui/Toolbar'
import { copy } from '~/helpers/copy'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, getStorage } from '~/helpers/storage'

export type EditorHeaderProps = {
  editable?: boolean
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  shareDocumentId?: string
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}

export const EditorHeader = ({
  editable = false,
  characters,
  collabState,
  shareDocumentId,
  users,
  words,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  const t = useTranslations()

  const handleCopyAction = async () => {
    const shareUrl = `${window.location.origin}/${window.location.pathname.split('/')[0]}/share/${shareDocumentId}?userId=${getStorage(AUTH_USER_KEY)}&token=${getStorage(AUTH_TOKEN_KEY)}&date=${new Date().toLocaleDateString()}`
    // if (Math.random() > 0.5) {
    //   copy(`${shareUrl}`, () => {
    //     toast({
    //       description: <div>{t('global.copySuccess')}</div>,
    //     })
    //   })
    // } else {
    try {
      const params = new URLSearchParams({ url: shareUrl });
      const { code, data } = await (await fetch(`/short-url?${params}`, { method: 'GET' })).json()

      if (code === 200 && data) {
        copy(`${process.env.NEXT_PUBLIC_SHORT_URL}/${data}`, () => {
          toast({
            description: <div>{t('global.copySuccess')}</div>,
          })
        })
      } else {
        toast({
          description: <div>{t('global.copyFail')}</div>,
        })
      }
    } catch (err) {
      toast({
        description: <div>{t('global.copyFail')}</div>,
      })
    }
    // }
  }

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? t('globalEditor.closeSidebar') : t('globalEditor.openSidebar')}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? 'bg-transparent' : ''}
          >
            <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />
          </Toolbar.Button>
        </div>
        {editable && shareDocumentId && (
          <div className="flex items-center gap-x-1.5">
            <Toolbar.Button
              tooltip={t('globalEditor.shareLink')}
              onClick={() => handleCopyAction()}
              className={'bg-transparent'}
            >
              <Icon name={'Link'} />
            </Toolbar.Button>
          </div>
        )}
      </div>
      <EditorInfo characters={characters} words={words} collabState={collabState} users={users} />
    </div>
  )
}
