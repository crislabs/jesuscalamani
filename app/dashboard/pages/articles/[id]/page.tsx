import { getPortfolioArticleById, getPortfolioArticlesBySiteId } from '@/lib/articles/read'
import ArticleEditor from '@/ui/ArticleEditor'
import React, { use } from 'react'
interface Props {
  params: {
    id: string
  }
}
export default function Page(props: Props) {
  const article = use(getPortfolioArticleById(props.params.id))
  return (
    <ArticleEditor article={article} />
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioArticlesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  const paths = pages.map((page) => ({
    id: page._id
  }))
  return paths
}