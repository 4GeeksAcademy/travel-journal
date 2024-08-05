import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/Login";
import { Post } from "./pages/Post";
import { PrivateRoute } from './component/PrivateRoute';
import { NotFound } from './component/NotFound';

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isNotFound = location.pathname === "*";

    return (
        <div className="wrapper">
            <main className="main-content">
            <ScrollToTop>
                {!isLoginPage && !isNotFound && <Navbar />}
                <Routes basename={basename}>
                    <Route path="/" element={<Navigate to="/login" />} /> 
                    <Route element={<Login />} path="/login" />
                    <Route element={<Post />} path="/post/:theid" />
                    <Route element={<Home />} path="/home" />
                    {/* <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                        } 
                    /> */}
                    {/* <Route path="/settinguser" element={
                            <PrivateRoute>
                                <SettingUser />
                            </PrivateRoute>
                        } 
                    /> */}
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </ScrollToTop>
            </main>
        </div>
    );
};

export default Layout;