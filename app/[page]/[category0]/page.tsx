// 'use client'
import { getPortfolioCategory0BySlug } from '@/lib/categories/category0/read'
import { getPortfolioPagesBySiteId } from '@/lib/pages/read'
import GridArticles from '@/ui/grid/GridArticles'
import GridCategory from '@/ui/grid/GridCategory'
import React, { use } from 'react'

interface Props {
  params: {
    page: string
    category0: string
  }
}

export default function Page(props: Props) {
  const category = use(getPortfolioCategory0BySlug(props.params.category0, process.env.NEXT_PUBLIC_SITE_URL as string))
  return (
    <React.Fragment>
      {
        category?.data.type.slug === 'category' &&
       <GridCategory category={category}/>
      }
      {
        category?.data.type.slug === 'blog' &&
        <GridArticles category={category} />
      }

    </React.Fragment>
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioPagesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  const paths = pages.filter(data => data.data.type.slug === 'category').map((page) => page.categories?.map(category => ({
    page: page.slug, category0: category.slug
  }))).flat(1);
  return paths
}