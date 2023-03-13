'use client'

// import { useSelection } from '@/src/providers/SelectionContext';

import { TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { usePath } from '@/src/hooks/usePath';
import { useSelection } from '@/src/providers/SelectionProvider';
import { useDeletePage } from '@/src/hooks/usePages';
import { useDeleteCategoriesOById } from '@/src/hooks/useCategory0';
import { useDeleteArticlesById } from '@/src/hooks/useArticles1';
import { useQueryClient } from '@tanstack/react-query';
import { Category } from '@/src/interfaces/category';
// import { useDeletePage0 } from '@/src/hooks/usePages0';
// import { useDeletePage1 } from '@/src/hooks/usePages1';
// import { useDeletePage2 } from '@/src/hooks/usePages2';

interface Props {
  type?: string
}

export function HeadingDashboardOption(props: Props) {
  // console.log('props', props)
  const { selected, allSelected, toggleAll, unSelectAll } = useSelection();
  const path = usePath();

  const deletePortfolioPages = useDeletePage()
  const deletePortfolioCategories0 = useDeleteCategoriesOById()
  const deletePortfolioArticles = useDeleteArticlesById()
  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData(['portfolio-get-articles1-by-id', path[4]])
  const category = queryClient.getQueryData<Category>(['portfolio-get-category0-by-id', path[4]])
  // console.log('category', category)
  const deleteHandle = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        {
          path.length === 2 && deletePortfolioPages.mutate(selected)
        }
        {
          path.length === 3 && deletePortfolioCategories0.mutate(selected)
        }
        if (path.length === 5) {
          {
            category?.data.type.slug === 'blog' && deletePortfolioArticles.mutate(selected)
          }
          
        }
        
        
        
      }
    });
  };
  return (
    <div
      className={` ${
        selected.length !== 0 ? 'opacity-100' : 'hidden  -translate-y-6 '
      } `}
    >
      <div className="mx-auto max-w-7xl pt-3 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
          <input
            type="checkbox"
            className="h-5 w-5  rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 bg-white"
            onChange={() => toggleAll}
            checked={allSelected}
            onClick={toggleAll}
          />
            
            <p className="ml-2 text-sm font-medium">Select All</p>
          </div>

          <span
            className={`block opacity-100 transition ease-in-out delay-150`}
            >
            <button className="btn-default" onClick={() => deleteHandle()}>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <p className="">({selected.length})</p>
            </button>
          </span>
        </div>
      </div>
      </div>

  );
}