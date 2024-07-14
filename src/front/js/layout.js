import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/Login";
import { Post } from "./pages/Post";
import UserSettings from "./pages/userSettings";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    // console.log("Backend URL:", process.env.BACKEND_URL); 
    // if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;
    // const location = useLocation();
    // const isLoginPage = location.pathname === "/login"; // Para determinar si la página actual es de login

    return (
        <div>
            <ScrollToTop>
                {/* {!isLoginPage && <Navbar />} */}
                <Routes basename={basename}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/single/:theid" element={<Single />} />
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </div>
    );
};

export default Layout;
