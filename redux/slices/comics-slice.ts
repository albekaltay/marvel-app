// redux
import { createSlice } from "@reduxjs/toolkit";
// type
import { IComic } from "@/types/comics";
// thunk api
import { getCommics } from "./thunk-api";

// ----------------------------------------------------------------------------

export interface InitialState {
  comics: IComic[];
  comicsLoading: boolean;
  totalComics: number;
}

const initialState: InitialState = {
  comics: [],
  comicsLoading: true,
  totalComics: 0,
};

export const comicsSlice = createSlice({
  name: "comics",
  initialState,
  reducers: {
    // onUpdateAccount(state, action) {
    //   const { body } = action.payload;
    //   const updatedData: IComics[] = state.accounts!.map(
    //     (account: IComics) => {
    //       if (account.id == body.id) {
    //         return {
    //           ...account,
    //           ...body,
    //         };
    //       } else {
    //         return account;
    //       }
    //     }
    //   );
    //   state.accounts = updatedData;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommics.pending, (state) => {
      state.comicsLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(getCommics.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.comics = data.results || [];
      state.comicsLoading = false;
      state.totalComics = data.total || 0;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = comicsSlice.actions;

export default comicsSlice.reducer;
