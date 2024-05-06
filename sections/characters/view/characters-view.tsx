"use client";
import React, { useEffect } from "react";
// redux
import { useAppDispatch } from "@/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import { getCharacters } from "@/redux/slices/thunk-api";
// components
import { SkeletonCard } from "@/components/marvel/marvel-skeleton-card";
import MarvelPagination from "@/components/marvel/marvel-pagination";
import MarvelContainer from "@/components/marvel/marvel-container";
import MarvelCard from "@/components/marvel/marvel-card";
import { useToast } from "@/components/ui/use-toast";
// types
import { ICharacters } from "@/types/characters";

// ----------------------------------------------------------------------------

const CharactersView = () => {
  const { characters, charactersLoading, totalCharacters } = useAppSelector(
    (state) => state.characters
  );
  const dispatch = useAppDispatch();

  const { selectedLimit, currentPage } = useAppSelector(
    (state) => state.pagination
  );

  const { toast } = useToast();

  const handleDispatch = () => {
    dispatch(
      getCharacters({
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
        {charactersLoading
          ? Array.from({ length: 20 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : characters?.map((item: ICharacters) => (
              <MarvelCard
                key={item.id}
                type="characters"
                href={`/characters/${item.id}`}
                src={item.thumbnail.path + "." + item.thumbnail.extension}
                title={item.name}
              />
            ))}
      </div>
      <MarvelPagination totalMovies={totalCharacters} />
    </MarvelContainer>
  );
};

export default CharactersView;
