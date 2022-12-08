import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "../../components/TableUsers/dataDummy";

const initialState = {
  data: data,
  errorMessage: "",
};

export const dummyDataManajemenAkunSlice = createSlice({
  name: "dummyDataManajemenAkun",
  initialState,
  reducers: {
    changeStatusVerifikasi: (state, action) => {
      const idSearch = Number(action.payload);
      state.data.find((item) => item.id === idSearch).status_verifikasi =
        "SUDAH";
    },
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
    changeStatusTTD: (state, action) => {
      const id = Number(action.payload);
      console.log(id);
      if (
        state.data.find((item) => item.id === id).status_verifikasi === "SUDAH"
      ) {
        state.data.find((item) => item.id === id).status_ttd = "SUDAH";
      } else {
        state.errorMessage = "Berkas Belum di Verifikasi";
      }
    },
    resetError: (state) => {
      state.errorMessage = "";
    },
  },
});

export const {
  changeStatusVerifikasi,
  changeStatusKirim,
  changeStatusTTD,
  resetError,
} = dummyDataManajemenAkunSlice.actions;
export default dummyDataManajemenAkunSlice.reducer;
