import React from "react";
import { Route, Routes } from "react-router-dom";

import site from "./pages/site";
import information from "./pages/information";
import scan from "./pages/scan";
import generatereport from "./pages/generatereport";

const Routes1 = () => (
    <Routes>

        <Route
            path="/" Component={site} />
        <Route
            path="/generatereports" Component={generatereport} />
        <Route
            path="/scan" Component={scan} />
        <Route
            path="/information" Component={information} />

    </Routes>
);

export default Routes1;