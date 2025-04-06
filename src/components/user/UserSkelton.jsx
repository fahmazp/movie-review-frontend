import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUser() {
  return (
    <div className="mx-auto max-w-7xl flex justify-start items-center mt-6 px-2 sm:mt-10 sm:px-8">

    <div className="flex sm:items-center space-x-4 flex-col sm:flex-row gap-2 sm:gap-0">
      <Skeleton className="h-24 w-24 rounded-full bg-gray-200 dark:bg-zinc-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-zinc-800" />
      </div>
    </div>
    </div>
  )
}
