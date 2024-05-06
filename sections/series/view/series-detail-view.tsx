"use client";
import React, { useEffect } from "react";
// components
import MarvelDetailCard, {
  MarvelDetailCardItem,
} from "@/components/marvel/marvel-detail-card";
import { MarvelSkeletonDetailCard } from "@/components/marvel/marvel-skeleton-detail";
import { useToast } from "@/components/ui/use-toast";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import { getSingleSeries } from "@/redux/slices/thunk-api";
// next
import { useParams } from "next/navigation";

// ----------------------------------------------------------------------------

const SeriesDetailView = () => {
  const { singleSeries, singleSeriesLoading }: any = useAppSelector(
    (state) => state.singleSeries
  );
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;

  const { toast } = useToast();

  const handleDispatch = () => {
    dispatch(getSingleSeries(id))
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
  }, []);
  const source =
    singleSeries?.thumbnail.path + "." + singleSeries?.thumbnail.extension;

  const content = (
    <>
      {singleSeries?.startYear && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Start Year:"
            text={singleSeries?.startYear}
          />
        </div>
      )}
      {singleSeries?.format && (
        <div className="mb-6">
          <MarvelDetailCardItem label="Format:" text={singleSeries?.format} />
        </div>
      )}

      {singleSeries?.creators?.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Creators:"
            textGroup={singleSeries?.creators.items}
          />
        </div>
      )}

      {singleSeries?.characters.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Characters:"
            textGroup={singleSeries?.characters.items}
          />
        </div>
      )}
    </>
  );
  return (
    <div className="px-24 py-12 xl:px-52 xl:py-28 ">
      {singleSeriesLoading ? (
        <MarvelSkeletonDetailCard />
      ) : (
        <MarvelDetailCard
          src={source}
          title={singleSeries?.title}
          content={content}
        />
      )}
    </div>
  );
};

export default SeriesDetailView;

const SeriesDetailContent = () => {
  return;
};
