import { ConnectionArgs } from "@/src/interfaces/site";

export const getPortfolioPage0 = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPage0($id: String!){
        portfolioGetPage0(id: $id){
         _id
         parentId
         data{
          type{
            slug
          }
          name
          description

         }
        }
      }
        `,
      variables: {
        id
      },
    }),
  });
  const { data: {portfolioGetPage0} } = await response.json();
  return  portfolioGetPage0
}
// export const getPortfolioPages0WithCursor = async (args: ConnectionArgs, parentId: string) => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//   {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({
//       query: `
//       query PortfolioGetPages0WithCursor($args:ConnectionArgs!, $parentId: String!){
//         portfolioGetPages0WithCursor(args: $args, parentId: $parentId){
//          page{
//           pageInfo{
//             startCursor
//             endCursor
//             hasNextPage
//             hasPreviousPage
//           }
//           edges{
//             cursor
//             node{
//               _id
//               slug
//               data{
//                 name
//                 description
//                 thumbnailUrl
//               }
//             }
//           }
//         }
//           pageData{
//             count
//             limit
//             offset
//           }
//         }
//       }
//         `,
//       variables: {
//         args,
//         parentId
//       },
//     }),
//   });
//   const { data: {portfolioGetPages0WithCursor} } = await response.json();
//   return  portfolioGetPages0WithCursor
// }
export const getPortfolioPage0BySlug = async (slug: string, siteId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query portfolioGetPage0BySlug($slug:String!, $siteId: String!){
        portfolioGetPage0BySlug(slug: $slug, siteId: $siteId){
          _id
          slug
          data{
            name
            type{
              slug
            }
            thumbnailUrl
          }
          pages{
            _id
            slug
            data{
              name
              thumbnailUrl
            }
          }
        }
      }
        `,
      variables: {
        slug,
        siteId
      },
    }),
  });
  const { data: {portfolioGetPage0BySlug} } = await response.json();
  return  portfolioGetPage0BySlug
}
export const getPortfolioPages0BySiteId = async (siteId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPages0BySiteId($siteId: String!){
        portfolioGetPages0BySiteId(siteId: $siteId){
          _id
          slug
        }
      }
        `,
      variables: {
        siteId
      },
    }),
  });
  const { data: {portfolioGetPages0BySiteId} } = await response.json();
  return  portfolioGetPages0BySiteId
}
