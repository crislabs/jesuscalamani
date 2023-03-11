import { Category, UpdateCategory } from "@/src/interfaces/category";
import axios from "axios";

export async function updatePortfolioCategory0ById(input: UpdateCategory): Promise<Category> {
  const {
    data: {
      data: { portfolioUpdateCategory0ById },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdateCategory0ById($input: UpdateCategory!) {
        portfolioUpdateCategory0ById(input: $input) {
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
  return portfolioUpdateCategory0ById;
}