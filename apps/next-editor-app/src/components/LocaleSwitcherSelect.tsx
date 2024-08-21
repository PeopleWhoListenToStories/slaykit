'use client'

import { ReactNode, useTransition } from 'react'
import React from 'react'

import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select'
import { cn } from '~/helpers/utils'
import { usePathname, useRouter } from '~/navigation'

type Props = {
  children: ReactNode
  defaultValue: string
  items: Array<{ label: string; value: string }>
}

export default function LocaleSwitcherSelect({ items }: Props) {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const params = useParams()

  const [defaultLocaleValue, setDefaultLocaleValue] = React.useState(locale)

  React.useEffect(() => {
    setDefaultLocaleValue(locale)
  }, [locale])

  function onSelectChange(event: string) {
    const nextLocale = event
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <Select onValueChange={onSelectChange} defaultValue={defaultLocaleValue}>
      <SelectTrigger className={cn('w-[125px]', isPending && 'transition-opacity [&:disabled]:opacity-30')}>
        <SelectValue>{t(defaultLocaleValue)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map(languages => (
          <SelectItem
            className={cn('cursor-pointer', isPending && 'disabled')}
            key={languages.value}
            value={languages.value}
          >
            {t(languages.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
