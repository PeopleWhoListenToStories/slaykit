'use client'

import { Icon } from '~/components/ui/Icon'

interface IProps {
  onLogout: () => void
}

export const SideBarLogout = ({ onLogout }: IProps) => {
  return (
    <>
      <div className="p-[16px]">
        <div className="flex justify-start items-center cursor-pointer" onClick={onLogout}>
          <Icon name="LogOut" />
          <span className="pl-[8px]">退出登录</span>
        </div>
      </div>
    </>
  )
}
