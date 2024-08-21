'use client'

import Error from 'next/error'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('404')

  return (
    <html lang="en" data-atm-ext-installed={true} suppressHydrationWarning={true}>
      <body data-atm-ext-installed={true} suppressHydrationWarning={true}>
        <Error statusCode={404} displayName={t('name')} title={t('tip')} />
      </body>
    </html>
  )
}
