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
        const response = await DeviceService.getDevices();
          // const response = await Axios.get("http://localhost:4000/consumers");
          // const response = await API.get("/devices");
          console.log("device",response.data)
        return response.data;
    }
  );
  export const GetDeviceCount = createAsyncThunk(
    "auth/getcount",
    async () => {
        const response = await DeviceService.getCount();
          console.log("hello",response.data)
          console.log("hello1",response.data.device)
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
      async ({ id, values, navigate  },{rejectWithValue}) => {
        try {
          const response = await DeviceService.updateDevice(values,id);
          navigate("/devices");

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
    export const DateSort1 = createAsyncThunk(
      "devicedata/datetime/date",
      async ({ id, dateValue },{rejectWithValue}) => {
        try {
          const response = await DeviceService.deleteDevice(id,dateValue);
          console.log("response",response.data)
          return response.data;
        } catch (err) {
        return rejectWithValue(err.response.data)
        }
      }
    );
    export const DateSort = createAsyncThunk(
      "devicedata/datetime",
      async ( id, {dateValue},{rejectWithValue}) => {
        try {
          console.log("rrgbs",dateValue)
          console.log("rrgbs",id)
          const response = await DeviceService.datesort(id,{dateValue});
          console.log("response",response.data)
          return response.data;
        } catch (err) {
        return rejectWithValue(err.response.data)
        }
      }
    );

const deviceSlice = createSlice({
  name: "device",
  initialState: {   
    devicesall: {},
    devices:[],
    devicesid: [],
    activedevices:[],
    inactivedevices:[],
    count:[],
    datesort: [],
    consumerdevices: [],
    loading: false
    },
  extraReducers: {
      [GetDevices.pending]: (state) => {
        state.loading = true;
      },
      [GetDevices.fulfilled]: (state, action) => {
        state.loading = false;
        state.devices = action.payload.device;
        state.activedevices = action.payload.activedevice;
        state.inactivedevices = action.payload.inactivedevice;
      },
      [GetDevices.rejected]: (state, action) => {
        state.loading = false;
      },
      [GetDeviceCount.pending]: (state) => {
        state.loading = true;
      },
      [GetDeviceCount.fulfilled]: (state, action) => {
        state.loading = false;
        state.count = action.payload;
      },
      [GetDeviceCount.rejected]: (state, action) => {
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
      [DateSort.pending]: (state, action) => {
        state.loading = true;
      },
      [DateSort.fulfilled]: (state, action) => {
        state.loading = false;
        state.datesort = action.payload;
      },
      [DateSort.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});


export default deviceSlice.reducer;