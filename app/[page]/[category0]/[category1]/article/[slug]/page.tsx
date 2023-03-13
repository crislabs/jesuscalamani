import React, { use } from 'react';
import { getPortfolioArticleBySlug } from '@/lib/articles/read';
import { getPortfolioPagesBySiteId } from '@/lib/pages/read';
import Post from '@/ui/Post';
import { Metadata } from 'next';

interface Props {
  params: {
    page: string;
    category0: string;
    slug: string;
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const article = await getPortfolioArticleBySlug(
    props.params.slug,
    process.env.NEXT_PUBLIC_SITE_URL as string,
  );
  return { title: article.data.name, description: article.data.description };
}

export default function Page(props: Props) {
  const post = use(
    getPortfolioArticleBySlug(
      props.params.slug,
      process.env.NEXT_PUBLIC_SITE_URL as string,
    ),
  );
  // const pages = use(getPortfolioPagesBySiteId(
  //   process.env.NEXT_PUBLIC_SITE_URL as string,
  // ));
  // const paths = pages.filter(data => data.data.type.slug === 'category').map((page) => page.categories?.map(category0 => category0.categories?.map(category1 => category1.articles?.map(article => ({
  //   page: page.slug, category0: category0.slug, category1: category1.slug, slug: article.slug
  // }))))).flat(3).filter(data => data)
  // console.log('paths', paths)
  return <Post post={post} />;
}

export async function generateStaticParams() {
  const pages = await getPortfolioPagesBySiteId(
    process.env.NEXT_PUBLIC_SITE_URL as string,
  );
  const paths = pages.filter(data => data.data.type.slug === 'category').map((page) => page.categories?.map(category0 => category0.categories?.map(category1 => category1.articles?.map(article => ({
    page: page.slug, category0: category0.slug, category1: category1.slug, slug: article.slug
  }))))).flat(3).filter(data => data)
  // const paths = pages
  //   .filter((data) => data.data.type.slug === 'category')
  //   .map((page) =>
  //     page.categories?.map((category) =>
  //       category.articles?.map((article) => ({
  //         page: page.slug,
  //         category0: category.slug,
  //         slug: article.slug,
  //       })),
  //     ),
  //   )
  //   .flat(2);
  return paths;
}
