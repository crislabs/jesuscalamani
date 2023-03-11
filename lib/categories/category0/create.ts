
import { Category, CreateCategory } from '@/src/interfaces/category';
import axios from 'axios';

export async function createPortfolioCategory0(input: CreateCategory): Promise<Category> {
  const {
    data: {
      data: { portfolioCreateCategory0 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioCreateCategory0($input: CreateCategory!){
        portfolioCreateCategory0(input: $input){
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
      variables: { input },
    },
  });
  return portfolioCreateCategory0;
}