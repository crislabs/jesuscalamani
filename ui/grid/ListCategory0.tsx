'use client'
import { useGetCategories0ByParentId } from '@/src/hooks/useCategory0';
import { useGetPageById } from '@/src/hooks/usePages';
import { Category } from '@/src/interfaces/category';
import { Page } from '@/src/interfaces/page';
import { SelectionProvider } from '@/src/providers/SelectionProvider';
import { CardCategory0 } from '../card/CardCategory0';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  page: Page
  categories: Category[]
}

export function ListCategory0(props: Props) {
  const {data: page} = useGetPageById(props.page)
  const { data: categories0 } = useGetCategories0ByParentId( props.categories , props.page._id)
  return (
    
    <SelectionProvider ids={categories0?.map(data => data._id) as string[]}>
      <HeadingDashboard title={page.data.name} page={page} />
      
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories0?.map((data, i) => (
          <CardCategory0 key={i} page={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}