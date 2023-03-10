import { getPortfolioPagesByParentId, getPortfolioPagesWithCursorByParentId } from '@/lib/pages/read'
import { PaginationProvider } from '@/src/providers/PaginationProvider'
import { GridPages } from '@/ui/grid/ListPages'
import React, { use } from 'react'

export default function Page() {
  const pages = use(getPortfolioPagesByParentId(process.env.NEXT_PUBLIC_SITE_URL as string))
  // console.log('pages', pages)
  return (
    <PaginationProvider>
      <GridPages pages={pages}/>
    </PaginationProvider>
  )
}