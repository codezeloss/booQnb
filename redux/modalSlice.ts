"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onClickLoginOpen: (state) => {
      state.isLoginModalOpen = true;
    },
    onClickLoginClose: (state) => {
      state.isLoginModalOpen = false;
    },
    onClickRegisterOpen: (state) => {
      state.isRegisterModalOpen = true;
    },
    onClickRegisterClose: (state) => {
      state.isRegisterModalOpen = false;
    },
  },
});

export const {
  onClickLoginOpen,
  onClickLoginClose,
  onClickRegisterOpen,
  onClickRegisterClose,
} = modalSlice.actions;

export default modalSlice.reducer;
