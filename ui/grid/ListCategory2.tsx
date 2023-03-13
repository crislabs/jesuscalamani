'use client'
import { useGetCategory1ById } from '@/src/hooks/useCategory1';
import { useGetCategories2ByParentId } from '@/src/hooks/useCategory2';
import { Category } from '@/src/interfaces/category';
import { SelectionProvider } from '@/src/providers/SelectionProvider';
import { CardCategory2 } from '../card/CardCategory2';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  category: Category
  categories: Category[]
}

export function ListCategory2(props: Props) {
  const {data: category} = useGetCategory1ById(props.category)
  const { data: categories0 } = useGetCategories2ByParentId( props.categories , props.category._id)
  return (
    
    <SelectionProvider ids={categories0?.map(data => data._id) as string[]}>
      <HeadingDashboard title={category.data.name} category={category} />
      
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories0?.map((data, i) => (
          <CardCategory2 key={i} page={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}