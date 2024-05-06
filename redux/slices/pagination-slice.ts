//redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------------

const initialState = {
  currentPage: 1,
  selectedLimit: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedLimit: (state, action: PayloadAction<number>) => {
      state.selectedLimit = action.payload;
      state.currentPage = 1;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    previousPage: (state) => {
      state.currentPage = Math.max(state.currentPage - 1, 1);
    },
  },
});

// Export actions and reducer
export const { setCurrentPage, setSelectedLimit, nextPage, previousPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
