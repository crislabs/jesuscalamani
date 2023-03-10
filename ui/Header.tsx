'use client'
/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
// import { useTheme } from 'next-use-theme';
import { useTheme } from 'next-themes';
import { usePath } from '@/src/hooks/usePath';
// import { usePath } from '@/src/hooks/usePath';
import { useLocalStorageState } from 'ahooks';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'About me', href: '/about-me' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  // const currentTheme = localStorage.getItem("theme");
  // console.log('currentTheme', currentTheme)
  const path = usePath()
  if (path[0]=== 'dashboard') return null

  return (
    <div className="isolate">
      <div className="px-6 pt-6 py-6 lg:px-8 ">
        <nav className="flex items-center justify-between " aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <div className='text-skin-accent text-3xl font-bold'>JC</div>
              <span className="sr-only">Your Company</span>
              {/* <img
                className="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
            </Link>
          </div>
          <div className="flex space-x-3 lg:hidden">
              
          {theme! === 'dark' ? (
              <div
                onClick={() => {setTheme('light')}}
                className=" items-center"
              >
                <SunIcon
                  className="h-6 w-6 fill-skin-base hover:fill-skin-accent focus-outline"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div
                onClick={() => {setTheme('dark')}}
                className=" items-center"
              >
                <MoonIcon
                  className="h-6 w-6 fill-skin-base hover:fill-skin-accent focus-outline"
                  aria-hidden="true"
                />
              </div>
            )}
            <button
              type="button"
              className=" items-center"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 fill-skin-base hover:fill-skin-accent focus-outline" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-skin-base"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
              
            {theme! === 'dark' ? (
              <div
                onClick={() => setTheme('light')}
                className=" text-gray-400 hover:text-gray-500 items-center"
              >
                <SunIcon
                  className="h-6 w-6 fill-skin-base hover:fill-skin-accent focus-outline"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div
                onClick={
                  () => setTheme('dark')
                  // () => console.log('click')

                }
                className=" text-gray-400 hover:text-gray-500 items-center"
              >
                <MoonIcon
                  className="h-6 w-6 fill-skin-base hover:fill-skin-accent focus-outline"
                  aria-hidden="true"
                />
              </div>
            )}

            <a
              href="#"
              className="text-sm font-semibold leading-6 text-skin-base"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-skin-fill px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-skin-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-skin-base hover:bg-gray-400/10"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-skin-base hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
                
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
        <hr className='border-skin-line'/>
    </div>
  );
}
