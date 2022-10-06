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
  messageEror: "",
};

const signupAPI = async ({ email, password, nip, nama, no_telp, role }) => {
  return new Promise((resolve, reject) => {
    try {
      if (!Cookies.get("list_akun")) {
        const data = [];
        Cookies.set("list_akun", data);
      }
      const data = JSON.parse(Cookies.get("list_akun"));
      const form = {
        email,
        password,
        nip,
        nama,
        no_telp,
        role,
      };

      data.push(form);
      Cookies.set("list_akun", data);
      resolve({
        data: form,
      });
    } catch (error) {
      reject({
        data: "There is an error",
      });
    }
  });
};

export const makeAccount = createAsyncThunk(
  "signup/makeAccount",
  async ({ email, password, nip, nama, no_telp, role }) => {
    try {
      const data = await signupAPI(email, password, nip, nama, no_telp, role);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(makeAccount.pending, (state) => {});
  },
});

export default signupSlice.reducer;
