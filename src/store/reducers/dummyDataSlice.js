import { createSlice } from "@reduxjs/toolkit";
import data from "../../components/Table/dataDummy";

const initialState = {
  data: data,
};

export const dummyDataSlice = createSlice({
  name: "dummyData",
  initialState,
  reducers: {
    fetchData: (state) => {},
  },
});

export const { fetchData } = dummyDataSlice.actions;
export default dummyDataSlice.reducer;
