import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  form: {
    email: "",
    password: "",
    role: "Ketua Sub Bagian",
    // role: "Staff",
    nip: "2001020039",
    keyphrase: "abcde123",
  },
};

const loginAPI = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "123") {
        resolve({
          responseCode: 200,
          data: {
            token: "abcdesfasad",
            email: "admin@gmail.com",
            role: "Ketua Sub Bagian",
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

      Cookies.set("token", data.data.token, { expires: 1 / 24 / 4 });

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
        state.form.role = action.payload.data.role;
        console.log("state form email => ", state.form.email);
        console.log("state form role => ", state.form.role);
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
