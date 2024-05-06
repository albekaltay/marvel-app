// redux
import { createSlice } from "@reduxjs/toolkit";
// type
import { ISeries } from "@/types/series";
// thunk api
import { getSeries } from "./thunk-api";

// ----------------------------------------------------------------------------

export interface InitialState {
  series: ISeries[];
  seriesLoading: boolean;
  totalSeries: number;
}

const initialState: InitialState = {
  series: [],
  seriesLoading: true,
  totalSeries: 0,
};

export const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSeries.pending, (state) => {
      state.seriesLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(getSeries.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.series = data.results || [];
      state.seriesLoading = false;
      state.totalSeries = data.total || 0;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = seriesSlice.actions;

export default seriesSlice.reducer;
