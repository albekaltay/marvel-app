// utils
import { IComic, IGenaralComicData } from "@/types/comics";
import axiosInstance, { ApiResponse } from "@/lib/axios";
// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGenaralSeriesData } from "@/types/series";
import { IGenaralCharactersData } from "@/types/characters";

// ----------------------------------------------------------------------

const apikey = "464e0cadab267382982b37c47767af26";
const hash = "97b352d4aefbd9bb0c14af2b97cfedff";

export const getCommics = createAsyncThunk(
  "comics",
  // if you type your function argument here
  async (params: { limit: number; offset: number }) => {
    const response = await axiosInstance.get<ApiResponse<IGenaralComicData>>(
      `/v1/public/comics?ts=1&apikey=${apikey}&hash=${hash}`,
      {
        params,
      }
    );
    return response.data; //Returned
  }
);

export const getSingleComic = createAsyncThunk(
  "singleComic",
  // if you type your function argument here
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<IGenaralComicData>>(
      `/v1/public/comics/${id}?ts=1&apikey=${apikey}&hash=${hash}`
    );
    return response.data; //Returned
  }
);

export const getSeries = createAsyncThunk(
  "series",
  // if you type your function argument here
  async (params: { limit: number; offset: number }) => {
    const response = await axiosInstance.get<ApiResponse<IGenaralSeriesData>>(
      `/v1/public/series?ts=1&apikey=${apikey}&hash=${hash}`,
      {
        params,
      }
    );
    return response.data; //Returned
  }
);

export const getSingleSeries = createAsyncThunk(
  "singleSeries",
  // if you type your function argument here
  async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<IGenaralSeriesData>>(
      `/v1/public/series/${id}?ts=1&apikey=${apikey}&hash=${hash}`
    );
    return response.data; //Returned
  }
);

export const getCharacters = createAsyncThunk(
  "characters",
  // if you type your function argument here
  async (params: { limit: number; offset: number }) => {
    const response = await axiosInstance.get<
      ApiResponse<IGenaralCharactersData>
    >(`/v1/public/characters?ts=1&apikey=${apikey}&hash=${hash}`, {
      params,
    });
    return response.data; //Returned
  }
);

export const getSingleCharacter = createAsyncThunk(
  "singleCharacter",
  // if you type your function argument here
  async (id: string) => {
    const response = await axiosInstance.get<
      ApiResponse<IGenaralCharactersData>
    >(`/v1/public/characters/${id}?ts=1&apikey=${apikey}&hash=${hash}`);
    return response.data; //Returned
  }
);
