import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AlignLeft, CircleX } from 'lucide-react';
import { ModeToggle } from "../shared/mode-toggle";
import logo from "../../assets/images/image 1.png";
import NavSearch from './Navbar-search';
import { Link, useLocation  } from 'react-router-dom';
import RippleButton from './ripple-btn';

const navigation = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/tv-shows" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const location = useLocation(); // Get current route
  
  return (
    <Disclosure as="nav" className="bg-[#000000]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-transparent hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset cursor-pointer">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <AlignLeft aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <CircleX aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
          <div className="flex shrink-0 items-center" id="logo-name">
              <img alt="logo" src={logo} className="h-12 w-auto object-cover" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[15px] tracking-wider text-[#F8B319]">Honey</span>
                <span className="font-bold text-[15px] tracking-wider text-[#F8B319]">Popcorn</span>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-8 gap-5">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                    className={classNames(
                      location.pathname === item.path ? 'text-[#F8B319] underline underline-offset-4 font-extrabold' : 'text-white relative',
                      'rounded-md px-3 py-2 text-sm transition-all duration-300',
                      'hover:underline hover:underline-offset-4 hover:decoration-2'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                </div>
                <div>
                      <NavSearch />
                </div>
            </div>

          </div>


          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:gap-3 sm:ml-6 sm:pr-0">
            <ModeToggle />    
            <Link to="/login">
                <RippleButton bgColor="border-[#F8B319]">
                  <span className='text-sm'>Sign In</span>
                </RippleButton>
            </Link>    
            
            {/* <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu> */}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
