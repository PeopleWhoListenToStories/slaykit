/* eslint-disable */
'use strict'

import deselectCurrent from 'toggle-selection'

interface DataItem {
  format: string
  text: string
}

function copy(text: string | DataItem[], onCopy?: () => void): boolean {
  let reselectPrevious: () => void,
    range: Range,
    selection: Selection | null,
    mark: HTMLSpanElement,
    success = false

  reselectPrevious = deselectCurrent()
  range = document.createRange()
  selection = document.getSelection()

  mark = document.createElement('span')
  mark.textContent = typeof text === 'string' ? text : ''
  mark.style.all = 'unset'
  mark.style.position = 'fixed'
  mark.style.top = '0'
  mark.style.clip = 'rect(0, 0, 0, 0)'
  mark.style.whiteSpace = 'pre'
  mark.style.webkitUserSelect = 'text'
  mark.style.MozUserSelect = 'text'
  mark.style.msUserSelect = 'text'
  mark.style.userSelect = 'text'
  mark.addEventListener('copy', function (e: ClipboardEvent) {
    const data: DataItem[] = []

    if (typeof text === 'string') {
      data.push({ format: 'text/plain', text: text })
    } else if (Array.isArray(text)) {
      text.forEach(function (item) {
        data.push({
          format: item.format || 'text/plain',
          text: item.text || item.format || 'text/plain',
        })
      })
    } else {
      data.push({
        format: 'text/plain',
        text: text as string,
      })
    }

    data.forEach(function (item) {
      e.clipboardData?.setData(item.format, item.text)
    })

    e.preventDefault()

    onCopy && onCopy()
  })

  document.body.appendChild(mark)
  range.selectNodeContents(mark)
  selection?.removeAllRanges()
  selection?.addRange(range)
  const successful = document.execCommand('copy')

  if (!successful) {
    throw new Error('copy command was unsuccessful')
  }

  document.body.removeChild(mark)
  reselectPrevious()

  success = true
  return success
}

export default copy
