import { getPortfolioCategories0BySiteId, getPortfolioCategory0BySlug } from "@/lib/categories/category0/read";
import { getPortfolioPagesBySiteId } from "@/lib/pages/read";

interface Props {
  children: React.ReactNode,
  params: { 
    page: string
    category0: string
   };
}

// export async function generateStaticParams(props: Props) {
//   const category = await getPortfolioCategory0BySlug(props.params.category0, process.env.NEXT_PUBLIC_SITE_URL as string)
//   if (category.data.type.slug === 'category') {
//     return category.categories?.map((category) => ({category0: category.slug}))
//   }
// }

export default function Layout(props: Props) {
  const {children} = props
  return (
    <>
      {children}
    </>
  );
}