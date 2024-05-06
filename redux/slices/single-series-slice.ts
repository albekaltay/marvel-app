// redux
import { createSlice } from "@reduxjs/toolkit";
// type
import { ISeries } from "@/types/series";
// thunk api
import { getSingleSeries } from "./thunk-api";

// ----------------------------------------------------------------------------

export interface InitialState {
  singleSeries: ISeries | null;
  singleSeriesLoading: boolean;
}

const initialState: InitialState = {
  singleSeries: null,
  singleSeriesLoading: true,
};

export const singleSeries = createSlice({
  name: "singleSeries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleSeries.pending, (state) => {
      state.singleSeriesLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(getSingleSeries.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.singleSeries = data.results[0];
      state.singleSeriesLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = singleSeries.actions;

export default singleSeries.reducer;
