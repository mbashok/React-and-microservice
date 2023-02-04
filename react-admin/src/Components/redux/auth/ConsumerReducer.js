import { createContext, useEffect, useReducer } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ConsumerService from "../Service";
// import Axios from "axios";
// const API = Axios.create({baseURL:"http://localhost:4000"});
// const initialState = {
//   isError: false,
//   isSuccess: false,
//   message: '',
  
// }
// const INITIAL_STATE = {
//   loginconsumer: JSON.parse(localStorage.getItem("token")) || null,
//   loading: false,
//   isError: false,
//   isSuccess: false,
// };
// export const AuthContext = createContext(INITIAL_STATE);

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue },{rejectWithValue}) => {
    try {
      const response = await ConsumerService.signIn(formValue);
      console.log(response.data)
      return response.data;
    } catch (error) {
      // const message =
      // (error.response && error.response.data && error.response.data.message) ||
      // error.message ||
      // error.toString()
      const message = error.response.data.message
      console.log("error",error.response.data.message)
    return rejectWithValue(message)
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
        const response = await ConsumerService.getConsumers();
          // const response = await Axios.get("http://localhost:4000/consumers");
          // const response = await API.get("/consumers");
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
      reset: (state) => {
        state.isSuccess = false
        state.isError = false
        // state.message = null
      },
      setConsumer: (state, action) => {
        state.loginconsumer = action.payload;
      },
      Logout: (state, action) => {
        localStorage.clear();
        // localStorage.removeItem("token")
        state.loginconsumer = null;
      },
    },
  extraReducers: {
    [login.pending]: (state, action) => {
        state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        state.isSuccess = true
        localStorage.setItem("token", JSON.stringify({ ...action.payload }));
        state.loginconsumer = action.payload;
      },
      [login.rejected]: (state,action) => {
        state.loading = false;
        state.isError = true
        state.message = action.payload
        state.loginconsumer = null
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
// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("token", JSON.stringify(state.loginconsumer));
//   }, [state.loginconsumer]);

//   return (
//     <AuthContext.Provider
//       value={{
//         loginconsumer: state.loginconsumer,
//         loading: state.loading,
//         isError: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const { setUser,setLogout } = authSlice.actions;
export const { reset,setConsumer,Logout  } = authSlice.actions
export default authSlice.reducer;