import { getPortfolioCategories0BySiteId } from "@/lib/categories/category0/read";
import { getPortfolioPagesBySiteId } from "@/lib/pages/read";

interface Props {
  children: React.ReactNode,
  params: { 
    page: string
    category0: string
   };
}

// export async function generateStaticParams() {
//   const pages = await getPortfolioCategories0BySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
//   return pages.map((data) => ({
//     category0: data.slug,
//   }));
// }

export default function Layout(props: Props) {
  const {children} = props
  return (
    <>
      {children}
    </>
  );
}