import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ConsumerService from "../Service";
import Axios from "axios";
const API = Axios.create({baseURL:"http://localhost:4000"});
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast },{rejectWithValue}) => {
    try {
      const response = await ConsumerService.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/user");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await ConsumerService.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
  }
);
export const GetConsumers = createAsyncThunk(
    "auth/getconsumers",
    async () => {
        // const response = await ConsumerService.getConsumers();
          // const response = await Axios.get("http://localhost:4000/consumers");
          const response = await API.get("/consumers");
          console.log("hello",response.data)
        return response.data;
    }
  );

  export const GetConsumerById = createAsyncThunk(
      "auth/getconsumerbyid",
      async (id, { rejectWithValue }) => {
        try {
          const response = await ConsumerService.getConsumerbyid(id);
          return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
      }
    );
  
    export const UpdateConsumer = createAsyncThunk(
      "auth/updateconsumer",
      async ({ id, newdata, navigate  },{rejectWithValue}) => {
        try {
          const response = await ConsumerService.updateConsumer(newdata,id);
          navigate("/user");
          return response.data;
        } catch (err) {
          return rejectWithValue(err.response.data);
        }
      }
    );
    export const DeleteConsumer = createAsyncThunk(
      "auth/deleteconsumer",
      async ({ id },{rejectWithValue}) => {
        try {
          const response = await ConsumerService.deleteConsumer(id);
          return response.data;
          // navigate("/user");
        } catch (err) {
          return rejectWithValue(err.response.data);
        }
      }
    );
  


const authSlice = createSlice({
  name: "auth",
  initialState: {   
    consumer: {},
    registerconsumer:null,
    loginconsumer: null,
    consumers: [],
    consumerid: [],
    loading: false
    },
    reducers: {
      setConsumer: (state, action) => {
        state.loginconsumer = action.payload;
      },
      setLogout: (state, action) => {
        localStorage.clear();
        state.loginconsumer = null;
      },
    },
  extraReducers: {
    [login.pending]: (state, action) => {
        state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("token", JSON.stringify({ ...action.payload }));
        state.loginconsumer = action.payload;
      },
      [login.rejected]: (state,action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [register.pending]: (state) => {
        state.loading = true;
      },
      [register.fulfilled]: (state, action) => {
        state.loading = false;
        state.registerconsumer = action.payload;
      },
      [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [GetConsumers.pending]: (state) => {
        state.loading = true;
      },
      [GetConsumers.fulfilled]: (state, action) => {
        state.loading = false;
        state.consumers = action.payload;
      },
      [GetConsumers.rejected]: (state, action) => {
        state.loading = false;
      },
      [GetConsumerById.pending]: (state, action) => {
        state.loading = true;
      },
      [GetConsumerById.fulfilled]: (state, action) => {
        state.loading = false;
        state.consumerid = action.payload;
      },
      [GetConsumerById.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

// export const { setUser,setLogout } = authSlice.actions;

export default authSlice.reducer;