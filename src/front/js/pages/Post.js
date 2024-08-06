import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/post.css";

export const Post = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);

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

    useEffect(() => {
        if (post && showComments) {
            actions.getComments(post.id);
        }
    }, [post, showComments, actions]);

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

    const handleAddComment = async (e) => {
        if (e.key === "Enter" && newComment.trim() !== "") {
            const response = await actions.addComment(post.id, newComment);
            if (response.success) {
                setNewComment("");
            } else {
                console.error(response.message);
            }
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
                                <div className="comment-section" onClick={() => setShowComments(!showComments)}>
                                    <i className="fa-solid fa-comment m-2"></i>
                                    <span className="comment-count">{post.comment_count}</span>
                                </div>
                                <div className="like-section" onClick={handleToggleLike}>
                                    <i className={`fa-solid fa-heart m-1 ${isLiked ? "liked" : ""}`}></i>
                                    <span className="like-count">{likeCount}</span>
                                </div>
                            </div>
                        </div>
                        <p className="card-text text-start">{post.description}</p>
                    </div>
                    <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={handleAddComment}
                                ></textarea>
                                <label htmlFor="floatingTextarea">Send your comments</label>
                            </div>
                    {showComments && (
                        <div className="comments m-1">
                            {store.comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                    <div className="comment-header d-flex align-items-center">
                                        <img className="img-user m-1" src={comment.user_image} alt="" />
                                        <span className="name-user">{comment.user}</span>
                                    </div>
                                    <div className="comment-body d-flex justify-content-between align-items-center">
                                        <p className="comment-content mb-0">{comment.content}</p>
                                        <span className="comment-date text-muted ms-3">{new Date(comment.date).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}                            
                        </div>
                    )}
                </div>                
            </div>            
        </div>
    );
};