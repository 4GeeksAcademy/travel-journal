import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import AddPostForm from "./pages/addPostForm";
import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/Login";
import { Post } from "./pages/Post";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { PrivateRoute } from './component/PrivateRoute';
import { NotFound } from './component/NotFound';
import { Dashboard } from "./pages/dashboard";
import EditPostForm from "./pages/editPostForm";
import UserSettings from "./pages/userSettings";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;
    
    const location = useLocation();

    // List of defined routes
    const definedRoutes = [
        "/login",
        "/post/:theid",
        "/reset-password",
        "/forgot-password",
        "/home",
        "/dashboard",
        "/settings",
        "/AddAPost",
        "/editPost/:postId",
        "/single/:theid"
    ];

    // Function to check if the current path is defined
    const isDefinedRoute = (path) => {
        return definedRoutes.some(route => {
            const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, '[^/]+')}$`);
            return regex.test(path);
        });
    };

    const isLoginPage = location.pathname === "/login";
    const isNotFound = !isDefinedRoute(location.pathname);

    return (
        <div className="wrapper">
            <main className="main-content">
            <ScrollToTop>
                {!isLoginPage && !isNotFound && <Navbar />}
                <Routes basename={basename}>
                    <Route path="/" element={<Navigate to="/login" />} /> 
                    <Route element={<Login />} path="/login" />
                    <Route element={<Post />} path="/post/:theid" />
                    <Route element={<ResetPassword />} path="/reset-password" />
                    <Route element={<ForgotPassword />} path="/forgot-password" />
                    <Route element={<Home />} path="/home" />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                        } 
                        />
                        <Route path="/settings" element={
                            <PrivateRoute>
                                <UserSettings />
                                <UserSettings />
                            </PrivateRoute>
                        } 
                        />
                        <Route element={<AddPostForm />} path="/AddAPost" />
                        <Route element={<EditPostForm />} path="/editPost/:postId" />
                        <Route element={<NotFound />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </main>
        </div>
    );
};

export default Layout;