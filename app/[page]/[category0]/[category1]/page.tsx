import { getPortfolioCategory1BySlug } from '@/lib/categories/category1/read'
import { getPortfolioPagesBySiteId } from '@/lib/pages/read'
import GridArticles from '@/ui/grid/GridArticles'
import React, { use } from 'react'
interface Props {
  params: {
    page: string
    category0: string
    category1: string
  }
}
export default function Page(props: Props) {
  const category = use(getPortfolioCategory1BySlug(props.params.category1, process.env.NEXT_PUBLIC_SITE_URL as string))
  console.log('category', category)
  return (
    <>
    {
      category?.data.type.slug === 'blog' &&
      <GridArticles category={category} />
    }
    </>
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioPagesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  const paths = pages.filter(data => data.data.type.slug === 'category').map((page) => page.categories?.map(category0 => category0.categories?.map(category1 => ({
    page: page.slug, category0: category0.slug, category1: category1.slug
  })))).flat(2).filter(data => data)
  return paths
}