import { Page } from "@/src/interfaces/page";
import { ConnectionArgs } from "@/src/interfaces/site";

export const getPortfolioPageById = async (id: string):Promise<Page> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPageById($id: String!){
        portfolioGetPageById(id: $id){
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
  const { data: {portfolioGetPageById} } = await response.json();
  return  portfolioGetPageById
}
export const getPortfolioPagesWithCursorByParentId = async (args: ConnectionArgs, parentId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPagesWithCursorByParentId($args:ConnectionArgs!, $parentId: String!){
        portfolioGetPagesWithCursorByParentId(args: $args, parentId: $parentId){
         page{
          pageInfo{
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges{
            cursor
            node{
              _id
              slug
              data{
                name
                description
                thumbnailUrl
              }
            }
          }
        }
          pageData{
            count
            limit
            offset
          }
        }
      }
        `,
      variables: {
        args,
        parentId
      },
    }),
  });
  const { data: {portfolioGetPagesWithCursorByParentId} } = await response.json();
  return  portfolioGetPagesWithCursorByParentId
}
export const getPortfolioPageBySlug = async (slug: string, siteId: string):Promise<Page> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query portfolioGetPageBySlug($slug:String!, $siteId: String!){
        portfolioGetPageBySlug(slug: $slug, siteId: $siteId){
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
              description
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
  const { data: {portfolioGetPageBySlug} } = await response.json();
  return  portfolioGetPageBySlug
}
export const getPortfolioPagesBySiteId = async (siteId: string):Promise<Page[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPagesBySiteId($siteId: String!){
        portfolioGetPagesBySiteId(siteId: $siteId){
          _id
          slug
          data{
            type{
              slug
            }
          }
          categories{
            slug
            articles{
              slug
            }
          }
        }
      }
        `,
      variables: {
        siteId
      },
    }),
  });
  const { data: {portfolioGetPagesBySiteId} } = await response.json();
  return  portfolioGetPagesBySiteId
}
export const getPortfolioPagesByParentId = async (parentId: string):Promise<Page[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPagesByParentId($parentId: String!){
        portfolioGetPagesByParentId(parentId: $parentId){
          _id
          parentId
              slug
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
  const { data: {portfolioGetPagesByParentId} } = await response.json();
  return  portfolioGetPagesByParentId
}
