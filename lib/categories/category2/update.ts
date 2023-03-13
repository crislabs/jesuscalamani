import { Category, UpdateCategory } from "@/src/interfaces/category";
import axios from "axios";

export async function updatePortfolioCategory2ById(input: UpdateCategory): Promise<Category> {
  const {
    data: {
      data: { portfolioUpdateCategory2ById },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdateCategory2ById($input: UpdateCategory!) {
        portfolioUpdateCategory2ById(input: $input) {
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
      variables: { input },
    },
  });
  return portfolioUpdateCategory2ById;
}