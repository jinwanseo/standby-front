import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface BaseStateType {
  token: string | "";
}

// Define the initial state using that type
const initialState: BaseStateType = {
  token: sessionStorage?.getItem("token") || "",
};

interface BaseStateInputType {
  key: string;
  value: string;
}

export const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setBaseState: (state, action: PayloadAction<BaseStateInputType>) => {
      sessionStorage.setItem(action.payload.key, action.payload.value);
      state = { ...state, [action.payload.key]: action.payload.value };
    },
    setGlobalToken: (state, action: PayloadAction<string>) => {
      sessionStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
  },
});

export const { setBaseState, setGlobalToken } = baseSlice.actions;

export default baseSlice.reducer;
