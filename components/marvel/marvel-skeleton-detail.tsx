// components
import { Skeleton } from "@/components/ui/skeleton";

// ----------------------------------------------------------------------------

export function MarvelSkeletonDetailCard() {
  return (
    <div className="flex flex-col space-y-3  xl:flex-row xl:space-x-4 justify-center items-center xl:items-start xl:justify-normal">
      <Skeleton className="h-[246px] w-[180px] xl:h-[333px] xl:w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px] xl:w-[200px]" />
        <Skeleton className="h-4 w-[100px] xl:w-[150px]" />
      </div>
    </div>
  );
}
