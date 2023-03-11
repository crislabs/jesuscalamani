import { Article, ListArticle } from "@/src/interfaces/article";
import { ConnectionArgs } from "@/src/interfaces/site";

export async function getPortfolioArticleBySlug(slug: string, siteId: string): Promise<Article> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query portfolioGetArticleBySlug($slug: String!, $siteId: String!){
        portfolioGetArticleBySlug(slug: $slug, siteId: $siteId){
          _id
            data{
              content
              name
              description
              thumbnailUrl
              updateDate{
                createdAt
              }
            }
          slug
          parentId
        }
      }
      `,
      variables: { slug, siteId },
    }),
  })
  const { data: {portfolioGetArticleBySlug} } = await response.json();
  return  portfolioGetArticleBySlug
}
export async function getPortfolioArticleById(id: string): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticleById($id: String!){
        portfolioGetArticleById(id: $id){
          _id
            data{
              content
              name
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
      `,
      variables: { id },
    }),
    next: { revalidate: 10 },
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticleById)
}

export async function getPortfolioArticles(): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticles{
        portfolioGetArticles{
          _id
          
        }
      }
      `,
      variables: {  },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticles)
}
export async function getPortfolioArticlesByParentId(
  parentId: string,
): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesByParentId($parentId: String!){
        portfolioGetArticlesByParentId( parentId:$parentId){
          _id
          parentId
                data{
                  name
                  description
                  thumbnailUrl
                }
                slug
        }
      }
      `,
      variables: { parentId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesByParentId);
}
export async function getPortfolioArticlesWithCursorByParentId(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListArticle> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesWithCursorByParentId($args: ConnectionArgs!, $parentId: String!){
        portfolioGetArticlesWithCursorByParentId(args: $args, parentId:$parentId){
          page {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                _id
                data{
                  name
                  description
                  thumbnailUrl
                }
                slug
              }
            }
          }
          pageData {
            count
            limit
            offset
          }
       
          
        }
      }
      `,
      variables: { args, parentId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesWithCursorByParentId);
}
export async function getPortfolioArticlesWithCursorBySiteId(
  args: ConnectionArgs,
  siteId: string,
): Promise<ListArticle> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesWithCursorBySiteId($args: ConnectionArgs!, $siteId: String!){
        portfolioGetArticlesWithCursorBySiteId(args: $args, siteId:$siteId){
          page {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                _id
                data{
                  name
                  description
                  thumbnailUrl
                }
                slug
              }
            }
          }
          pageData {
            count
            limit
            offset
          }
       
          
        }
      }
      `,
      variables: { args, siteId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesWithCursorBySiteId);
}
export async function getPortfolioArticlesBySiteId(
  siteId: string,
): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesBySiteId( $siteId: String!){
        portfolioGetArticlesBySiteId(siteId:$siteId){
          _id
          slug
        }
      }
      `,
      variables: { siteId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesBySiteId);
}
