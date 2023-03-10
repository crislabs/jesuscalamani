
import { CreatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';
export async function createPortfolioPage(input: CreatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioCreatePage },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioCreatePage($input: CreatePage!) {
        portfolioCreatePage(input: $input) {
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
  return portfolioCreatePage;
}

// export const createPortfolioPage = async (input: CreatePage):Promise<Page> => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//   {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({
//       query: `
//       mutation PortfolioCreatePage($input: CreatePage!){
//         portfolioCreatePage(input: $input){
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
//   // if (!data) {
//   //   throw new Error(errors[0].message)
//   // }
//   const { data: { portfolioCreatePage } } = data;
//   return  portfolioCreatePage
  
// }