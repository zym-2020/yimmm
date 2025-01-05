import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface IUserInfoStore {
  hasUserFlag: boolean;
  info: {
    name: string;
    account: string;
    role: number;
  };
}

const initialState: IUserInfoStore = {
  hasUserFlag: false,
  info: {
    name: "",
    account: "",
    role: 0,
  },
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (
      state,
      action: PayloadAction<{ name: string; account: string; role: number }>
    ) => {
      state.hasUserFlag = true;
      state.info = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { updateUserInfo } = userSlice.actions;
export const selectUserInfo = (state: RootState) => state.userInfo;
