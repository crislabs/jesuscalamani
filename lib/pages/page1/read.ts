import { ConnectionArgs } from "@/src/interfaces/site";

export const getPortfolioGetPage1 = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPage1($id: String!){
        portfolioGetPage1(id: $id){
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
  const { data: {portfolioGetPage1} } = await response.json();
  return  portfolioGetPage1
}
export const getPortfolioGetPages1WithCursor = async (args: ConnectionArgs, parentId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPages1WithCursor($args:ConnectionArgs!, $parentId: String!){
        portfolioGetPages1WithCursor(args: $args, parentId: $parentId){
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
  const { data: {portfolioGetPages1WithCursor} } = await response.json();
  return  portfolioGetPages1WithCursor
}

export const getPortfolioPage1BySlug = async (slug: string, siteId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query portfolioGetPage1BySlug($slug:String!, $siteId: String!){
        portfolioGetPage1BySlug(slug: $slug, siteId: $siteId){
          _id
          slug
          data{
            type{
              slug
            }
            name
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
  const { data: {portfolioGetPage1BySlug} } = await response.json();
  return  portfolioGetPage1BySlug
}
