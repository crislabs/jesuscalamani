import { Page, UpdatePage } from "@/src/interfaces/page";
import axios from "axios";

export async function updatePortfolioPage2(input: UpdatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioUpdatePage2 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdatePage2($input: UpdatePage!) {
        portfolioUpdatePage2(input: $input) {
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
  return portfolioUpdatePage2;
}