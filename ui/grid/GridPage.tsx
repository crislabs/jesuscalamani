'use client'
import { useGetPageBySlug } from "@/src/hooks/usePages"
import { Page } from "@/src/interfaces/page"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface Props{
  page?: Page
}

export default function GridPage(props: Props) {
  const pathname = usePathname()
  const { data: page } = useGetPageBySlug(props.page as Page)
  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight ">{page?.data.name}</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {page?.categories?.map((data, i) => (
            <div key={i} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={data.data.thumbnailUrl || 'https://res.cloudinary.com/dcpr6059h/image/upload/v1678700721/No-Photo_ryvjpx.jpg'}
                  alt={data.data.description}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm ">
                    <Link href={`${pathname}/${data.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {data.data.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm ">{data.data.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
