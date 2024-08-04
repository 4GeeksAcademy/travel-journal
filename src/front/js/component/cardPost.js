import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardPost.css"

const CardPost = ({ id, image }) => {
    const navigate = useNavigate();

    const handleClick =()=>{
        navigate(`/post/${id}`);
    };

    return (
        <div className="col-md-4 col-lg-3 col-sm-12 p-2">
            <div className="card h-100" onClick={handleClick}>
                <img 
                    src={image} 
                    className="card-img-top" 
                    alt="..."
                />
            </div>
        </div>
    );
}

export default CardPost