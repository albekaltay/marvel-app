"use client";
import React, { useEffect } from "react";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import { getCommics } from "@/redux/slices/thunk-api";
// components
import { SkeletonCard } from "@/components/marvel/marvel-skeleton-card";
import MarvelPagination from "@/components/marvel/marvel-pagination";
import MarvelContainer from "@/components/marvel/marvel-container";
import MarvelCard from "@/components/marvel/marvel-card";
import { useToast } from "@/components/ui/use-toast";
// types
import { IComic } from "@/types/comics";
import { Error } from "@/types/types";

// ----------------------------------------------------------------------------

const ComicsView = () => {
  const { comics, comicsLoading, totalComics } = useAppSelector(
    (state) => state.comics
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { selectedLimit, currentPage } = useAppSelector(
    (state) => state.pagination
  );

  const handleDispatch = () => {
    dispatch(
      getCommics({
        limit: selectedLimit,
        offset: currentPage * selectedLimit - selectedLimit,
      })
    )
      .unwrap()
      .catch((error: Error) => {
        toast({
          variant: "destructive",
          title: error.message,
        });
      });
  };

  useEffect(() => {
    handleDispatch();
  }, [currentPage, selectedLimit]);

  return (
    <MarvelContainer>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-5 xl:gap-x-8 mb-8">
        {comicsLoading
          ? Array.from({ length: 20 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : comics?.map((item: IComic) => (
              <MarvelCard
                key={item.id}
                type="comics"
                href={`/comics/${item.id}`}
                src={item.thumbnail.path + "." + item.thumbnail.extension}
                title={item?.title}
                creators={item.creators}
              />
            ))}
      </div>
      <MarvelPagination totalMovies={totalComics} />
    </MarvelContainer>
  );
};

export default ComicsView;
