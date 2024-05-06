"use client";
import React, { useEffect } from "react";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import { getSeries } from "@/redux/slices/thunk-api";
// components
import { SkeletonCard } from "@/components/marvel/marvel-skeleton-card";
import MarvelPagination from "@/components/marvel/marvel-pagination";
import MarvelContainer from "@/components/marvel/marvel-container";
import MarvelCard from "@/components/marvel/marvel-card";
import { useToast } from "@/components/ui/use-toast";
// types
import { ISeries } from "@/types/series";

// ----------------------------------------------------------------------------

const SeriesView = () => {
  const { series, seriesLoading, totalSeries } = useAppSelector(
    (state) => state.series
  );

  const { selectedLimit, currentPage } = useAppSelector(
    (state) => state.pagination
  );
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const handleDispatch = () => {
    dispatch(
      getSeries({
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
        {seriesLoading
          ? Array.from({ length: 20 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : series?.map((item: ISeries) => (
              <MarvelCard
                key={item.id}
                type="series"
                href={`/series/${item.id}`}
                src={item.thumbnail.path + "." + item.thumbnail.extension}
                title={item.title}
                creators={item.creators}
                startYear={item?.startYear}
              />
            ))}
      </div>
      <MarvelPagination totalMovies={totalSeries} />
    </MarvelContainer>
  );
};

export default SeriesView;
