// redux
import { createSlice } from "@reduxjs/toolkit";
// type
import { ICharacters } from "@/types/characters";
// thunk api
import { getSingleCharacter } from "./thunk-api";

// ----------------------------------------------------------------------------

export interface InitialState {
  singleCharacter: ICharacters | null;
  singleCharacterLoading: boolean;
}

const initialState: InitialState = {
  singleCharacter: null,
  singleCharacterLoading: true,
};

export const singleCharacter = createSlice({
  name: "singleCharacter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleCharacter.pending, (state) => {
      state.singleCharacterLoading = true;
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    builder.addCase(getSingleCharacter.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.singleCharacter = data.results[0];
      state.singleCharacterLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = singleCharacter.actions;

export default singleCharacter.reducer;
