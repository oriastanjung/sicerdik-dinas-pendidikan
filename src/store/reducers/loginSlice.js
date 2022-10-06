import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const loginAPI = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password == "123") {
        resolve({
          responseCode: 200,
          data: {
            token: "abcdesfasad",
          },
        });
      } else {
        reject({
          responseCode: 400,
          data: "invalid user",
        });
      }
    }, 2000);
  });
};

export const fakeLogin = createAsyncThunk(
  "login/fakeLogin",
  async (email, password) => {
    try {
      const data = await loginAPI(email, password);

      Cookies.set("token", data.data.token);

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isSuccess = initialState.isSuccess;
      state.isLoading = initialState.isLoading;
      state.errorMessage = initialState.errorMessage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fakeLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = initialState.errorMessage;
        state.isSuccess = initialState.isSuccess;
      })
      .addCase(fakeLogin.fulfilled, (state) => {
        state.isLoading = initialState.isLoading;
        state.isSuccess = true;
        state.errorMessage = initialState.errorMessage;
      })
      .addCase(fakeLogin.rejected, (state) => {
        state.isLoading = initialState.isLoading;
        state.errorMessage = "Email atau Password Salah";

        state.isSuccess = initialState.isSuccess;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
