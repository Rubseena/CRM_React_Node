import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

import { HashRouter } from "react-router-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";
import "./index.scss";
import "./utils/helper";
import history from "./browserHistory";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


