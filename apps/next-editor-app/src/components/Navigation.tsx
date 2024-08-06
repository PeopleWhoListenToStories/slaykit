import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { LocalePrefix, Pathnames } from 'next-intl/routing'

export const defaultLocale = 'zh'

export const locales = ['en', 'zh'] as const

export const localePrefix: LocalePrefix<typeof locales> =
  process.env.NEXT_PUBLIC_LOCALE_PREFIX === 'never' ? 'never' : 'always'

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/authentication': {
    zh: '/authentication',
    en: '/authentication',
  },
}

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames,
})
