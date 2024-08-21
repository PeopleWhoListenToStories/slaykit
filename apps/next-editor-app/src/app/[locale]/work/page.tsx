'use client'

import { useEffect } from 'react'

import { Watermark as WatermarkJS } from '@slaykit/watermark'
import { useRouter } from 'next/navigation'

import { toast } from '~/components/ui/Toast/use-toast'
import { AUTH_TOKEN_KEY, getStorage } from '~/helpers/storage'

const Work = () => {
  const router = useRouter()

  useEffect(() => {
    initWatermark()
    fetchOrganization()
  }, [])

  const initWatermark = () => {
    new WatermarkJS({
      content: '永远都像初次见你那样 使我心荡漾',
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
      .catch(() => {})
  }

  const fetchOrganization = async () => {
    const data = await (
      await fetch('/api/organization/personal', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStorage(AUTH_TOKEN_KEY)}`,
        },
      })
    ).json()

    const { code, message, data: resData } = data
    if (code === 200) {
      const { id } = resData
      router.push(`/work/${id}`)
    } else {
      toast({
        title: `提示`,
        description: <div>{message || '获取知识库异常'}</div>,
      })
    }
  }

  return <div className="w-full h-full flex justify-center items-center">正在开发中...</div>
}

export default Work
