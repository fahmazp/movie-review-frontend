import { Skeleton } from "@/components/ui/skeleton"

export const MoviecardSkeltons = ({ count = 8 }) => {
  return (
    <div className="max-w-7xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-5 px-4">
      {Array(count).fill(null).map((_, index) => (
        <div key={index} className="w-full max-w-xs rounded-md border dark:border-zinc-800 border-zinc-300 p-4">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-full rounded-xl bg-gray-200 dark:bg-zinc-900"/>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100%] bg-gray-200 dark:bg-zinc-900" />
              <Skeleton className="h-4 w-[50%] bg-gray-200 dark:bg-zinc-900" />
              <Skeleton className="h-4 w-[50%] bg-gray-200 dark:bg-zinc-900" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
