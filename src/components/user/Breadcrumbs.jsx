import { Link } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';

export const BreadcrumbsLink = () => {
    return (
    <nav aria-label="Breadcrumb">
      <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 mt-2 sm:mt-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <Link to="/" className="flex items-center space-x-1">
          <div>
            <ChevronLeft className="mr-2 bg-[#F8B319] rounded-xs" />
          </div>
            <span className="text-[#F8B319] text-lg font-semibold hover:text-gray-600 dark:hover:text-gray-200">Back Home</span>
          </Link>
        </li>
      </ol>
    </nav>
    );
  }
