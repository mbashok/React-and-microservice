import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store   from './Components/redux/store';
import AuthContextProvider from "./Components/redux/auth/ConsumerReducer"
import { ProSidebarProvider } from 'react-pro-sidebar';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <AuthContextProvider> */}
    <AlertProvider template={AlertTemplate} {...options}>
    < Provider store={store}>
    <ProSidebarProvider>
    <App />
    </ProSidebarProvider>
    </Provider>
    </AlertProvider>
    {/* </AuthContextProvider> */}
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
