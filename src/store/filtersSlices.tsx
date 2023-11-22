import { createSlice } from "@reduxjs/toolkit";
import Option from "../types";

const initialState = {
  price_range: [0, 10000],
  input_value: "",
  dropdown_value: {
    id: 0,
    name: "Любая категория",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setInputValue(state, action) {
      state.input_value = action.payload;
    },
    setDropdownValueId(state, action) {
      state.dropdown_value.id = action.payload;
    },
    setDropdownValueName(state, action) {
      state.dropdown_value.name = action.payload;
    },
    setSliderValue(state, action) {
      state.price_range = action.payload;
    },
  },
});

export const {
  setSliderValue,
  setDropdownValueId,
  setDropdownValueName,
  setInputValue,
} = filterSlice.actions;
export default filterSlice.reducer;
