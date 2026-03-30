import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div>
      <div
        data-slot="skeleton"
        className={cn("animate-pulse rounded-md bg-accent", className)}
        {...props}
      />
    </div>
   
  );
}

export { Skeleton }
