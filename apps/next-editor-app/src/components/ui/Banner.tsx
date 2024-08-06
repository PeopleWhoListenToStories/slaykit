import * as Toast from '@radix-ui/react-toast'
import React from 'react'

import { Icon } from '~/components/ui/Icon'

export type BannerProps = {
  type?: 'warning' | 'info' | 'error' // 根据需要扩展类型
  duration?: number
  description?: string
}

export const Banner = ({ type = 'info', duration = Infinity, description = '' }: BannerProps) => {
  const bannerStyles = {
    fontSize: '14px',
    padding: '10px 20px',
    borderRadius: '4px',
    color: '#000000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: getBannerColor(type),
  }

  function getBannerColor(type: BannerProps['type']) {
    switch (type) {
      case 'warning':
        return 'rgb(255 193 7)' // 修改为更适合的黄色
      case 'error':
        return 'rgb(244 67 54)' // 修改为更适合的红色
      case 'info':
      default:
        return 'rgb(33 150 243)' // 修改为更适合的蓝色
    }
  }

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root duration={duration} style={bannerStyles}>
        <span>{description}</span>
        <Toast.Close asChild>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Icon name="X" />
          </button>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '10px', zIndex: 9999 }} />
    </Toast.Provider>
  )
}

Banner.displayName = 'Banner'
