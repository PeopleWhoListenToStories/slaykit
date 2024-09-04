import { Editor } from '@slaykit/react'

import { HorizontalRule } from '@slaykit/horizontal-rule'
import { CodeBlock } from '@slaykit/text-kit'

import { Figcaption } from '~/extensions/Figcaption'
import { Link } from '~/extensions/Link'
// import { AiImage, AiWriter, CodeBlock, Figcaption, HorizontalRule, ImageBlock, ImageUpload, Link } from '~/extensions'
// import { TableOfContentsNode } from '@/extensions/TableOfContentsNode'

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected')
  const gripRow = container && container.querySelector && container.querySelector('a.grip-row.selected')

  if (gripColumn || gripRow) {
    return true
  }

  return false
}

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    'aiImage',
    'aiWriter',
    'imageBlock',
    'imageBlockUpload',
    'tableOfContents',
    HorizontalRule.name,
    // ImageBlock.name,
    // ImageUpload.name,
    CodeBlock.name,
    Link.name,
    // AiWriter.name,
    // AiImage.name,
    Figcaption.name,
    // TableOfContentsNode.name,
  ]

  return customNodes.some(type => editor.isActive(type)) || isTableGripSelected(node)
}

export default isCustomNodeSelected
