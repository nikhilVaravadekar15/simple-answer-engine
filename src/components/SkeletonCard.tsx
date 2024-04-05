import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function SkeletonCard({}: Props) {
  return (
    <div className="w-full h-full p-4 flex items-center justify-center gap-4">
      <div className="w-full h-full flex gap-1 flex-col">
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8 w-full rounded-2xl" />
        <Skeleton className="h-8 w-[95%] rounded-2xl" />
        <Skeleton className="h-8 w-[90%] rounded-2xl" />
        <Skeleton className="h-8 w-[80%] rounded-2xl" />
        <Skeleton className="h-8 w-[50%] rounded-2xl" />
      </div>
    </div>
  );
}
