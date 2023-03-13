'use client'
import { ListArticle } from "@/src/interfaces/article";
import { getPortfolioArticlesWithCursorBySiteId } from "@/lib/articles/read";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Category } from "@/src/interfaces/category";
import { usePathname } from "next/navigation";



interface Props {
  category: Category
}

export default function GridArticles(props: Props) {
  // const { data } = useQuery<ListArticle>({
  //   queryKey: ['articles', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string],
  //   queryFn: () => getPortfolioArticlesWithCursorBySiteId({ first: 256 }, process.env.NEXT_PUBLIC_SITE_URL as string),
  //   // initialData: props.listArticle
  // });
  const pathname = usePathname()
  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From the blog: {props.category.data.name}
          </h2>
          <p className="mt-2 text-lg leading-8 ">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-200 mt-3 pt-10 sm:mt-16">
        {props.category.articles?.map((data, i) => (

          <Link
            rel="noopener noreferrer"
            href={`${pathname}/content/${data.slug}`}
            className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900"
            key={i}
          >
            <img
              role="presentation"
              className="object-cover w-full rounded dark:bg-gray-500"
              src="https://res.cloudinary.com/dcpr6059h/image/upload/v1678700721/No-Photo_ryvjpx.jpg"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                {data.data.name}
              </h3>
              <span className="text-xs dark:text-gray-400">
                January 21, 2021
              </span>
              <p>
                {data.data.description}
              </p>
            </div>
          </Link>
        ))

          }
          
        </div>
        {/* <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium  hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 text-sm leading-6 line-clamp-3">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full "
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold ">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div> */}
      </div>
    </div>
  );
}
