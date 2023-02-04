import { configureStore } from '@reduxjs/toolkit'
import ConsumerReducer from "./auth/ConsumerReducer"
import DeviceReducer from "./auth/DeviceReducer"

const store = configureStore({
    reducer:{
        auth:ConsumerReducer,
        device:DeviceReducer,
        }
})

export default store;