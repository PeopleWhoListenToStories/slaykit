'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Sidebar } from './SideBar'

import { DarkModeSwitcher } from '~/components/DarkModeSwitcher'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/Resizable'
import { toast } from '~/components/ui/Toast/use-toast'
import { wikiSideBarLayout } from '~/helpers/constants'
import { AUTH_TOKEN_KEY, getStorage } from '~/helpers/storage'

type WikiItemType<T extends string = string> = {
  [K in T]: string
}

interface IProps {
  wikiId: string
  organizationId: string
  children: React.ReactNode
}

export const WikiLayout = ({ wikiId, organizationId, children }: IProps) => {
  const router = useRouter()
  const params = useParams()

  const [selectId, setSelectId] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [documentList, setDocumentList] = useState([])
  const [isCreateLoading, setIsCreateLoading] = useState(false)

  useEffect(() => {
    setDocumentId((params.documentId as string) || '')
    setSelectId((params.documentId as string) || 'work')
    fetchDocument({ keyword: '', organizationId })
  }, [])

  const fetchDocument = async ({ keyword, organizationId }: { keyword: string; organizationId: string }) => {
    const data = await (
      await fetch(`/api/document?${new URLSearchParams({ keyword, organizationId }).toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStorage(AUTH_TOKEN_KEY)}`,
        },
      })
    ).json()

    const { code, message, data: documentListData } = data
    if (code === 200) {
      const documentList = documentListData || []
      setDocumentList(documentList)
    } else {
      toast({
        title: `提示`,
        description: <div>{message || '获取知识库异常'}</div>,
      })
    }
  }

  const fetchAddDocument = async ({ wikiId, organizationId }: { wikiId: string; organizationId: string }) => {
    if (isCreateLoading) {
      toast({
        title: `提示`,
        description: <div>文档正在创建中...</div>,
      })
      return
    }
    setIsCreateLoading(true)
    const response = await fetch(`/api/document/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStorage(AUTH_TOKEN_KEY)}`,
      },
      body: JSON.stringify({
        wikiId,
        organizationId,
      }),
    })
    const resJson = await response.json()
    if (resJson.code === 200) {
      toast({
        title: `提示`,
        description: <div>文档创建成功</div>,
      })
      fetchDocument({ keyword: '', organizationId })
      setDocumentId(resJson.data.id)
      setSelectId(resJson.data.id)
      router.push(`/work/${organizationId}/${wikiId}/${resJson.data.id}`)
      setIsCreateLoading(false)
    } else {
      toast({
        title: `提示`,
        description: <div>{resJson.data.message || '新增文档异常'}</div>,
      })
    }
  }

  const onSideBarHandle = ({ id }: WikiItemType) => {
    setSelectId(id)
    setDocumentId(id)
    if (id === 'addDocument') {
      fetchAddDocument({ wikiId, organizationId })
    } else if (id === 'work') {
      router.push(`/work/${organizationId}/${wikiId}`)
    } else if (id && id !== 'directory') {
      router.push(`/work/${organizationId}/${wikiId}/${id}`)
    }
  }

  return (
    <div className="w-full h-full 1brightness-90 flex ">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={wikiSideBarLayout[0]} minSize={15}>
          <Sidebar selectId={selectId} documentList={documentList} onSideBarHandle={onSideBarHandle} />
        </ResizablePanel>
        <ResizableHandle className="w-[1px]" withHandle />
        <ResizablePanel defaultSize={wikiSideBarLayout[1]} minSize={75}>
          <div className="w-full h-full flex-1">
            <DarkModeSwitcher />
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
