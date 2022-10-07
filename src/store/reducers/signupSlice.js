import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  form: {
    email: "",
    password: "",
    nip: "",
    nama: "",
    no_telp: "",
    role: "",
  },
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const signupAPI = async ({ email, password, nip, nama, no_telp, role }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password && nip && nama && no_telp && role) {
        const form = {
          email,
          password,
          nip,
          nama,
          no_telp,
          role,
        };
        resolve({
          data: form,
          token: "abcdefghijikalda",
        });
      } else {
        reject({
          error: "nise",
        });
      }
    }, 2000);
  });
};

export const makeAccount = createAsyncThunk(
  "signup/makeAccount",
  async (email, password, nip, nama, no_telp, role) => {
    try {
      const data = await signupAPI(email, password, nip, nama, no_telp, role);
      // console.log(email, pas);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    clearAllState: (state) => {
      state.isLoading = initialState.isLoading;
      state.isSuccess = initialState.isSuccess;
      state.errorMessage = initialState.errorMessage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(makeAccount.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.isSuccess = initialState.isSuccess;
      })
      .addCase(makeAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.form = action.payload;
      })
      .addCase(makeAccount.rejected, (state) => {
        state.isLoading = initialState.isLoading;
        state.errorMessage = "Mohon isi dengan benar semua data";

        state.isSuccess = initialState.isSuccess;
      });
  },
});
export const { clearAllState } = signupSlice.actions;
export default signupSlice.reducer;
