import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "../../components/Table/dataDummy";
import axios from "axios";
import Cookies from "js-cookie";
import { apiPath } from "../../config/index";
const initialState = {
  data: [],
  errorMessage: "",
};
export const fetchNaskah = createAsyncThunk(
  "/dummyDataSlice/fetchNaskah",
  async () => {
    try {
      const token = Cookies.get("token");
      // console.log("token >>> ", token);
      const resp = await axios({
        method: "get",
        url: `${apiPath}/cms/laporan`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("respon laporan fetching >> ", resp);
      return resp.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeStatusVerifikasi = createAsyncThunk(
  "/dummyDataSlice/changeStatusVerifikasi",
  async (id) => {
    try {
      const token = Cookies.get("token");
      console.log("token >>> ", token);
      const res = await axios({
        method: "put",
        url: `${apiPath}/cms/laporan/ubah-status-verifikasi/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeStatusTTD = createAsyncThunk(
  "/dummyDataSlice/changeStatusTTD",
  async (id) => {
    try {
      const token = Cookies.get("token");
      console.log("token >>> ", token);
      const res = await axios({
        method: "put",
        url: `${apiPath}/cms/laporan/ubah-status-ttd/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const dummyDataSlice = createSlice({
  name: "dummyData",
  initialState,
  reducers: {
    // changeStatusVerifikasi: (state, action) => {
    //   const idSearch = Number(action.payload);
    //   state.data.find((item) => item.id === idSearch).status_verifikasi =
    //     "SUDAH";
    // },
    changeStatusKirim: (state, action) => {
      const idSearch = Number(action.payload);
      if (
        state.data.find((item) => item.id === idSearch).status_ttd === "SUDAH"
      ) {
        state.data.find((item) => item.id === idSearch).status_kirim = "SUDAH";
      } else {
        state.errorMessage = "Berkas Belum di Tandatangan";
      }
    },
    // changeStatusTTD: (state, action) => {
    //   const id = Number(action.payload);
    //   console.log(id);
    //   if (
    //     state.data.find((item) => item.id === id).status_verifikasi === "SUDAH"
    //   ) {
    //     state.data.find((item) => item.id === id).status_ttd = "SUDAH";
    //   } else {
    //     state.errorMessage = "Berkas Belum di Verifikasi";
    //   }
    // },
    resetError: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNaskah.fulfilled, (state, action) => {
        console.log("action payload >>> ", action.payload);
        state.data = action.payload;
      })
      .addCase(changeStatusVerifikasi.fulfilled, (state, action) => {
        console.log("action payload >>> ", action.payload);
      });
  },
});

export const { changeStatusKirim, resetError } = dummyDataSlice.actions;
export default dummyDataSlice.reducer;
