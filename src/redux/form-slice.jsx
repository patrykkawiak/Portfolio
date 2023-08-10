import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    replace(state,action) {
        state.messages = action.payload;
    },
    deleteMsg(state, action) {
      const itemID = action.payload;
      const item = state.messages.filter((item) => item.id !== itemID);
      state.messages = item;
    },
  },
});

export default formSlice;

export const formSliceActions = formSlice.actions;
