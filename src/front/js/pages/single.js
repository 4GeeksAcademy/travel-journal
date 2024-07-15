import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";


export const Single = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const post = store.postExample ? store.postExample.find(p => p.id === params.theid) : null;

	if(!post) {
		return <div>Post no encontrado.</div>;
	}

	return (
		<div>
		<Link to="/" className="back-home-link">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
        <div className="single-container">            
            <img src={post.image} alt={post.pais} className="single-post-image" />
            <div className="d-flex">
                <h4>Titulo Post {post.pais}</h4>
                <div className="icons">
                    <i className="fa-solid fa-comment m-2"></i>
                    <i className="fa-solid fa-heart m-2"></i>
                </div>
            </div>
            <p>{post.text}</p>
        </div>
		</div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};