import { Category } from "@/src/interfaces/category";
import { ConnectionArgs } from "@/src/interfaces/site";

export const getPortfolioCategories1ByParentId = async ( parentId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategories1ByParentId( $parentId: String!){
        portfolioGetCategories1ByParentId( parentId: $parentId){
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
  const { data: {portfolioGetCategories1ByParentId} } = await response.json();
  return  portfolioGetCategories1ByParentId
}
export const getPortfolioCategory1ById = async ( id: string):Promise<Category> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategory1ById( $id: String!){
        portfolioGetCategory1ById( id: $id){
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
  const { data: {portfolioGetCategory1ById} } = await response.json();
  return  portfolioGetCategory1ById
}

export const getPortfolioCategory0BySlug = async (slug: string, siteId: string) => {
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

export const getPortfolioCategories1BySiteId = async (siteId: string):Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategories1BySiteId($siteId: String!){
        portfolioGetCategories1BySiteId(siteId: $siteId){
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
  const { data: {portfolioGetCategories1BySiteId} } = await response.json();
  return  portfolioGetCategories1BySiteId
}