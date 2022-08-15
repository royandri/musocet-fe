import React from "react";
import ReactDOM from "react-dom/client";
import Application from "./Application";
import reportWebVitals from "./reportWebVitals";
import SocketContextComponent from "./context/SocketContextComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import routes from "constants/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log(routes);
root.render(
  <SocketContextComponent>
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => {
          const Component = route.component;
          return (
            <Route
              path={route.path}
              key={idx}
              element={
                <React.Suspense>
                  <Component />
                </React.Suspense>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  </SocketContextComponent>
  // <Home />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
