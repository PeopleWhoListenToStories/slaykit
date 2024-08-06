'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from '~/components/ui/Toast/use-toast'
import { AUTH_TOKEN_KEY, getStorage } from '~/helpers/storage'

interface IProps {
  params: { organizationId: string }
}

const WorkOrganization = ({ params }: IProps) => {
  const { organizationId } = params
  const router = useRouter()

  const [wikiId, setWikiId] = useState('')
  const [wikiList, setWikiList] = useState([])

  useEffect(() => {
    fetchWiki(organizationId)
  }, [])

  const fetchWiki = async (organizationId: string) => {
    const data = await (
      await fetch(`/api/wiki/list/join/${organizationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStorage(AUTH_TOKEN_KEY)}`,
        },
      })
    ).json()

    const { code, message, data: resData } = data
    if (code === 200) {
      const { data: wikiListData } = resData
      const wikiList = wikiListData || []
      setWikiId(wikiList[0].id)
      setWikiList(wikiList)
      console.log(
        `%c 🚥 🚀 : WorkOrganization ->  `,
        `font-size:14px;background-color:#07204f;color:white;`,
        `/work/${organizationId}/${wikiId}`,
      )
      router.push(`/work/${organizationId}/${wikiList[0].id}`)
    } else {
      toast({
        title: `提示`,
        description: <div>{message || '获取知识库异常'}</div>,
      })
    }
  }

  return <div className="w-full h-full 1brightness-90 flex justify-center items-center">正在开发中...</div>
}

export default WorkOrganization
