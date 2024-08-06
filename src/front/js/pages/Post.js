import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/post.css";




export const Post = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        if (!store.posts || store.posts.length === 0) {
            actions.getPosts();
        }
    }, [actions, store.posts]);

    const post = store.posts ? store.posts.find(p => p.id === parseInt(params.theid)) : null;

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <>
        <div className="container-fluid d-flex container-back mt-3">
            <Link to="/home" className='container-back-icon'>
                <i className="fa-solid fa-arrow-left"></i>
            </Link>
        </div>
        <div className="container-fluid mt-5 h-100">
            <div className="container-fluid d-flex justify-content-center">
                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-head p-3 d-flex align-items-center">
                        <img className="img-user me-3" src={post.author_image} alt="" />
                        <span className="name-user">{post.author}</span>
                    </div>
                    <img src={post.image} className="card-img-top img-post" alt="..." />
                    <div className="card-body">
                        <div className="body-header d-flex justify-content-between">
                            <h5 className="card-title">{post.title}</h5>
                            <div className="btn-like-comment">
                                <i className="fa-solid fa-comment"></i>
                                <i className="fa-solid fa-heart ms-1"></i>
                            </div>
                        </div>
                        <p className="card-text text-start">{post.description}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}