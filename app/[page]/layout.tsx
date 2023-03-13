import { getPortfolioPagesBySiteId } from "@/lib/pages/read";

interface Props {
  children: React.ReactNode,
  params: { page: string };
}

// export async function generateStaticParams() {
//   const pages = await getPortfolioPagesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
//   return pages.map((data) => ({
//     page: data.slug,
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