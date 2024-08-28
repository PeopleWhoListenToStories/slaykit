import { ReactRenderer } from '@slaykit/react'

import BulitInMention from '@slaykit/mention'
import tippy from 'tippy.js'

import { MentionList } from './wrapper/index'

import { getDatasetAttribute } from '~/extensions/prose-utils'
import { AUTH_TOKEN_KEY, getStorage } from '~/helpers/storage'

const suggestion = {
  items: async ({ query }) => {
    const { code, data = {} } = await (
      await fetch(`/api/wiki/member/${'Ti3h_R-Pk2aX'}?page=1&pageSize=9999`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStorage(AUTH_TOKEN_KEY)}`,
        },
      })
    ).json()
    if (code === 200) {
      const list = data.data || []
      const userList = list.map(v => v.user.name)
      return userList.filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
    } else {
      return []
    }
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}

export const Mention = BulitInMention.extend({
  addAttributes() {
    return {
      id: {
        default: '',
        parseHTML: getDatasetAttribute('id'),
      },
      label: {
        default: '',
        parseHTML: getDatasetAttribute('label'),
      },
    }
  },
}).configure({
  HTMLAttributes: {
    class: 'mention',
  },
  suggestion,
})
