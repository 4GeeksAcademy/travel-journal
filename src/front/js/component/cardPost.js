import React from "react";
import "../../styles/cardPost.css"

const CardPost = ({ image }) => {
    
    return (
        <div className="col-md-4 col-lg-3 col-sm-12 p-2">
            <div className="card h-100">
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