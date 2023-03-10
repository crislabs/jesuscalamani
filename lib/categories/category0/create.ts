
import { Category, CreateCategory } from '@/src/interfaces/category';
import axios from 'axios';

// export const createPortfolioCategory0 = async (input: CreateCategory):Promise<Category> => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//   {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({
//       query: `
//       mutation PortfolioCreateCategory0($input: CreateCategory!){
//         portfolioCreateCategory0(input: $input){
//           _id
//         }
//       }
//         `,
//       variables: {
//         input
//       },
//     }),
//   });
//   const { data, errors } = await response.json()
//   if (!data) {
//     throw new Error(errors[0].message)
//   }
//   const { data: { portfolioCreateCategory0 } } = data;
//   return  portfolioCreateCategory0
  
// }
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