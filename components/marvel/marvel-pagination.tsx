import React, { useState } from "react";
// components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
// lib
import { cn } from "@/lib/utils";
// iconify
import { Icon } from "@iconify/react";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import {
  nextPage,
  previousPage,
  setCurrentPage,
  setSelectedLimit,
} from "@/redux/slices/pagination-slice";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
// ----------------------------------------------------------------------------

interface MarverPaginationProps {
  totalMovies: number;
}

// ----------------------------------------------------------------------------

const MarvelPagination = ({ totalMovies }: MarverPaginationProps) => {
  const pageNumbers = [];

  const dispatch = useAppDispatch();
  const [isOpenPopOver, setIsOpenPopover] = useState<boolean>(false);

  const { selectedLimit, currentPage } = useAppSelector(
    (state) => state.pagination
  );
  let totalPages = Math.ceil(totalMovies / selectedLimit);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxVisiblePages = 6;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage;
    let endPage;

    if (currentPage <= halfMaxVisiblePages + 2) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - halfMaxVisiblePages - 1) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfMaxVisiblePages;
      endPage = startPage + maxVisiblePages - 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${
                currentPage === 1 && "hover:bg-grey-500 cursor-not-allowed"
              }`}
              href="#"
              onClick={() => dispatch(previousPage())}
            />
          </PaginationItem>

          {visiblePages[0] > 2 && (
            <PaginationItem className="hidden xl:block">
              <PaginationLink
                href="#"
                onClick={() => dispatch(setCurrentPage(1))}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {visiblePages[0] > 3 && (
            <PaginationItem className="hidden xl:block">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {visiblePages.map((pageNumber) => (
            <PaginationItem key={pageNumber} className="hidden xl:block">
              <PaginationLink
                href="#"
                onClick={() => dispatch(setCurrentPage(pageNumber))}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages - 2 && (
            <PaginationItem className="hidden xl:block">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <PaginationItem className="hidden xl:block">
              <PaginationLink
                href="#"
                onClick={() => dispatch(setCurrentPage(totalPages))}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                currentPage === totalPages ? null : dispatch(nextPage());
              }}
              className={`${
                currentPage === totalPages &&
                "hover:bg-grey-500 cursor-not-allowed"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex justify-center items-center">
        <span className="me-2">Items per page: </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              className="p-0 text-foreground hover:text-primary hover:no-underline"
              onClick={() => {
                setIsOpenPopover(true);
              }}
            >
              <div className="flex flex-row items-center gap-2" role="button">
                <span className="text-sm">{selectedLimit}</span>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  width="24"
                  height="24"
                />
              </div>
            </Button>
          </PopoverTrigger>
          {isOpenPopOver && (
            <PopoverContent className="w-18 p-2" align="start" side="bottom">
              <div role="listbox" className="grid grid-cols-1 gap-1">
                {[10, 20, 50, 100].map((value) => (
                  <div
                    key={value}
                    tabIndex={0}
                    role="option"
                    aria-selected="false"
                    className={cn(
                      "hover:bg-muted gap-2 px-3 py-2 rounded text-sm hover:cursor-pointer",
                      value === selectedLimit &&
                        "bg-primary/10 hover:bg-primary/10 text-primary"
                    )}
                    onClick={() => {
                      dispatch(setSelectedLimit(value));
                      setIsOpenPopover(false);
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default MarvelPagination;
