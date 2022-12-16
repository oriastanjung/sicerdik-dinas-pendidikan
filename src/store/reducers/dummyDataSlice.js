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
      // console.log("respon laporan fetching >> ", resp);
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
      // console.log("token >>> ", token);
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

export const changeStatusKirim = createAsyncThunk(
  "/dummyDataSlice/changeStatusKirim",
  async (id) => {
    try {
      const token = Cookies.get("token");
      // console.log("token >>> ", token);
      const res = await axios({
        method: "put",
        url: `${apiPath}/cms/laporan/ubah-status-kirim/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("res >> ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateNaskahVerifikasi = createAsyncThunk(
  "/dummyDataSlice/updateNaskahVerifikasi",
  async (payload) => {
    try {
      const token = Cookies.get("token");
      // console.log("payload >> ", payload)
      // console.log("token >> ", token)
      const res = await axios({
        method: "put",
        url: `${apiPath}/cms/laporan/update-data-verifikasi/${payload.id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: payload,
      });
      console.log("res >> ", res);
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
      console.log("res >> ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendFileDisdik = createAsyncThunk(
  "/dummyDataSlice/sendFileDisdik",
  async (payload) => {
    let filename = payload.data

    console.log("payload send file disdik >> ", payload)
    console.log("filename send file disdik >> ", filename)
    const token = Cookies.get("token")
    let formData = new FormData();
    formData.append('surat_disdik', filename)

    const res = await axios.put(`${apiPath}/cms/laporan/kirim-laporan/${payload.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      },
    })

    console.log("res >> ", res);
    return res
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
    // changeStatusKirim: (state, action) => {
    //   const idSearch = Number(action.payload);
    //   if (
    //     state.data.find((item) => item.id === idSearch).status_ttd === "SUDAH"
    //   ) {
    //     state.data.find((item) => item.id === idSearch).status_kirim = "SUDAH";
    //   } else {
    //     state.errorMessage = "Berkas Belum di Tandatangan";
    //   }
    // },
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
        // console.log("action payload >>> ", action.payload);
        state.data = action.payload;
      })
      .addCase(changeStatusVerifikasi.fulfilled, (state, action) => {
        // console.log("action payload >>> ", action.payload);
      })
      .addCase(changeStatusTTD.fulfilled, (state, action) => {
        // console.log("action payload >>> ", action.payload);
      })

      .addCase(changeStatusKirim.fulfilled, (state, action) => {
        // console.log("action payload >>> ", action.payload);
      })
      .addCase(updateNaskahVerifikasi.fulfilled, (state, action) => {
        // console.log("action payload >>> ", action.payload);
      });
  },
});

export const { resetError } = dummyDataSlice.actions;
export default dummyDataSlice.reducer;
