import { useCallback, useState } from 'react'

import { Editor, PMNode } from '@slaykit/core'

export const useData = () => {
  const [currentNode, setCurrentNode] = useState<PMNode | null>(null)
  const [currentNodePos, setCurrentNodePos] = useState<number>(-1)

  const handleNodeChange = useCallback(
    (data: { node: PMNode | null; editor: Editor; pos: number }) => {
      console.log(`%c 🖨️ 🚀 : useData -> data `, `font-size:14px;background-color:#93cc54;color:black;`, data)
      if (data.node) {
        setCurrentNode(data.node)
      }

      setCurrentNodePos(data.pos)
    },
    [setCurrentNodePos, setCurrentNode],
  )

  return {
    currentNode,
    currentNodePos,
    setCurrentNode,
    setCurrentNodePos,
    handleNodeChange,
  }
}
