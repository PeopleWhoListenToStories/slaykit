'use client'

import { WikiLayout } from '../components/WikiLayout'

interface IProps {
  params: { wikiId: string; organizationId: string }
}

const OrgWiki = ({ params }: IProps) => {
  const { wikiId, organizationId } = params

  return (
    <WikiLayout organizationId={organizationId} wikiId={wikiId}>
      <div className="w-full h-full flex justify-center items-center">
        <h1>欢迎使用 SlayKit-Docs 🚀</h1>
      </div>
    </WikiLayout>
  )
}

export default OrgWiki
