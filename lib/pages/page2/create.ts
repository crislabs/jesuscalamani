import { CreatePage, Page } from "@/src/interfaces/page";
import axios from 'axios';
export async function createPortfolioPage2(input: CreatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioCreatePage2 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioCreatePage2($input: CreatePage!) {
        portfolioCreatePage2(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioCreatePage2;
}

