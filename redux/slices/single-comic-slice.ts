// redux
import { createSlice } from "@reduxjs/toolkit";
// type
import { IComic } from "@/types/comics";
// thunk api
import { getSingleComic } from "./thunk-api";

// ----------------------------------------------------------------------------

export interface InitialState {
  singleComic: IComic | null;
  singleComicLoading: boolean;
}

const initialState: InitialState = {
  singleComic: null,
  singleComicLoading: true,
};

export const singleComic = createSlice({
  name: "singleComic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleComic.pending, (state) => {
      state.singleComicLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(getSingleComic.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.singleComic = data.results[0];
      state.singleComicLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = singleComic.actions;

export default singleComic.reducer;
