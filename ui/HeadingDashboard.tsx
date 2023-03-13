
import { FolderPlusIcon } from '@heroicons/react/24/solid';
import { SlideOversForm } from './SlideOversForm';
import { useKeyPress } from 'ahooks';
import Option from './button/Option';
import { FormPage } from './form/FormPage';
import { FormArticle } from './form/FormArticle';
import { Page } from '@/src/interfaces/page';
import { Article } from '@/src/interfaces/article';
import { Site } from '@/src/interfaces/site';
import { Product } from '@/src/interfaces/product';
import { Adoption } from '@/src/interfaces/adoption';
import { useUI } from '@/src/providers/UIProvider';
import { usePath } from '@/src/hooks/usePath';
import { Category } from '@/src/interfaces/category';
import { FormCategory } from './form/FormCategory';
import Modal from './Modal';

interface Props {
  title?: string;

  category?: Category;
  page?: Page;
  article?: Article;
  site?: Site;
  product?: Product;
  adoption?: Adoption;
}

const sortOptionsSite = [
  { name: 'Edit', slug: 'edit', current: true },
  { name: 'More information', slug: 'info', current: false },
  { name: 'Content', slug: 'content', current: false},
  { name: 'Images', slug: 'image', current: false },
  { name: 'Seo', slug: '#', current: false }
]
const sortOptionsArticle = [
  { name: 'Edit', slug: 'edit', current: true },
  { name: 'Content', slug: 'content', current: false},
  { name: 'Images', slug: 'image', current: false},
  { name: 'Seo', slug: '#', current: false }
]
const sortOptionsPage = [
  { name: 'Edit', slug: 'edit', current: true },
  // { name: 'Content', slug: 'content', current: false},
  { name: 'Seo', slug: '#', current: false }
]

export function HeadingDashboard(props: Props) {
  const { page, site, article, product, title, category } = props;
  const path = usePath();
  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm,
    toggleModal,
    toggleSlideOversFormArticle,
  } = useUI();
  useKeyPress(['ctrl.shift.e'], () => {
    toggleSlideOversFormArticle.actions.toggle();
    // setChildrens(<FormContent article={article} />)
  });
  const handleClickEdit = (slug: string) => {
    if (path.length === 3) {
      toggleSlideOversForm.actions.toggle();
        setChildrens(<FormPage page={page} />);
    }
    if (category) {
      toggleSlideOversForm.actions.toggle();
        setChildrens(<FormCategory category={category} />);
    }
    if (path[2] === 'articles' && slug === 'image') {
      toggleModal.actions.toggle()
    }
    if (path[1] === 'articles') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticle article={article} />);
    }
  }
  const handleClickAdd = () => {
    if (
       path.length === 2 && path[1] === 'pages'
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormPage />);
    }
    if (page?.data.type.slug === 'blog') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticle />);
    }
    if (category?.data.type.slug === 'blog') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticle />);
    }
    if (page?.data.type.slug === 'category') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormCategory />);
    }
    if (category?.data.type.slug === 'category') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormCategory />);
    }
    if (article) {
      toggleModal.actions.toggle()
    }
    // if (
    //   path[5] === 'page0' && page?.data.type.slug === 'service'
    // ) {
    //   toggleSlideOversForm.actions.toggle();
    //   setChildrens(<FormService />);
    // }
    // if (
    //   path[5] === 'page1' && page?.data.type.slug === 'product'
    // ) {
    //   toggleSlideOversForm.actions.toggle();
    //   setChildrens(<FormProduct />);
    // }
    
  };
  const handleClickUpdateDetails = () => {
    toggleSlideOversForm.actions.toggle();
    // setChildrens(<FormDetails product={product} />)
  };
  const handleClickUpdateSpecs = () => {
    toggleSlideOversForm.actions.toggle();
    // setChildrens(<FormSpecs product={product} />)
  };
  
  return (
    <div className=''>
      <div className="flex lg:items-center justify-between">
        <div className="min-w-0 flex space-x-2">
          <h2 className="text-2xl font-bold leading-7  sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          
          {site && (
            <Option onPress={handleClickEdit} options={sortOptionsSite}/>
          )}
          {page && (
            <Option onPress={handleClickEdit} options={sortOptionsPage}/>
            )}
          {article && (
            <Option onPress={handleClickEdit} options={sortOptionsArticle}/>
          )}
          {category && (
            <Option onPress={handleClickEdit} options={sortOptionsArticle}/>
          )}
        </div>
        <div className="flex">
            <span className="block">
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickAdd()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">
                  {path.length === 2 && 'Add Page'}
                  {
                    page?.data.type.slug === 'blog' && 'Add Article'
                  }
                  {
                    page?.data.type.slug === 'category' && 'Add Category'
                  }
                  {
                    category?.data.type.slug === 'category' && 'Add Category'
                  }
                  {
                    category?.data.type.slug === 'blog' && 'Add Blog'
                  }
                  {
                    path[1] === 'articles' && 'Add Image'
                  }
                  
                </p>
              </button>
            </span>
          {/* {!['products', 'articles'].includes(path[1]) && (
            <span className="block">
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickAdd()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">
                  {path.length === 2 && 'Add Page'}
                  {
                    page?.data.type.slug === 'blog' && 'Add Article'
                  }
                  {
                    path[1] === 'articles' && 'Add Content'
                  }
                  
                </p>
              </button>
            </span>
          )} */}
          {/* {path[1] === 'products' && (
            <span className="block space-x-3">
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickUpdateDetails()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">Add Details</p>
              </button>
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickUpdateSpecs()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">Add Specs</p>
              </button>
            </span>
          )} */}
        </div>
      </div>

      <SlideOversForm children={childrens} />
      <Modal />
    </div>
  );
}
