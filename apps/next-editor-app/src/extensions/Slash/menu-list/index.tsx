import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { Editor } from '@slaykit/core'
import scrollIntoView from 'scroll-into-view-if-needed'

// import { useUser } from '~/data/user';
import { cn } from '../../../helpers/utils'
import { ILabelRenderCommand } from '../commands'

interface IProps {
  editor: Editor
  items: ILabelRenderCommand[]
  command: (command: ILabelRenderCommand) => void
}

export const MenuList: React.FC<IProps> = forwardRef((props, ref) => {
  // const { user } = useUser();
  const $container = useRef<HTMLDivElement>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [renderMenuList, setRenderMenuList] = useState([])

  const selectItem = index => {
    const command = props.items[index]

    if (command) {
      // 注入用户信息
      command.user = {}
      props.command(command)
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => {
    setSelectedIndex(0)
    const renderList: any[] = []
    const _typeMap = new Map()
    let index = 0
    props.items.forEach(item => {
      if (!_typeMap.has(item.type)) {
        index = _typeMap.size
        _typeMap.set(item.type, index)
        renderList[index] = {
          type: item.type,
          name: item.typeName,
          items: [item],
        }
      } else {
        index = _typeMap.get(item.type)
        renderList[index].items.push(item)
      }
    })
    setRenderMenuList(renderList)
  }, [props.items])

  useEffect(() => {
    if (Number.isNaN(selectedIndex + 1)) return
    const el = $container.current.querySelector(`span:nth-of-type(${selectedIndex + 1})`)
    el && scrollIntoView(el, { behavior: 'smooth', scrollMode: 'if-needed' })
  }, [selectedIndex])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <div
      className={cn(
        'text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-2 bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800',
      )}
      ref={$container}
    >
      {props.items.length ? (
        renderMenuList.map(itemType => {
          return (
            <div className={cn('grid grid-cols-1 gap-0.5')} key={itemType.type}>
              <div
                className={cn(
                  'text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5',
                )}
              >
                {itemType.name}
              </div>
              {itemType.items.map(item => {
                return (
                  <div
                    key={item.pinyin}
                    className={cn(
                      'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left bg-transparent w-full rounded cursor-pointer hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200 ',
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                )
              })}
            </div>
          )
        })
      ) : (
        <div
          className={cn(
            'max-h-[320px] overflow-x-hidden overflow-y-auto rounded-[var(--border-radius)] box-shadow-[rgb(9 30 66 / 31%) 0 0 1px, rgb(9 30 66 / 25%) 0 4px 8px -2px]',
          )}
        >
          没有找到结果
        </div>
      )}
    </div>
  )
})

MenuList.displayName = 'MenuList'
