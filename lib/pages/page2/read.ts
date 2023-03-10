import { ConnectionArgs } from "@/src/interfaces/site";

export const getPortfolioGetPage2 = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPage2($id: String!){
        portfolioGetPage2(id: $id){
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
  const { data: {portfolioGetPage2} } = await response.json();
  return  portfolioGetPage2
}
export const getPortfolioGetPages2WithCursor = async (args: ConnectionArgs, parentId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query PortfolioGetPages2WithCursor($args:ConnectionArgs!, $parentId: String!){
        portfolioGetPages2WithCursor(args: $args, parentId: $parentId){
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
  const { data: {portfolioGetPages2WithCursor} } = await response.json();
  return  portfolioGetPages2WithCursor
}

export const getPortfolioPage2BySlug = async (slug: string, siteId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
      query portfolioGetPage2BySlug($slug:String!, $siteId: String!){
        portfolioGetPage2BySlug(slug: $slug, siteId: $siteId){
          _id
          slug
          data{
            name
            thumbnailUrl
            type{
              slug
            }
          }
          pages{
            _id
            slug
            data{
              name
              thumbnailUrl
            }
          }
          articles{
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
  const { data: {portfolioGetPage2BySlug} } = await response.json();
  return  portfolioGetPage2BySlug
}