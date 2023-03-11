import { Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import { typeCategoryPortfolio } from '@/src/utils';
import { Category, CreateCategory, UpdateCategory } from '@/src/interfaces/category';
import { useCreateCategory0, useUpdateCategory0ById } from '@/src/hooks/useCategory0';
import { useCreateCategory1, useUpdateCategory1ById } from '@/src/hooks/useCategory1';


interface Props {
  category?: Category;
}

export function FormCategory(props: Props) {
  const { category } = props;
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const createCategory0 = useCreateCategory0();
  const createCategory1 = useCreateCategory1();
  const updateCategory0 = useUpdateCategory0ById();
  const updateCategory1 = useUpdateCategory1ById();
  // const updatePage0 = useUpdatePage0();
  // const createPage1 = useCreatePage1();
  // const createPage2 = useCreatePage2();

  return (
    <Formik
      initialValues={
        category
          ? {
              id: category?._id as string,
              name: category.data.name,
              description: category.data.description,
              siteId: process.env.NEXT_PUBLIC_SITE_URL as string,
              parentId: category.parentId,
              uid: '123',
              type: category.data.type.slug
            }
          : {
              name: '',
              description: 'Page description',
              uid: '123',
              type: '',
              siteId: process.env.NEXT_PUBLIC_SITE_URL as string,
            }
      }
      onSubmit={(values) => {
        
        if (category) {
          if (path[3]==='category0') {
            updateCategory0.mutate({...values} as UpdateCategory)
          }
          if (path[3]==='category1') {
            updateCategory1.mutate({...values} as UpdateCategory)
            }
          
        } else {
          
          if (path.length === 3) {
            createCategory0.mutate({...values, parentId: path[2]} as CreateCategory)
          }
          if (path[3]==='category0') {
            createCategory1.mutate({...values, parentId: path[4]} as CreateCategory)
          }
          if (path[3]==='category') {
          }
          
        }
        
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(50, 'Debe tener 30 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {category ? 'Edit Category' : 'New Category'}
            </Dialog.Title>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={toggleSlideOversForm.actions.setLeft}
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <div>
                <div className="sm:rounded-md">
                  <div className="bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label className="label-form">Name</label>
                        <Field name="name" type="text" className="input-form" autoComplete="off" />
                        <ErrorMessage name="name" />
                      </div>

                      <div className="col-span-6">
                        <label className="label-form">Description</label>
                        <div className="mt-1">
                          <Field
                            className="input-form"
                            component="textarea"
                            rows="10"
                            name="description"
                          />
                          <ErrorMessage name="description" />
                        </div>
                      </div>

                      <div className="col-span-6">
                        <h2 className="contents text-sm font-medium text-gray-700">
                          Type
                        </h2>
                        <div className="grid grid-cols-2">
                          <React.Fragment>
                            {
                              typeCategoryPortfolio.map((data) => (
                                <div
                                  className="flex items-center my-2"
                                  key={data.label}
                                >
                                  <Field
                                    type="radio"
                                    name="type"
                                    value={data.value}
                                  />

                                  <label className="ml-3 label-form">
                                    {data.label}
                                  </label>
                                </div>
                              ))}
                          </React.Fragment>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-t border-gray-200 p-3 bg-gray-200">
          <div className="group-button-form ">
            <button type="submit" className="btn-primary">
            {category
                ? (updateCategory0.isLoading || updateCategory1.isLoading)
                  ? '...Updating'
                  : 'Update'
                : (createCategory0.isLoading || createCategory1.isLoading )
                ? '...Saving'
                : 'Save'}
            </button>
            <button
              type="button"
              className="btn-default"
              onClick={toggleSlideOversForm.actions.setLeft}
            >
              Cancel
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
