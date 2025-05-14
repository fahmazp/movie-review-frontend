import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { useDispatch } from 'react-redux';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ModeToggle } from "../shared/mode-toggle";
import { axiosInstance } from '@/config/axiosInstance';
import { clearUser } from '@/redux/features/userSlice';
import logo from "../../assets/images/image 1.png";
import { AlignLeft, CircleX, Search, SquareChartGantt, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { NavSearch } from './Navbar-search';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { clearAdmin } from '@/redux/features/adminSlice';

const navigation = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/tv-shows" },
  { name: "Watchlist", path: "/user/watchlist" },
  { name: "News", path: "/news" },
  { name: "Profile", path: "/user/profile"}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const location = useLocation(); // Get current route
  const [userDetails, error] = useFetch("/user/profile")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const containerRef = useRef(null);
  const { searchText, handleSearchChange, filteredMovies } = useMovieSearch()

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/user/logout", { withCredentials: true });
          localStorage.removeItem("userInfo");
          localStorage.removeItem("adminInfo");
          dispatch(clearUser());
          dispatch(clearAdmin());
          toast.success("You've been logged out");
          navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed, please try again.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    handleSearchChange({ target: { value: "" } }); // Clear input
  };  

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen])

  return (
    <>
    <Disclosure as="nav" className="bg-[#000000]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-transparent hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset cursor-pointer">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <AlignLeft color="#F8B319" aria-hidden="true" className="block size-7 group-data-open:hidden" />
              <X aria-hidden="true" color="#F8B319" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-start sm:gap-1 md:gap-4">
          <div className="flex shrink-0 items-center" id="logo-name">
              <img alt="logo" src={logo} className="sm:h-12 h-7 w-auto object-cover" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xs sm:text-[15px] tracking-wider text-[#F8B319]">Honey</span>
                <span className="font-bold text-xs sm:text-[15px] tracking-wider text-[#F8B319]">Popcorn</span>
              </div>
            </div>
        
        {/* Search bar for mobile */}
        {isSearchOpen && (
          <div ref={containerRef} className="absolute inset-0 bg-[#000000] flex flex-col px-4 pt-5 sm:hidden z-50">
            <div className="flex items-center">
              <Search size={18} className="text-yellow-200" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                className="ml-2 flex-1 bg-transparent text-white placeholder-yellow-200 focus:outline-none text-sm"
              />
              <button onClick={closeSearch} className="ml-2 text-yellow-300">
                <CircleX size={22} />
              </button>
            </div>

            {/* Search Results */}
            {searchText && (
              <div className="bg-zinc-950 border border-gray-300 rounded-md mt-4 shadow-lg max-h-80">
                {filteredMovies.length > 0 ? (
                  filteredMovies.slice(0, 5).map((movie) => (
                    <Link
                      to={`/moviesDetails/${movie._id}`}
                      key={movie._id}
                      onClick={closeSearch}
                      className="block px-4 py-2 text-gray-200 hover:text-[#F8B319]"
                    > 
                      {movie.title}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-300">No movies found</div>
                )}
              </div>
            )}
          </div>
          )}


            {/* Sidebar Toggle */}
            <div className="hidden sm:flex items-center">
              <button
                className="inline-flex items-center justify-center rounded-2xl px-2 py-1 text-gray-200 hover:bg-[#121212] focus:outline-none"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <CircleX className="size-6" />
                ) : (
                  <div className="flex items-center gap-2">
                  <SquareChartGantt color="#F8B319" className="size-6 hidden sm:block" />
                  <span className="text-sm font-semibold sm:block hidden">Menu</span>
                  </div>
                )}
              </button>
            </div>

            <div className="hidden sm:flex sm:items-center w-full">
                  <NavSearch />
            </div>
          </div>


          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Mobile Search Icon */}
            {!isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-3 text-gray-200 hover:text-yellow-400 sm:hidden"
              >
                <Search size={22} />
              </button>
            )}
            <div className="hidden md:block">
            <ModeToggle />    
            </div>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-300 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="profile"
                    src={userDetails?.profiePic}
                    className="size-7 sm:size-8 rounded-full object-cover"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <Link
                  to="/user/profile"
                    className="block px-4 py-2 text-sm text-gray-700
                    data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 
                    data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                   <button
                     onClick={handleLogout}
                     className="w-full text-left block px-4 py-2 text-sm text-gray-700 
                       data-focus:bg-gray-100 data-focus:outline-hidden"
                   >
                     Log out
                   </button>
                </MenuItem>
              </MenuItems>
            </Menu>
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
    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  )
}
