import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/post.css"



export const Post = () => {
    const { store, actions } = useContext(Context);
	const params = useParams();
    const post = store.postExample ? store.postExample.find(p => p.id === params.theid) : null;

	if(!post) {
		return <div>Post no encontrado.</div>;
	}

    return (
        <div className="container-fluid mt-5 h-100">
            <div className="container-fluid d-flex container-back">
                <Link to="/" className="back-home-link">
                <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-head p-3 d-flex align-items-center">
                        <img className="img-user me-3" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" alt="" />
                        <span className="name-user">{post.autor}</span>
                    </div>
                    <img src={post.image} className="card-img-top img-post" alt="..." />
                    <div className="card-body">
                        <div className="body-header d-flex justify-content-between">
                            <h5 className="card-title">{post.pais}</h5>
                            <div className="btn-like-comment">
                                <i className="fa-solid fa-comment"></i>
                                <i className="fa-solid fa-heart ms-1"></i>
                            </div>
                        </div>
                        
                        <p className="card-text text-start">{post.text}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

Post.propTypes = {
    match: PropTypes.object
};