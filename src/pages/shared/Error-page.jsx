import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
        const navigate = useNavigate();

    return (
      <>
        <main className="grid min-h-full place-items-center bg-[#f5f5f5] dark:bg-[#020617] px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-xl font-semibold text-yellow-600">404</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-300 sm:text-6xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button  onClick={() => navigate('/')}
                className="rounded-sm bg-yellow-600 px-3.5 text-sm cursor-pointer font-semibold text-white shadow-xs hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Go back home</Button>
              <Button variant="outline" className="text-sm font-semibold text-gray-900 dark:text-gray-200">Contact support</Button>
            </div>
          </div>
        </main>
      </>
    )
  }
  