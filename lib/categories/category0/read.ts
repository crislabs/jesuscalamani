import { Category } from "@/src/interfaces/category";
import { ConnectionArgs } from "@/src/interfaces/site";

// export const getPortfolioCategories0WithCursorByParentId = async (args: ConnectionArgs, parentId: string) => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//   {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({
//       query: `
//       query PortfolioGetCategories0WithCursorByParentId($args:ConnectionArgs!, $parentId: String!){
//         portfolioGetCategories0WithCursorByParentId(args: $args, parentId: $parentId){
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
//   const { data: {portfolioGetCategories0WithCursorByParentId} } = await response.json();
//   return  portfolioGetCategories0WithCursorByParentId
// }
export const getPortfolioCategories0ByParentId = async ( parentId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategories0ByParentId( $parentId: String!){
        portfolioGetCategories0ByParentId( parentId: $parentId){
          _id
          slug
          parentId
          data{
            name
            description
            thumbnailUrl
          }
        }
      }
        `,
      variables: {
        parentId
      },
    }),
  });
  const { data: {portfolioGetCategories0ByParentId} } = await response.json();
  return  portfolioGetCategories0ByParentId
}
export const getPortfolioCategory0ById = async ( id: string):Promise<Category> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategory0ById( $id: String!){
        portfolioGetCategory0ById( id: $id){
          _id
          slug
          parentId
          data{
            name
            description
            thumbnailUrl
            type{
              slug
            }
          }
        }
      }
        `,
      variables: {
        id
      },
    }),
  });
  const { data: {portfolioGetCategory0ById} } = await response.json();
  return  portfolioGetCategory0ById
}

export const getPortfolioCategory0BySlug = async (slug: string, siteId: string):Promise<Category> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategory0BySlug($slug:String!, $siteId: String!){
        portfolioGetCategory0BySlug(slug: $slug, siteId: $siteId){
          _id
          slug
          data{
            name
            type{
              slug
            }
            thumbnailUrl
          }
          categories{
            _id
            slug
            data{
              name
              thumbnailUrl
            }
          }
          articles{
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
  const { data: {portfolioGetCategory0BySlug} } = await response.json();
  return  portfolioGetCategory0BySlug
}

export const getPortfolioCategories0BySiteId = async (siteId: string):Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategories0BySiteId($siteId: String!){
        portfolioGetCategories0BySiteId(siteId: $siteId){
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
  const { data: {portfolioGetCategories0BySiteId} } = await response.json();
  return  portfolioGetCategories0BySiteId
}