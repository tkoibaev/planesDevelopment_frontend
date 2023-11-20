import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: -1,
  user_email: "",
  is_authenticated: false,
  is_moderator: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.is_authenticated = action.payload.is_authenticated;
      state.is_moderator = action.payload.is_moderator;
      state.user_id = action.payload.user_id;
      state.user_email = action.payload.user_email;
    },
    cleanUser: (state) => {
      state.is_authenticated = false;
      state.is_moderator = false;
      state.user_id = -1;
      state.user_email = "";
    },
  },
});

export const { updateUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
