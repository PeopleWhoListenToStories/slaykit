'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { SideBarLogo } from './SideBarLogo'
import { SideBarLogout } from './SideBarLogout'

import { Icon } from '~/components/ui/Icon'
import { AUTH_TOKEN_KEY, AUTH_USER_INFO_KEY, removeStorage } from '~/helpers/storage'
import { cn } from '~/helpers/utils'

const sidebarList = [
  {
    id: 'work',
    path: '/work',
    name: '主页',
    type: 'LINK',
    icon: <Icon name="House" />,
  },
  {
    id: 'directory',
    path: '/directory',
    name: '目录',
    type: 'DEFAULT',
    icon: <Icon name="NotebookTabs" />,
    clickIcon: <Icon name="Plus" />,
  },
  // {
  //   path: '/wiki/organization',
  //   name: '组织',
  //   type: 'LINK',
  // },
  // {
  //   path: '/wiki/document',
  //   name: '知识库',
  //   type: 'LINK',
  // },
]

type WikiItemType<T extends string = string> = {
  [K in T]: string
}

interface IProps {
  selectId: string
  documentList: Array<{}>
  onSideBarHandle: (wikiItem: WikiItemType, wikiIndex: number) => void
}

export const Sidebar = ({ selectId = '', documentList = [], onSideBarHandle }: IProps) => {
  const router = useRouter()

  const onLogoutHandle = () => {
    removeStorage(AUTH_TOKEN_KEY)
    removeStorage(AUTH_USER_INFO_KEY)
    router.replace('/authentication')
  }

  return (
    <div className="h-screen border-r-[1px] flex flex-col">
      <div className="py-[16px]">
        <SideBarLogo />
      </div>
      <div className="w-full h-[1px] bg-gray-200">&nbsp;</div>
      <div className="py-[12px] flex-1">
        {sidebarList.map((menuItem, menuIndex) => {
          return (
            <div className="pl-[8px] pr-[12px] my-[2px]" key={menuItem.path}>
              {menuItem.type === 'LINK' && (
                <Link href={{ pathname: `${menuItem.path}` }}>
                  <div
                    className={cn(
                      'w-full h-[40px] flex items-center select-none hover:bg-slate-100 hover:rounded-[4px] hover:cursor-pointer',
                      selectId === menuItem.id ? 'bg-slate-100 rounded-[4px]' : '',
                    )}
                    onClick={() => onSideBarHandle(menuItem, menuIndex)}
                  >
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className="h-[16px] w-[16px] mr-2">{menuItem.icon}</div>
                    <span>{menuItem.name}</span>
                  </div>
                </Link>
              )}
              {menuItem.type === 'DEFAULT' && (
                <div
                  className={cn(
                    'w-full h-[40px] flex items-center select-none hover:bg-slate-100 hover:rounded-[4px] hover:cursor-pointer',
                    selectId === menuItem.id ? 'bg-slate-100 rounded-[4px]' : '',
                  )}
                  onClick={() => onSideBarHandle(menuItem, menuIndex)}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="h-[16px] w-[16px] mr-2">{menuItem.icon}</div>
                  <span className="w-full truncate">{menuItem.name}</span>
                  <div className="h-[16px] w-[16px]" onClick={() => onSideBarHandle({ id: 'addDocument' }, 0)}>
                    {menuItem.clickIcon}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              )}
            </div>
          )
        })}
        {documentList.map((wikiItem: WikiItemType, wikiIndex: number) => {
          return (
            <div className="pl-[8px] pr-[12px] my-[2px]" key={wikiItem.id}>
              <div
                className={cn(
                  'w-full h-[40px] flex items-center select-none hover:bg-slate-100 hover:rounded-[4px] hover:cursor-pointer',
                  selectId === wikiItem.id ? 'bg-slate-100 rounded-[4px]' : '',
                )}
                onClick={() => onSideBarHandle(wikiItem, wikiIndex)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="h-[16px] w-[16px] mr-2">
                  <Icon name="FileText" />
                </div>
                <span className="truncate">{wikiItem.title}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className="pl-[8px] pr-[12px] my-[2px]" >
        <div className={cn('w-full h-[40px] flex items-center select-none hover:bg-slate-100 hover:rounded-[4px] hover:cursor-pointer')} onClick={() => onSideBarHandle({ id: 'addDocument' }, 0)}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className='h-[16px] w-[16px] mr-2'>
            <Icon name="Plus" />
          </div>
          <span className='truncate'>创建文档</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div> */}
      <div className="w-full h-[1px] bg-gray-200">&nbsp;</div>
      <SideBarLogout onLogout={onLogoutHandle} />
    </div>
  )
}
