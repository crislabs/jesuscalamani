'use client'

import { useGetPagesByParentId, useGetPageWithCursorByParentId } from '@/src/hooks/usePages';
import { ListPage, Page } from '@/src/interfaces/page';
import { SelectionProvider } from '@/src/providers/SelectionProvider';
import { CardPage } from '../card/CardPage';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  pages: Page[]
}

export function GridPages(props: Props) {
  const { data: pages0 } = useGetPagesByParentId(props.pages)
  return (
    <SelectionProvider ids={pages0?.map(data => data._id) as string[]}>
      <HeadingDashboard title={"pages0"} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {pages0?.map((data, i) => (
          <CardPage key={i} page={data} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}