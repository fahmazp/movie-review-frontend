import React,{ useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { AlignLeft, CircleX, Search, SquareChartGantt } from 'lucide-react';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  // const searchInputRef = useRef(null); // ref for input

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Auto-focus input when search is opened
  // useEffect(() => {
  //   if (isSearchOpen && searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [isSearchOpen]);

  return (
    <>
    <Disclosure as="nav" className="bg-[#000000]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-1 text-gray-200 hover:bg-transparent hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset cursor-pointer">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <AlignLeft aria-hidden="true" className="block size-5 group-data-open:hidden" />
              <CircleX aria-hidden="true" className="hidden size-5 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center gap-2 sm:justify-start sm:gap-1 md:gap-4">
          <div className="flex shrink-0 items-center" id="logo-name">
              <img alt="logo" src={logo} className="sm:h-12 h-7 w-auto object-cover" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xs sm:text-[15px] tracking-wider text-[#F8B319]">Honey</span>
                <span className="font-bold text-xs sm:text-[15px] tracking-wider text-[#F8B319]">Popcorn</span>
              </div>
            </div>

            {/* <div className="relative sm:hidden">
              <input
                type="text"
                className="w-24 rounded-md bg-zinc-800 pl-8 pr-2 py-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#F8B319]"
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16}/>
              </div>
            </div> */}

{/* Search icon for mobile */}
{isSearchOpen && (
  <div className="absolute inset-0 bg-[#000000] flex items-center px-4 sm:hidden z-99">
    <Search size={18} className="text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      className="ml-2 flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
    />
    <button
      onClick={() => setIsSearchOpen(false)}
      className="ml-2 text-gray-400 hover:text-white"
    >
      <CircleX size={22} />
    </button>
  </div>
)}

            {/* Sidebar Toggle */}
            <div className="hidden sm:flex items-center">
              <button
                className="inline-flex items-center justify-center rounded-2xl px-4 py-1 text-gray-200 hover:bg-[#1a1a1a] focus:outline-none"
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
            {/* Mobile Search Icon */}
            {!isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-white sm:hidden"
              >
                <Search size={20} />
              </button>
            )}
            <div className="hidden md:block">
            <ModeToggle />    
            </div>

            <Link to="/login">
                <RippleButton bgColor="border-[#F8B319]">
                  <span className='text-sm'>Sign In</span>
                </RippleButton>
            </Link>    
          </div>
          
        </div>
      </div>

{/* Mobile Search Full Width Overlay */}
{/* {isSearchOpen && (
        <div className="absolute inset-0 bg-[#000000] flex items-center px-4 sm:hidden z-20">
          <Search size={18} className="text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className="ml-2 flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <CircleX size={22} />
          </button>
        </div>
      )} */}

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

    <div className="mt-2 px-3">
      <ModeToggle />
    </div>

        </div>
      </DisclosurePanel>
    </Disclosure>

    {/* Sidebar Component */}
    {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

    </>
  )
}
