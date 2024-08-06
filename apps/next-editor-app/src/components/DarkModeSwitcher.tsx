import { createPortal } from 'react-dom'

import { Icon } from '~/components/ui/Icon'
import { Surface } from '~/components/ui/Surface'
import { Toolbar } from '~/components/ui/Toolbar'
import { useDarkMode } from '~/hooks/useDarkMode'

export const DarkModeSwitcher = () => {
  const { isDarkMode, darkMode, lightMode } = useDarkMode()

  return createPortal(
    <Surface className="flex items-center gap-1 fixed bottom-6 right-6 z-[99999] p-1">
      <Toolbar.Button onClick={lightMode} active={!isDarkMode}>
        <Icon name="Sun" />
      </Toolbar.Button>
      <Toolbar.Button onClick={darkMode} active={isDarkMode}>
        <Icon name="Moon" />
      </Toolbar.Button>
    </Surface>,
    document.body,
  )
}
