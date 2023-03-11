'use client'
import { useGetCategory0ById } from '@/src/hooks/useCategory0';
import { useGetCategories1ByParentId } from '@/src/hooks/useCategory1';
import { Category } from '@/src/interfaces/category';
import { SelectionProvider } from '@/src/providers/SelectionProvider';
import { CardCategory1 } from '../card/CardCategory1';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  category: Category
  categories: Category[]
}

export function ListCategory1(props: Props) {
  const {data: category} = useGetCategory0ById(props.category)
  const { data: categories0 } = useGetCategories1ByParentId( props.categories , props.category._id)
  return (
    
    <SelectionProvider ids={categories0?.map(data => data._id) as string[]}>
      <HeadingDashboard title={category.data.name} category={category} />
      
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories0?.map((data, i) => (
          <CardCategory1 key={i} page={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}