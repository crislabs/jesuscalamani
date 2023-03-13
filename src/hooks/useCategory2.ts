import { portfolioDeleteCategories0 } from '@/lib/categories/category0/delete';
import { createPortfolioCategory2 } from '@/lib/categories/category2/create';
import { getPortfolioCategories2ByParentId, getPortfolioCategory2ById } from '@/lib/categories/category2/read';
import { updatePortfolioCategory2ById } from '@/lib/categories/category2/update';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Category, CreateCategory, UpdateCategory } from '../interfaces/category';
import { useSelection } from '../providers/SelectionProvider';
import { useUI } from '../providers/UIProvider';
import { SwalMessage, SwalMessageError } from '../utils';
import { usePath } from './usePath';

export const useCreateCategory2 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCategory) => 
       await createPortfolioCategory2(input)
    ,

    onSuccess: async (data) => {
      // console.log('data', data)
      queryClient.setQueryData<Category[]>(['portfolio-get-categories2-by-parent-id', data.parentId], (old) => [...old!, data])
      // queryClient.invalidateQueries(['portfolio-get-categories0-by-parent_id', data.parentId]);
      await SwalMessage('Category Created');
      toggle();
    },
    onError: (err) => {
      // console.log('err', err)
      SwalMessageError(err as string);
    },
  });
};

export const useUpdateCategory2ById = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateCategory) =>
      await updatePortfolioCategory2ById(input),
  
    onSuccess: async (data) => {
      queryClient.setQueryData<Category>(['portfolio-get-category2-by-id', data._id], data);
      await SwalMessage('Category Updated');
      toggle();
    },
    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
}

export const useDeleteCategories2ById = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();
  const path= usePath()
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (ids: string[]) => await portfolioDeleteCategories0(ids),
      onSuccess:  (data, ids) => {
        // console.log('variables', variables)
        queryClient.setQueryData<Category[]>(['portfolio-get-categories2-by-parent-id', path[2]], (old) => old?.filter(data => !ids.includes(data._id)))
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

export const useGetCategory2ById = (category: Category) => {
  return useQuery<Category>({
    queryKey: ['portfolio-get-category2-by-id', category._id],
    queryFn: () => getPortfolioCategory2ById(category._id),
    initialData: category,
  });
};

export const useGetCategories2ByParentId = (
  categories: Category[],
  parentId: string,
) => {
  return useQuery<Category[]>({
    queryKey: ['portfolio-get-categories2-by-parent-id', parentId],
    queryFn: () => getPortfolioCategories2ByParentId(parentId),
    initialData: categories,
  });
};
