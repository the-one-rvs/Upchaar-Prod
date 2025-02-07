import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js"; // Import persistor
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
