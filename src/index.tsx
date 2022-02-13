import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
    <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

