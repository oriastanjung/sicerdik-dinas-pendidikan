import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  form: {
    email: "",
    password: "",
  },
};

const loginAPI = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password == "123") {
        resolve({
          responseCode: 200,
          data: {
            token: "abcdesfasad",
            email: "admin@gmail.com",
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
      .addCase(fakeLogin.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = initialState.errorMessage;
        console.log(action);
        state.isSuccess = initialState.isSuccess;
      })
      .addCase(fakeLogin.fulfilled, (state, action) => {
        state.isLoading = initialState.isLoading;
        state.isSuccess = true;
        console.log(action);
        state.form.email = action.payload.data.email;
        console.log("state form email => ", state.form.email);
        state.errorMessage = initialState.errorMessage;
      })
      .addCase(fakeLogin.rejected, (state, action) => {
        state.isLoading = initialState.isLoading;
        state.errorMessage = "Email atau Password Salah";
        console.log(action);

        state.isSuccess = initialState.isSuccess;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
