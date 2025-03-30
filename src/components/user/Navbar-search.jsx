import { Funnel } from "lucide-react";

export default function NavSearch() {
  return (
    <div className="mt-1 ml-8">
      <div className="flex items-center rounded-sm bg-[#21242D] pl-3 outline-1 -outline-offset-1 outline-gray-900 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#F8B319]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="size-4 text-[#F8B319]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          id="price"
          name="price"
          type="text"
          placeholder="Search"
          className="block min-w-0 grow py-1 pr-0.5 pl-1 text-xs text-gray-200 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
          <select
            id="currency"
            name="currency"
            aria-label="Currency"
            className="col-start-1 row-start-1 w-full appearance-none rounded-sm py-1.5 pr-7 pl-3 text-xs text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#F8B319]"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>

          <Funnel
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>
    </div>
  );
}
