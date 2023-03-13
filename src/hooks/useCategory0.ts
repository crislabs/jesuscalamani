import { createPortfolioCategory0 } from '@/lib/categories/category0/create';
import { portfolioDeleteCategories0 } from '@/lib/categories/category0/delete';
import {
  getPortfolioCategories0ByParentId,
  getPortfolioCategory0ById,
  getPortfolioCategory0BySlug,
} from '@/lib/categories/category0/read';
import { updatePortfolioCategory0ById } from '@/lib/categories/category0/update';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Category, CreateCategory, UpdateCategory } from '../interfaces/category';
import { useSelection } from '../providers/SelectionProvider';
import { useUI } from '../providers/UIProvider';
import { SwalMessage, SwalMessageError } from '../utils';
import { usePath } from './usePath';

export const useCreateCategory0 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCategory) => 
       await createPortfolioCategory0(input)
    ,

    onSuccess: async (data) => {
      // console.log('data', data)
      queryClient.setQueryData<Category[]>(['portfolio-get-categories0-by-parent-id', data.parentId], (old) => [...old!, data])
      // queryClient.invalidateQueries(['portfolio-get-categories0-by-parent_id', data.parentId]);
      await SwalMessage('Category Created');
      toggle();
    },
    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
};

export const useUpdateCategory0ById = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateCategory) =>
      await updatePortfolioCategory0ById(input),
  
    onSuccess: async (data) => {
      queryClient.setQueryData<Category>(['portfolio-get-category0-by-id', data._id], data);
      await SwalMessage('Category Updated');
      toggle();
    },
    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
}

export const useDeleteCategoriesOById = () => {
  
  const { unSelectAll } = useSelection();
  const path= usePath()
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (ids: string[]) => await portfolioDeleteCategories0(ids),
      onSuccess:  (data, ids) => {
        // console.log('variables', variables)
        queryClient.setQueryData<Category[]>(['portfolio-get-categories0-by-parent-id', path[2]], (old) => old?.filter(data => !ids.includes(data._id)))
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

export const useGetCategory0BySlug = (category: Category) => {
  return useQuery<Category>({
    queryKey: ['portfolio-get-category0-by-slug', category.slug],
    queryFn: () => getPortfolioCategory0BySlug( category.slug, process.env.NEXT_PUBLIC_SITE_URL as string),
    initialData: category
  });
};
export const useGetCategory0ById = (category: Category) => {
  return useQuery<Category>({
    queryKey: ['portfolio-get-category0-by-id', category._id],
    queryFn: () => getPortfolioCategory0ById(category._id),
    initialData: category,
  });
};

export const useGetCategories0ByParentId = (
  categories: Category[],
  parentId: string,
) => {
  return useQuery<Category[]>({
    queryKey: ['portfolio-get-categories0-by-parent-id', parentId],
    queryFn: () => getPortfolioCategories0ByParentId(parentId),
    initialData: categories,
  });
};
