"use client";
import React, { useEffect } from "react";
//components
import MarvelDetailCard, {
  MarvelDetailCardItem,
} from "@/components/marvel/marvel-detail-card";
import MarvelDetailControler from "@/components/marvel/marvel-detail-controller";
import { MarvelSkeletonDetailCard } from "@/components/marvel/marvel-skeleton-detail";
import { useToast } from "@/components/ui/use-toast";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import { getSingleCharacter } from "@/redux/slices/thunk-api";
// next
import { useParams } from "next/navigation";

// ----------------------------------------------------------------------------

const CharactersDetailView = () => {
  const { singleCharacter, singleCharacterLoading } = useAppSelector(
    (state) => state.singleCharacter
  );
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;

  const { toast } = useToast();

  const handleDispatch = () => {
    dispatch(getSingleCharacter(id))
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
    singleCharacter?.thumbnail.path +
    "." +
    singleCharacter?.thumbnail.extension;

  const content = (
    <>
      {singleCharacter?.events?.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Events:"
            textGroup={singleCharacter?.events.items}
          />
        </div>
      )}
      {singleCharacter?.comics?.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Comics:"
            textGroup={singleCharacter?.comics.items}
          />
        </div>
      )}

      {singleCharacter?.series?.items.length !== 0 && (
        <div className="mb-6">
          <MarvelDetailCardItem
            label="Series:"
            textGroup={singleCharacter?.series.items}
          />
        </div>
      )}
    </>
  );
  return (
    <div className="px-24 py-12 xl:px-52 xl:py-4 ">
      <MarvelDetailControler title={singleCharacter?.name + " " + "Detail"} />
      {singleCharacterLoading ? (
        <MarvelSkeletonDetailCard />
      ) : (
        <MarvelDetailCard
          src={source}
          title={singleCharacter?.name}
          content={content}
        />
      )}
    </div>
  );
};

export default CharactersDetailView;
