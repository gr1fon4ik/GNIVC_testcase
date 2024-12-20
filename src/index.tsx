import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Loader from "@components/loader/Loader";

import "@styles/global.scss";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Router>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Router>,
  document.getElementById("root")
);
