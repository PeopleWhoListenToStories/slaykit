import { useTranslations } from 'next-intl'

import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  return (
    <LocaleSwitcherSelect
      items={[
        {
          value: 'zh',
          label: t('zh'),
        },
        {
          value: 'en',
          label: t('en'),
        },
      ]}
    />
  )
}
