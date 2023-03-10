import { getPortfolioArticlesWithCursorBySiteId } from "@/lib/articles/read";
import { ListArticle } from "@/src/interfaces/article";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"

interface Props {
  // listArticle: ListArticle
}

export default function GridArticles(props: Props) {
  const { data } = useQuery<ListArticle>({
    queryKey: ['articles', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string],
    queryFn: () => getPortfolioArticlesWithCursorBySiteId({ first: 256 }, process.env.NEXT_PUBLIC_SITE_URL as string),
    // initialData: props.listArticle
  });
  // console.log('data', data)
  
  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.page.edges.map((article, i) => (
            <Link key={i} href={`/blog/${article.node.slug}`} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={article.node.data.thumbnailUrl || 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg'}
                  alt={article.node.slug}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm ">{article.node.data.name}</h3>
              {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
