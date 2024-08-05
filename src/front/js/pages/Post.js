import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/post.css";

export const Post = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comment, SetComment] = useState("")

    useEffect(() => {
        if (!store.posts || store.posts.length === 0) {
            actions.getPosts();
        }
    }, [actions, store.posts]);

    useEffect(() => {
        if (post) {
            const liked = store.likes.some(like => like.post_id === post.id && like.user_id === store.user.id);
            setIsLiked(liked);
            setLikeCount(post.like_count);
        }
    }, [store.likes, store.user, post]);

    const post = store.posts ? store.posts.find(p => p.id === parseInt(params.theid)) : null;

    const handleToggleLike = async () => {
        const response = await actions.toggleLike(post.id);
        if (response.success) {
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        } else {
            console.error(response.message);
        }
    };

    if (!post) {
        return <div>Post not found.</div>;
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
                        <img className="img-user me-3" src={post.author_image} alt="" />
                        <span className="name-user">{post.author}</span>
                    </div>
                    <img src={post.image} className="card-img-top img-post" alt="..." />
                    <div className="card-body">
                        <div className="body-header d-flex justify-content-between">
                            <h5 className="card-title">{post.title}</h5>
                            <div className="btn-like-comment d-flex">
                                <i className="fa-solid fa-comment m-2"></i>
                                <div className="like-section" onClick={handleToggleLike}>
                                    <i className={`fa-solid fa-heart m-1 ${isLiked ? "liked" : ""}`}></i>
                                    <span className="like-count">{likeCount}</span>
                                </div>
                            </div>
                        </div>
                        <p className="card-text text-start">{post.description}</p>
                    </div>
                    <div className="comments">
                    <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label htmlFor="floatingTextarea">send your comments</label>
</div>
                    </div>
                </div>                
            </div>            
        </div>
    );
}