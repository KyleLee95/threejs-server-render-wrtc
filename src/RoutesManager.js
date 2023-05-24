import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";
import { Home } from "./Home.js";

export const RoutesManager = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};
