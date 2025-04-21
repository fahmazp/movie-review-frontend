import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AlignLeft, CircleX, SquareChartGantt } from 'lucide-react';
import { ModeToggle } from "../shared/mode-toggle";
import logo from "../../assets/images/image 1.png";
import NavSearch from './Navbar-search';
import { Link, useLocation  } from 'react-router-dom';
import RippleButton from './ripple-btn';
import Sidebar from './Sidebar';

const navigation = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/tv-shows" },
  { name: "Watchlists", path: "/user/watchlists" },
  { name: "News", path: "/news" },
  { name: "Profile", path: "/user/profile"}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const location = useLocation(); // Get current route
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <>
    <Disclosure as="nav" className="bg-[#000000]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-transparent hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset cursor-pointer">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <AlignLeft aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <CircleX aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start sm:gap-5">
          <div className="flex shrink-0 items-center" id="logo-name">
              <img alt="logo" src={logo} className="sm:h-12 h-8 w-auto object-cover" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xs sm:text-[15px] tracking-wider text-[#F8B319]">Honey</span>
                <span className="font-bold text-xs sm:text-[15px] tracking-wider text-[#F8B319]">Popcorn</span>
              </div>
            </div>

            {/* Sidebar Toggle */}
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center rounded-2xl px-1.5 py-1 text-gray-200 hover:bg-[#121212] focus:outline-none"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <CircleX className="size-6" />
                ) : (
                  <div className="flex items-center gap-2">
                  <SquareChartGantt className="size-6 hidden sm:block" />
                  <span className="text-sm font-semibold sm:block hidden">Menu</span>
                  </div>
                )}
              </button>
            </div>

            <div className="hidden sm:flex sm:items-center">
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
          </div>
          
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              as={Link}
              key={item.name}
              to={item.path}
              aria-current={location.pathname === item.path ? "page" : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-[#F8B319]',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>

    {/* Sidebar Component */}
    {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

    </>
  )
}
