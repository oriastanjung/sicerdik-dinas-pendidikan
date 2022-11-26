import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { apiPath } from "../../config";
import CryptoJS from "crypto-js";
import axios from "axios";
import { key } from "../../config";
// const key = "secretanykey27123";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  form: {
    email: "",
    password: "",
    role: "",
    // role: "Staff",
    nip: "",
    keyphrase: "abcde123",
  },
};

const loginAPI = async ({ email, password }) => {
  try {
    const data = await axios.post(`${apiPath}/cms/auth/signin`, {
      email,
      password,
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fakeLogin = createAsyncThunk(
  "login/fakeLogin",
  async (email, password) => {
    try {
      const data = await loginAPI(email, password);
      // console.log(data);

      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "login/loginAdmin",
  async (email, password) => {
    try {
      const data = await loginAPI(email, password);
      // console.log(data);

      return data.data;
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
        console.log(action, "pending");
        state.isSuccess = initialState.isSuccess;
      })
      .addCase(fakeLogin.fulfilled, (state, action) => {
        const { token, email, role } = action.payload.data;
        if (role === "superadmin") {
          state.errorMessage = "Email atau Password Salah";
        } else {
          Cookies.set("token", token, {
            expires: 1 / 24 / 4,
          });
          state.isLoading = initialState.isLoading;
          state.isSuccess = true;
          // console.log("payload >>>", action.payload);
          state.form.email = email;
          state.form.role = role;
          console.log("role dri login >>> ", role);
          let cipherRole = CryptoJS.AES.encrypt(
            JSON.stringify(role),
            key
          ).toString();
          localStorage.setItem("jabatan", cipherRole);
          // state.form.keyphrase = keyphrase;
          state.errorMessage = initialState.errorMessage;
        }
      })
      .addCase(fakeLogin.rejected, (state, action) => {
        state.isLoading = initialState.isLoading;
        state.errorMessage = "Email atau Password Salah";
        console.log(action);

        state.isSuccess = initialState.isSuccess;
      })
      .addCase(loginAdmin.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = initialState.errorMessage;
        console.log(action, "pending");
        state.isSuccess = initialState.isSuccess;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const { token, email, role } = action.payload.data;

        state.isLoading = initialState.isLoading;
        state.isSuccess = true;
        // console.log("payload >>>", action.payload);
        state.form.email = email;
        state.form.role = role;
        if (role === "superadmin") {
          Cookies.set("token", token, {
            expires: 1 / 24 / 4,
          });
          console.log("role dri login >>> ", role);
          let cipherRole = CryptoJS.AES.encrypt(
            JSON.stringify(role),
            key
          ).toString();
          localStorage.setItem("jabatan", cipherRole);
          // state.form.keyphrase = keyphrase;
          state.errorMessage = initialState.errorMessage;
        } else {
          state.errorMessage = "Email atau Password Salah";
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = initialState.isLoading;
        state.errorMessage = "Email atau Password Salah";
        console.log(action);

        state.isSuccess = initialState.isSuccess;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
