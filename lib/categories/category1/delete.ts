
export async function portfolioDeleteCategories0(ids: string[]):Promise<string[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     query: `
     mutation PortfolioDeleteCategories0ById($ids: [String!]!) {
       portfolioDeleteCategories0ById(ids: $ids) 
     }
     `,
     variables: {ids},
   }),
 })
 .then(res => res.json())
 .then((res)=> res.data)
 .then((result) => result.portfolioDeletePages0) 
}
