import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { Menu, X, House, Users, Video, CircleUserRound  } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '@/config/axiosInstance'
import toast from 'react-hot-toast'
import { clearAdmin } from '@/redux/features/adminSlice'
import logo from "../../assets/images/Logo (1).png"

const navigation = [
  { name: 'Dashboard', to: '/admin/', icon: House },
  { name: 'Users', to: '/admin/users', icon: Users },
  { name: 'Movies', to: '/admin/movies', icon: Video },
  { name: 'Admin Profile', to: '/admin/profile', icon: CircleUserRound },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/user/logout"); // Call backend to destroy session
      dispatch(clearAdmin()) // Clear redux state
      toast.success("Logged out successfully!");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <X aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-zinc-950 via-gray-900 to-black px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Honey popcorn"
                    src={logo}
                    className="h-10 w-auto"
                  />
                </div>

                <nav className="flex flex-1 flex-col">
                  {/* <ul role="list" className="flex flex-1 flex-col gap-y-7"> */}
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.to}
                              className={classNames(
                                location.pathname === item.to
                                ? 'bg-zinc-900 text-white'
                                : 'text-indigo-200 hover:bg-neutral-950 hover:text-white',
                               'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                  'size-5 shrink-0',
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
  
                  {/* </ul> */}
                  <div className="mt-8">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-x-3 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>

                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-44 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-zinc-950 via-gray-900 to-black px-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Honey popcorn"
                src={logo}
                className="h-11 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                  <Link
                    to={item.to}
                    className={classNames(
                      location.pathname === item.to
                        ? 'bg-zinc-900 text-white'
                        : 'text-indigo-200 hover:bg-neutral-950 hover:text-white',
                      'group flex gap-x-3 rounded p-2 text-sm font-semibold',
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                
                <div className="mt-8">
                <button
                onClick={handleLogout}
                className="w-full flex items-center gap-x-3 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                Logout
                </button>
                </div>

                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-indigo-700"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-indigo-700"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>

              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-zinc-900 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-indigo-200 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-8 rounded-full bg-indigo-700"
            />
          </a>
        </div>

        <main className="py-2">
          <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </>
  )
}
