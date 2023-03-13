import { Category } from "@/src/interfaces/category";
import { ConnectionArgs } from "@/src/interfaces/site";

export const getPortfolioCategories2ByParentId = async ( parentId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategories2ByParentId( $parentId: String!){
        portfolioGetCategories2ByParentId( parentId: $parentId){
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
  const { data: {portfolioGetCategories2ByParentId} } = await response.json();
  return  portfolioGetCategories2ByParentId
}
export const getPortfolioCategory2ById = async ( id: string):Promise<Category> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetCategory2ById( $id: String!){
        portfolioGetCategory2ById( id: $id){
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
  const { data: {portfolioGetCategory2ById} } = await response.json();
  return  portfolioGetCategory2ById
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