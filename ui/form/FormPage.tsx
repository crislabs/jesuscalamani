import { Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';


import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import React from 'react';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
// import { useCreatePage0, useUpdatePage0 } from '@/src/hooks/usePages0';
// import { useCreatePage1 } from '@/src/hooks/usePages1';
// import { useCreatePage2 } from '@/src/hooks/usePages2';
import { CreatePage, Page, UpdatePage } from '@/src/interfaces/page';
import { typePagePet } from '@/src/utils';
import { useCreatePage } from '@/src/hooks/usePages';


interface Props {
  page?: Page;
}

export function FormPage(props: Props) {
  const { page } = props;
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const createPage0 = useCreatePage();
  // const updatePage0 = useUpdatePage0();
  // const createPage1 = useCreatePage1();
  // const createPage2 = useCreatePage2();

  return (
    <Formik
      initialValues={
        page
          ? {
              id: page?._id as string,
              name: page.data.name,
              description: page.data.description,
              siteId: process.env.NEXT_PUBLIC_SITE_URL as string,
              parentId: page.parentId,
              uid: '123',
              type: page.data.type.slug
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
        if (page) {
          if (path.length === 4) {
            if (path[2]==='page0') {
              
              // updatePage0.mutate({...values, parentId: path[3]} as UpdatePage)
            }
            if (path[2]==='page1') {
              
              // createPage2.mutate({...values, parentId: path[3]} as CreatePage)
            }
            
          }
        } else {
          
          if (path.length === 2) {
            
            createPage0.mutate({...values, parentId: process.env.NEXT_PUBLIC_SITE_URL as string} as CreatePage)
          } 
          if (path.length === 4) {
            if (path[2]==='page0') {
              
              // createPage1.mutate({...values, parentId: path[3]} as CreatePage)
            }
            if (path[2]==='page1') {
              
              // createPage2.mutate({...values, parentId: path[3]} as CreatePage)
            }
            
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
              {page ? 'Edit Page' : 'New Page'}
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
                              typePagePet.map((data) => (
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
            <button type="submit" className="btn-primary ">
              Add
            {/* {page
                ? updatePage0.isLoading
                  ? '...Updating'
                  : 'Update'
                : (createPage0.isLoading || createPage1.isLoading)
                ? '...Saving'
                : 'Save'} */}
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
