import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const [userPosts, setUserPosts] = useState([]);
    
    
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const token = localStorage.getItem('jwt-token');
                const response = await fetch(process.env.BACKEND_URL + '/api/dashboard', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserPosts(data);
                } else {
                    console.error("Failed to fetch user posts");
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem('jwt-token');
            const response = await fetch(`${process.env.BACKEND_URL}/api/deletePost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                setUserPosts(userPosts.filter(post => post.id !== postId));
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = async (postId, updatedPost) => {
        try {
            const token = localStorage.getItem('jwt-token');
            const response = await fetch(`${process.env.BACKEND_URL}/api/editPost/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedPost)
            });
    
            if (response.ok) {
                const updatedPostData = await response.json();
                setUserPosts(userPosts.map(post => post.id === postId ? updatedPostData.post : post));
            } else {
                console.error("Failed to update post");
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="container-fluid mt-5 h-100">
            <div className="container-fluid d-flex container-back">
                <Link to="/" className="back-home-link">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <Link to="/addAPost">
                    <button className="btn btn-form m-3">Add a new Post</button>
                </Link>
            </div>
            <div className="container-fluid">
                <div className="d-flex flex-column align-items-center">
                    {userPosts.length === 0 ? (
                        <p>No posts found</p>
                    ) : (
                        userPosts.map(post => (
                            <div className="card mb-3" style={{ width: "50rem" }} key={post.id}>
                                <div className="card-head p-3 d-flex align-items-center">
                                    <img className="img-user me-3" src={post.author.image} alt="" />
                                    <span className="name-user">{post.author}</span>
                                    <div className="dashboard-icons">
                                        <i className="fa-solid fa-trash fa-lg text-danger m-1"></i>
                                        <i className="fa-regular fa-pen-to-square fa-lg ms-1 text-warning"></i>
                                    </div>
                                </div>
                                <img src={post.image} className="card-img-top img-post" alt="..." />
                                <div className="card-body">
                                    <div className="body-header d-flex justify-content-between">
                                        <h5 className="card-title">{post.title}</h5>
                                        <div className="btn-like-comment">
                                            <i className="fa-solid fa-comment m-1"></i>
                                            <i className="fa-solid fa-heart ms-1"></i>
                                        </div>
                                    </div>
                                    <p className="card-text text-start">{post.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
