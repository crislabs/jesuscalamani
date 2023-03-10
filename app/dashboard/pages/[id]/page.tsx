import { getPortfolioCategories0ByParentId } from '@/lib/categories/category0/read'
import { getPortfolioPageById, getPortfolioPagesBySiteId } from '@/lib/pages/read'
import { PaginationProvider } from '@/src/providers/PaginationProvider'
import { ListCategory0 } from '@/ui/grid/ListCategory0'
import React, { use } from 'react'

interface Props {
  params: {
    id: string
  }
}
export default function Page( props:Props ) {
  const page = use(getPortfolioPageById(props.params.id))
  let categories = []
  if (page.data.type.slug === 'category') {
     categories = use(getPortfolioCategories0ByParentId( props.params.id))
  }
  // console.log('categories', categories)
  return (
    <PaginationProvider>
      {
        page?.data.type.slug === 'page-blank' &&
        <div>Page Blank</div>
      }
      {
        page?.data.type.slug === 'contact' &&
        <div>Contact</div>
      }
      {
        page?.data.type.slug === 'about' &&
        <div>About</div>
      }
      {
        page?.data.type.slug === 'category' &&
        <ListCategory0 page={page} categories={categories} />
      }
      {
        page?.data.type.slug === 'blog' &&
        <div>Blog</div>
      }
    </PaginationProvider>
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioPagesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  const paths = pages.map((page) => ({
    id: page._id
  }))
  return paths
}