import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

export interface RootState {
  user: {
    user_id: BigInteger;
    user_email: string;
    is_authenticated: boolean;
    is_moderator: boolean;
  };
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

// Экспортируйте тип RootState
// export type RootState = ReturnType<typeof store.getState>;
