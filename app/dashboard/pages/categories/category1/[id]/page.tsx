import { getPortfolioArticlesByParentId } from '@/lib/articles/read'
import { getPortfolioCategories1BySiteId, getPortfolioCategory1ById } from '@/lib/categories/category1/read'
import { getPortfolioCategories2ByParentId } from '@/lib/categories/category2/read'
import { Article } from '@/src/interfaces/article'
import { Category } from '@/src/interfaces/category'
import { PaginationProvider } from '@/src/providers/PaginationProvider'
import { GridArticles2 } from '@/ui/grid/ListArticles2'
import { ListCategory2 } from '@/ui/grid/ListCategory2'
import React, { use } from 'react'
interface Props {
  params: {
    id: string
  }
}
export default function Page(props: Props) {
  const category = use(getPortfolioCategory1ById(props.params.id))
  let articles:Article[] = []
  let categories:Category[] = []
  if (category.data.type.slug === 'category') {
    categories = use(getPortfolioCategories2ByParentId(props.params.id))
  }
  if (category.data.type.slug === 'blog') {
    articles = use(getPortfolioArticlesByParentId(props.params.id))
  }
  return (
    <PaginationProvider>
      {
        category?.data.type.slug === 'category' &&
        
         <ListCategory2 categories={categories} category={category} />
      }
      {
        category?.data.type.slug === 'blog' &&
        <GridArticles2 category={category}  articles={articles}/>
      }
    </PaginationProvider>
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioCategories1BySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  const paths = pages.map((page) => ({
    id: page._id
  }))
  return paths
}