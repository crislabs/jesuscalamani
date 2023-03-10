// import { Article } from "../article/article.interface";
// import { Product } from "../product/product.interface";
// import { Food } from "./product/food.interface";
import { Article } from "./article";
import { Pet, Type } from "./pet";
import { Product } from "./product";
import { Image, Seo } from "./site";

export interface Category {
  _id: string;
  data: DataCategory;
  slug: string;
  parentId: string;
  articles?: Article[];
  categories?: Category[];
  products?: Product[]
  adoptions?: Product[]
  // pets?: any[];
}

interface DataCategory {
  name: string
  description: string
  thumbnailUrl: string
  siteId: string
  type: Type
  icon?: Image;
}

export interface CreateCategory {
  name: string
  description: string
  type: string
  parentId: string
  siteId: string
  uid: string
}
export interface UpdateCategory {
  id:string
  name: string
  description: string
  type: string
  parentId: string
  siteId: string
  uid: string
}
export interface UpdateImage {
  id:string
  type:string
  uid: string
  images: {
    src: string
    alt: string
  }
}

export interface DeleteCategories {
  ids:string[]
}

export interface ListPage {
  page: ConnectionPage
  pageData: PageDataPage
}
export interface ConnectionPage {
  edges: EdgePage[]
  pageInfo: PageInfoPage
}
export interface EdgePage {
  cursor: string
  node: Category
}
export interface PageInfoPage {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataPage {
  count: number
  limit: number
  offset:number
}
