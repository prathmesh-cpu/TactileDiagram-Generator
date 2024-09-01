import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers/reducer";
import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit"
import { ChakraProvider } from "@chakra-ui/react";



const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
          <Toaster />
        </ChakraProvider>        
      </BrowserRouter>
    </Provider>


  </React.StrictMode>
);
