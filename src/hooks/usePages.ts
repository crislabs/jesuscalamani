// import { createPortfolioPage } from "@/lib/pages/page0/create";
import { createPortfolioPage } from "@/lib/pages/create";
import { portfolioDeletePages } from "@/lib/pages/delete";
import { portfolioDeletePages0 } from "@/lib/pages/page0/delete";
import { getPortfolioPage0, getPortfolioPage0BySlug } from "@/lib/pages/page0/read";
import { updatePortfolioPage0 } from "@/lib/pages/page0/update";
import { getPortfolioPageById, getPortfolioPagesByParentId, getPortfolioPagesWithCursorByParentId } from "@/lib/pages/read";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { Error } from "../interfaces/error";
import { CreatePage, ListPage, Page, UpdatePage } from "../interfaces/page";
import { useSelection } from "../providers/SelectionProvider";
import { useUI } from "../providers/UIProvider";
import { SwalMessage, SwalMessageError } from "../utils";

export const useCreatePage = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePage) =>
       createPortfolioPage(input),
  
    onSuccess: async (data) => {
      queryClient.setQueryData<Page[]>(['portfolio-get-pages-by-parent-id', data.parentId], (old) => [...old!, data])
      // queryClient.invalidateQueries(['portfolio-get-pages-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string]);
      await SwalMessage(' Page Created');
      toggle();
    },
    onError: (err) => {
      console.log('err', err)
      SwalMessageError(err as string);
    },
  });
}
export const useUpdatePage0 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePage) =>
      await updatePortfolioPage0(input),
  
    onSuccess: async (data) => {
      queryClient.setQueryData<Page>(['portfolio-get-page0', data._id], data);
      await SwalMessage('Page Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const useGetPageById = (page: Page) => {
  return useQuery<Page>({
    queryKey: ['portfolio-get-page', page._id],
    queryFn: () => getPortfolioPageById( page._id ),
    initialData: page
  });
}
export const useGetPage0BySlug = (slug: string) => {
  return useQuery<Page>({
    queryKey: ['portfolio-get-page0-by-slug', slug],
    queryFn: () => getPortfolioPage0BySlug( slug, process.env.NEXT_PUBLIC_SITE_URL as string)
  });
}

export const useGetPageWithCursorByParentId = (listPage: ListPage) => {
  return useQuery<ListPage>({
    queryKey: ['portfolio-get-pages-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string],
    queryFn: () => getPortfolioPagesWithCursorByParentId( {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string),
    initialData: listPage
  });
}
export const useGetPagesByParentId = (pages: Page[]) => {
  return useQuery<Page[]>({
    queryKey: ['portfolio-get-pages-by-parent-id', process.env.NEXT_PUBLIC_SITE_URL as string],
    queryFn: () => getPortfolioPagesByParentId(  process.env.NEXT_PUBLIC_SITE_URL as string),
    initialData: pages
  });
}


export const useDeletePage = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();

  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (ids: string[]) => await portfolioDeletePages(ids),
      onSuccess:  (ids) => {
        queryClient.invalidateQueries(['portfolio-get-pages-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string])
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error as string,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );
}