import { getPortfolioArticlesByParentId } from '@/lib/articles/read'
import { getPortfolioCategories0BySiteId, getPortfolioCategory0ById } from '@/lib/categories/category0/read'
import { Article } from '@/src/interfaces/article'
import { PaginationProvider } from '@/src/providers/PaginationProvider'
import { GridArticles1 } from '@/ui/grid/ListArticles1'
import React, { use } from 'react'

interface Props {
  params: {
    id: string
  }
}
export default function Page(props: Props) {
  const category = use(getPortfolioCategory0ById(props.params.id))
  let articles:Article[] = []
  if (category.data.type.slug === 'blog') {
    articles = use(getPortfolioArticlesByParentId(props.params.id))
  }
  return (
    <PaginationProvider>
      {
        category?.data.type.slug === 'category' &&
        <div>Category</div>
      }
      {
        category?.data.type.slug === 'blog' &&
        <GridArticles1 category={category}  articles={articles}/>
      }
      
    </PaginationProvider>
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioCategories0BySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  const paths = pages.map((page) => ({
    id: page._id
  }))
  return paths
}