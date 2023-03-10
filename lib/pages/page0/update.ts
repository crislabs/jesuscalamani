import { Page, UpdatePage } from "@/src/interfaces/page";
import axios from "axios";

export async function updatePortfolioPage0(input: UpdatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioUpdatePage0 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdatePage0($input: UpdatePage!) {
        portfolioUpdatePage0(input: $input) {
          _id
            data{
              type {
                slug
              }
              name
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioUpdatePage0;
}