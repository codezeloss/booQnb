"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isRentModalOpen: boolean;
  isSearchModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isRentModalOpen: false,
  isSearchModalOpen: false,
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
    onClickRentModalOpen: (state) => {
      state.isRentModalOpen = true;
    },
    onClickRentModalClose: (state) => {
      state.isRentModalOpen = false;
    },
    onClickSearchModalOpen: (state) => {
      state.isSearchModalOpen = true;
    },
    onClickSearchModalClose: (state) => {
      state.isSearchModalOpen = false;
    },
  },
});

export const {
  onClickLoginOpen,
  onClickLoginClose,
  onClickRegisterOpen,
  onClickRegisterClose,
  onClickRentModalOpen,
  onClickRentModalClose,
  onClickSearchModalOpen,
  onClickSearchModalClose,
} = modalSlice.actions;

export default modalSlice.reducer;
