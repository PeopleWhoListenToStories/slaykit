'use client'

import { useEffect } from 'react'

import { WikiEditorContent } from '../../components/EditorContent'
import { WikiLayout } from '../../components/WikiLayout'

interface IProps {
  params: { wikiId: string; documentId: string; organizationId: string }
}

const WikiDocument = ({ params }: IProps) => {
  const { wikiId, documentId, organizationId } = params

  useEffect(() => {}, [])

  return (
    <div className="w-full h-full 1brightness-90 flex ">
      <WikiLayout wikiId={wikiId} organizationId={organizationId}>
        <WikiEditorContent documentId={documentId} />
      </WikiLayout>
    </div>
  )
}

export default WikiDocument
