import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div 
            className="container-fluid mt-2"
        >
            <div className="row justify-content-between align-items-center mb-3">
            </div>
            <div className="text-center">
                <h2>Home Page</h2>
                <p>Welcome to the Home Page!</p>
                {/* <Link to="/settings" className="name-user">username</Link> */}
            </div>
        </div>
    );
};

