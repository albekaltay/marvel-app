// redux
import { configureStore } from "@reduxjs/toolkit";
import comicsReducer from "./slices/comics-slice";
import singleComicReducer from "./slices/single-comic-slice";
import seriesReducer from "./slices/series-slice";
import charactersReducer from "./slices/characters-slice";
import singleCharacterReducer from "./slices/single-character-slice";
import singleSeriesReducer from "./slices/single-series-slice";
import paginationReducer from "./slices/pagination-slice";

// ----------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    // accounts
    comics: comicsReducer,
    singleComic: singleComicReducer,
    series: seriesReducer,
    singleSeries: singleSeriesReducer,
    characters: charactersReducer,
    singleCharacter: singleCharacterReducer,
    pagination: paginationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
