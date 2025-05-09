import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react'

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function Pagination() {
  return (
    <div className="mx-auto max-w-7xl flex items-center justify-between  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded border border-gray-500 dark:border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded border border-gray-500 dark:border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> of{' '}
            <span className="font-medium">8</span> pages
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftCircleIcon aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-[#F8B319] dark:bg-[#f5c5189c] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold   ring-1 ring-gray-300 ring-inset    focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold   ring-1 ring-gray-300 ring-inset    focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold   ring-1 ring-gray-300 ring-inset    focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset    focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightCircleIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
