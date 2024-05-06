// redux
import { createSlice } from "@reduxjs/toolkit";
// type
import { ICharacters } from "@/types/characters";
// thunk api
import { getCharacters } from "./thunk-api";

// ----------------------------------------------------------------------------

export interface InitialState {
  characters: ICharacters[];
  charactersLoading: boolean;
  totalCharacters: number;
}

const initialState: InitialState = {
  characters: [],
  charactersLoading: true,
  totalCharacters: 0,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => {
      state.charactersLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.characters = data.results || [];
      state.charactersLoading = false;
      state.totalCharacters = data.total || 0;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = charactersSlice.actions;

export default charactersSlice.reducer;
