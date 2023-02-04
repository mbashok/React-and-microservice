import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as DeviceService from "../Service";
import Axios from "axios";
const API = Axios.create({baseURL:"http://localhost:4001"});

export const CreateDevice = createAsyncThunk(
  "auth/createdevice",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await DeviceService.createDevice(values);
      navigate("/devices");
      return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
  }
);
export const GetDevices = createAsyncThunk(
    "auth/getdevices",
    async () => {
        // const response = await ConsumerService.getConsumers();
          // const response = await Axios.get("http://localhost:4000/consumers");
          const response = await API.get("/devices");
          console.log("hello",response.data)
        return response.data;
    }
  );

  export const GetDeviceById = createAsyncThunk(
      "auth/getdevicebyid",
      async (id, { rejectWithValue }) => {
        try {
          const response = await DeviceService.getDevicebyid(id);
          // const response = await API.get(`/device/${id}`);
          console.log("data",response)
          return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
      }
    );
  
    export const UpdateDevice = createAsyncThunk(
      "auth/updatedevice",
      async ({ id, newdata, navigate  },{rejectWithValue}) => {
        try {
          const response = await DeviceService.updateDevice(newdata,id);
          navigate("/Devices");
          return response.data;
        } catch (err) {
          return rejectWithValue(err.response.data);
        }
      }
    );
    export const DeleteDevice = createAsyncThunk(
      "auth/deletedevice",
      async ({ id },{rejectWithValue}) => {
        try {
          const response = await DeviceService.deleteDevice(id);
          return response.data;
          // navigate("/user");
        } catch (err) {
          return rejectWithValue(err.response.data);
        }
      }
    );
  


const deviceSlice = createSlice({
  name: "device",
  initialState: {   
    devicesall: {},
    devices:[],
    devicesid: [],
    consumerdevices: [],
    loading: false
    },
  extraReducers: {
      [GetDevices.pending]: (state) => {
        state.loading = true;
      },
      [GetDevices.fulfilled]: (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      },
      [GetDevices.rejected]: (state, action) => {
        state.loading = false;
      },
      [GetDeviceById.pending]: (state, action) => {
        state.loading = true;
      },
      [GetDeviceById.fulfilled]: (state, action) => {
        state.loading = false;
        state.devicesid = action.payload;
      },
      [GetDeviceById.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});


export default deviceSlice.reducer;