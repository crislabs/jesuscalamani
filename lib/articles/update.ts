
import { Article, UpdateArticle, UpdateContentArticle } from '@/src/interfaces/article';
import axios from 'axios';

export async function updatePortfolioArticleById(input: UpdateArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioUpdateArticleById },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdateArticleById($input: UpdateArticle!) {
        portfolioUpdateArticleById(input: $input) {
          _id
            data{
              name
              content
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
      variables: { input },
    },
  });
  return portfolioUpdateArticleById;
}
export async function updatePortfolioArticleContentById(input: UpdateContentArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioUpdateContentArticleById },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdateContentArticleById($input: UpdateContentArticle!) {
        portfolioUpdateContentArticleById(input: $input) {
          _id
            data{
              name
              content
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
      variables: { input },
    },
  });
  return portfolioUpdateContentArticleById;
}
