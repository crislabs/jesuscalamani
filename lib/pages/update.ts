import { Page, UpdatePage } from "@/src/interfaces/page";
import axios from "axios";

export async function updatePortfolioPageById(input: UpdatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioUpdatePageById },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdatePageById($input: UpdatePage!) {
        portfolioUpdatePageById(input: $input) {
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
      variables: { input },
    },
  });
  return portfolioUpdatePageById;
}