import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
  
export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className="relative isolate min-h-screen">
        <img
          alt=""
          src="/images/Hexagon-bg.svg"
          className="absolute inset-0 -z-10 w-full h-full object-cover object-center"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-2xl md:text-5xl font-bold text-white tracking-wider" id="logo-name">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-balance text-zinc-300 sm:text-6xl" id="logo-name">
            Page not found
          </h1>
          <p className="mt-6 text-sm font-medium text-pretty text-zinc-300 sm:text-lg/8" id="logo-name">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex justify-center">
            <Button  onClick={() => navigate('/')}
            className="rounded-sm bg-yellow-600 px-3.5 text-sm cursor-pointer font-semibold text-white shadow-xs hover:bg-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Go back home
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
