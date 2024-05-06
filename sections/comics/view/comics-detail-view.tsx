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
import { getSingleComic } from "@/redux/slices/thunk-api";
// next
import { useParams } from "next/navigation";

// ----------------------------------------------------------------------------

const ComicsDetailView = () => {
  const { singleComic, singleComicLoading } = useAppSelector(
    (state) => state.singleComic
  );
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;

  const { toast } = useToast();

  const handleDispatch = () => {
    dispatch(getSingleComic(id))
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
    singleComic?.thumbnail.path + "." + singleComic?.thumbnail.extension;

  const content = (
    <>
      {singleComic?.format && (
        <div className="mb-6">
          <MarvelDetailCardItem label="Format:" text={singleComic?.format} />
        </div>
      )}

      {singleComic?.creators?.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Creators:"
            textGroup={singleComic?.creators.items}
          />
        </div>
      )}

      {singleComic?.characters.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Characters:"
            textGroup={singleComic?.characters.items}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="px-24 py-12 xl:px-52 xl:py-28 ">
      {singleComicLoading ? (
        <MarvelSkeletonDetailCard />
      ) : (
        <MarvelDetailCard
          src={source}
          title={singleComic?.title}
          content={content}
        />
      )}
    </div>
  );
};

export default ComicsDetailView;
