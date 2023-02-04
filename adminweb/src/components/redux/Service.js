import Axios from "axios";

const API = Axios.create({baseURL:"http://localhost:4000"});
const API1 = Axios.create({baseURL:"http://localhost:4001"});
// API.interceptors.request.use((req) => {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("token")).token
//     }`;
//   return req;
// });

export const signIn = (formData) => API1.post("/login",formData)
export const signUp = (formData) => API1.post("/createconsumer",formData)
export const getConsumers = () => API.get("/consumers")
export const getConsumerbyid = (id) => API.get(`/editconsumer/${id}`)
export const updateConsumer = (workData,id) => API.patch(`/updateconsumer/${id}`,workData)
export const deleteConsumer = (id) => API.delete(`/deleteconsumer/${id}`)

export const createDevice = (workData) => API1.post("/createdevice",workData)
// export const getDevice = (userId) => API.get(`/workuser/${userId}`)
export const getDevices = () => API1.get("/devices")
export const getDevicebyid = (id) => API1.get(`/device/${id}`)
export const updateDevice = (workData,id) => API1.patch(`/updatedevice/${id}`,workData)
export const deleteDevice = (id) => API1.delete(`/deletedevice/${id}`)
