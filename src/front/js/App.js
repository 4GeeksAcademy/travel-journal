import React from "react";
import { BrowserRouter } from "react-router-dom";
import injectContext from "./store/appContext";
import Layout from "./layout";

const App = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
};

export default injectContext(App);