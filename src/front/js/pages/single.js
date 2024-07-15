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
        <div className="single-container">
			<Link to="/" className="back-home-link">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>            
            <img src={post.image} alt={post.pais} className="single-post-image" />
            <h6 className="display-4">Titulo Post {post.pais}</h6>
			<p>{post.text}</p>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};