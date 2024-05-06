// next
import Link from "next/link";
import { usePathname } from "next/navigation";
// lib
import { cn } from "@/lib/utils";
// components
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import { setCurrentPage } from "@/redux/slices/pagination-slice";

// ----------------------------------------------------------------------------

const categories = [
  {
    name: "Comics",
    href: "/comics",
  },
  {
    name: "Characters",
    href: "/characters",
  },
  {
    name: "Series",
    href: "/series",
  },
];
// ----------------------------------------------------------------------------

interface CategoriesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

// ----------------------------------------------------------------------------

export function MarvelCategoriesNav({
  className,
  ...props
}: CategoriesNavProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex items-center justify-center">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {categories.map((category, index) => (
            <Link
              href={category.href}
              key={category.href}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                pathname.includes(category.href)
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div onClick={() => dispatch(setCurrentPage(1))}>
                {category.name}
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
