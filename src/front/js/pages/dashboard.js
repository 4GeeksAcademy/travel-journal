import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Dashboard = () => {
    
    return (
        <div className="container-fluid mt-5 h-100">
            <div className="container-fluid d-flex container-back">                
                <Link to="/" className="back-home-link">
                <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-form m-3" >Add a new Post</button></div>
            <div className="container-fluid d-flex justify-content-center">            
                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-head p-3 d-flex align-items-center">
                        <img className="img-user me-3" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" alt="" />
                        <span className="name-user">Usuario</span>
                        <div className="dashboard-icons">
                        <i className="fa-solid fa-trash fa-lg text-danger m-1"></i>
                        <i className="fa-regular fa-pen-to-square fa-lg ms-1 text-warning"></i>
                        </div>
                    </div>
                    <img src="https://th.bing.com/th/id/OIP.ZAWa2trM5ig_8NSpuwmLgAHaEE?rs=1&pid=ImgDetMain" className="card-img-top img-post" alt="..." />
                    <div className="card-body">
                        <div className="body-header d-flex justify-content-between">
                            <h5 className="card-title">Title</h5>
                            <div className="btn-like-comment">
                                <i className="fa-solid fa-comment m-1"></i>
                                <i className="fa-solid fa-heart ms-1"></i>
                            </div>
                        </div>
                        
                        <p className="card-text text-start">texto</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
