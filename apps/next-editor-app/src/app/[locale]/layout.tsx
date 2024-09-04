// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import Script from 'next/script'
// import { NextIntlClientProvider, useMessages } from 'next-intl'
// import { getTranslations } from 'next-intl/server'

// import '~/app/styles/globals.css'
// import 'cal-sans'
// import '@fontsource/inter/100.css'
// import '@fontsource/inter/200.css'
// import '@fontsource/inter/300.css'
// import '@fontsource/inter/400.css'
// import '@fontsource/inter/500.css'
// import '@fontsource/inter/600.css'
// import '@fontsource/inter/700.css'
// import { Toaster } from '~/components/ui/Toaster'
// import { cn } from '~/helpers/utils'

// export const metadata: Metadata = {
//   metadataBase: new URL('https://slay.xulai.live'),
//   title: 'Slaykit block editor template',
//   description:
//     'Slaykit is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.',
//   robots: 'noindex, nofollow',
//   icons: [{ url: '/favicon.svg' }],
//   twitter: {
//     card: 'summary_large_image',
//     site: '@slaykit_editor',
//     creator: '@slaykit_editor',
//   },
//   openGraph: {
//     title: 'Slaykit block editor template',
//     description:
//       'Slaykit is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.',
//   },
// }

// const inter = Inter({ subsets: ['latin'] })

// type Props = {
//   children: React.ReactNode
//   params: { locale: string }
// }

// export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>): Promise<Metadata> {
//   const t = await getTranslations({ locale, namespace: 'index' })

//   return {
//     // metadataBase: new URL('http://localhost:3000'),
//     title: t('title'),
//     description: t('desc'),
//   }
// }

// export default function BasicLayout({ children, params: { locale } }: Props) {
//   const messages = useMessages()

//   return (
//     <html className="h-full font-sans" lang={locale} data-atm-ext-installed={true} suppressHydrationWarning={true}>
//       <Script defer src="https://umami.xulai.live/script.js" data-website-id="11ab0b4e-5cec-40cc-8b61-70376a5132b0" />
//       <body className={cn(inter.className, 'flex flex-col h-full')} data-atm-ext-installed={true}>
//         <main className="h-full">
//           <NextIntlClientProvider locale={locale} messages={messages}>
//             {children}
//             <Toaster />
//           </NextIntlClientProvider>
//         </main>
//       </body>
//     </html>
//   )
// }

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import './styles/globals.css'
import '~/styles/components/index.scss'
import 'cal-sans'
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { Toaster } from '~/components/ui/Toaster'
import { cn, isDev } from '~/helpers/utils'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'index' })

  return {
    // metadataBase: new URL('http://localhost:3000'),
    title: t('title'),
    description: t('desc'),
  }
}

export default function BasicLayout({ children, params: { locale } }: Readonly<Props>) {
  const messages = useMessages()

  return (
    <html className="h-full font-sans" lang={locale} data-atm-ext-installed={true} suppressHydrationWarning={true}>
      <head>
        <Script defer src="https://umami.xulai.live/script.js" data-website-id="11ab0b4e-5cec-40cc-8b61-70376a5132b0" />
      </head>
      <body
        className={cn(inter.className, 'flex flex-col h-full')}
        data-atm-ext-installed={true}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
