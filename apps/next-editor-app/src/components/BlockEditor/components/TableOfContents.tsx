'use client'

import { Editor as CoreEditor } from '@slaykit/react'
import { memo, useEffect, useState } from 'react'

import { TableOfContentsStorage } from '@slaykit/table-of-contents'
import { useTranslations } from 'next-intl'

import { cn } from '~/helpers/utils'

export type TableOfContentsProps = {
  editor: CoreEditor
  onItemClick?: () => void
}

export const TableOfContents = memo(({ editor, onItemClick }: TableOfContentsProps) => {
  const t = useTranslations('globalEditor')

  const [data, setData] = useState<TableOfContentsStorage | null>(null)

  useEffect(() => {
    const handler = ({ editor: currentEditor }: { editor: CoreEditor }) => {
      setData({ ...currentEditor.extensionStorage.tableOfContents })
    }

    handler({ editor })

    editor.on('update', handler)
    editor.on('selectionUpdate', handler)

    return () => {
      editor.off('update', handler)
      editor.off('selectionUpdate', handler)
    }
  }, [editor])

  return (
    <>
      <div className="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
        {t('tableOfContent')}
      </div>
      {data && data.content && data.content.length > 0 ? (
        <div className="flex flex-col gap-1">
          {data.content.map(item => (
            <a
              key={item.levelId}
              href={`#${item.id}`}
              style={{ marginLeft: `${1 * item.level - 1}rem` }}
              onClick={onItemClick}
              className={cn(
                'block font-medium text-neutral-500 dark:text-neutral-300 p-1 rounded bg-opacity-10 text-sm hover:text-neutral-800 transition-all hover:bg-black hover:bg-opacity-5 truncate w-full',
                item.isActive && 'text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-900',
              )}
            >
              {item.levelId}. {item.textContent}
            </a>
          ))}
        </div>
      ) : (
        <div className="text-sm text-neutral-500">{t('tableOfTitle')}…</div>
      )}
    </>
  )
})

TableOfContents.displayName = 'TableOfContents'
