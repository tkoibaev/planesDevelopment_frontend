import { configureStore } from "@reduxjs/toolkit";
import Option, { optionData } from "../types";
import userReducer from "./userSlice";
import filterReducer from "./filtersSlices";

export interface RootState {
  user: {
    user_id: BigInteger;
    user_email: string;
    is_authenticated: boolean;
    is_moderator: boolean;
    current_cart: number;
  };
  filter: {
    price_range: number[];
    input_value: string;
    dropdown_value: Option;
    options: optionData[];
  };
}

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
  },
});

export default store;

// Экспортируйте тип RootState
// export type RootState = ReturnType<typeof store.getState>;
