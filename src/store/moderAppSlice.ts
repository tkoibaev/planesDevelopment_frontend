import { createSlice } from "@reduxjs/toolkit"
// import Option from "../types";

const initialState = {
  input_value: "",
  dropdown_value: {
    id: 0,
    name: "Все статусы",
  },
}

const moderAppSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setAppInputValue(state, action) {
      state.input_value = action.payload
    },
    setAppDropdownValueId(state, action) {
      state.dropdown_value.id = action.payload
    },
    setAppDropdownValueName(state, action) {
      state.dropdown_value.name = action.payload
    },
  },
})

export const {
  setAppDropdownValueId,
  setAppDropdownValueName,
  setAppInputValue,
} = moderAppSlice.actions
export default moderAppSlice.reducer
