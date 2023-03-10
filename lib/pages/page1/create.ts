import { CreatePage, Page } from "@/src/interfaces/page";
import axios from 'axios';
export async function createPortfolioPage1(input: CreatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioCreatePage1 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioCreatePage1($input: CreatePage!) {
        portfolioCreatePage1(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioCreatePage1;
}

