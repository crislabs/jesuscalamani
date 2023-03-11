'use client'
import { useGetArticles1ByParentId, useGetArticles2ByParentId } from '@/src/hooks/useArticles1';
import { useGetCategory0ById } from '@/src/hooks/useCategory0';
import { useGetCategory1ById } from '@/src/hooks/useCategory1';
import { Article } from '@/src/interfaces/article';
import { Category } from '@/src/interfaces/category';
import { SelectionProvider } from '@/src/providers/SelectionProvider';
import { CardArticle } from '../card/CardArticle';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  category: Category
  articles: Article[]
}

export function GridArticles2(props: Props) {
  const { data: category } = useGetCategory1ById(props.category)
  const { data: articles } = useGetArticles2ByParentId(props.category._id, props.articles)
  return (
    <SelectionProvider ids={articles?.map(data => data._id) as string[]}>
      <HeadingDashboard title={category.data.name} category={category} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {articles?.map((data, i) => (
          <CardArticle key={i} article={data} />
        ))}
      </div>
      
    </SelectionProvider>
  );
}