import React, { use } from 'react'
import { getPortfolioPageBySlug, getPortfolioPagesBySiteId } from '@/lib/pages/read'
import type { Metadata } from 'next'
import GridCategory from '@/ui/grid/GridCategory'
import GridPage from '@/ui/grid/GridPage'

interface Props {
  params: {
    page: string
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const page = await getPortfolioPageBySlug(props.params.page, process.env.NEXT_PUBLIC_SITE_URL as string);
  return { title: page.data.name }
}

export default function Page(props: Props) {
  const page = use(getPortfolioPageBySlug(props.params.page, process.env.NEXT_PUBLIC_SITE_URL as string))
  // console.log('page', page)
  return (
    <React.Fragment>
      
      {
        page?.data.type.slug === 'category' && 
        <GridPage page={page}/>
      }
      {
        page?.data.type.slug === 'about' && 
        <div>about</div>
      }
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  const pages = await getPortfolioPagesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  return pages.map((data) => ({
    page: data.slug,
  }));
}

