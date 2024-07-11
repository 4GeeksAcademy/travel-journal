import React from "react";

export const Post = () => {

    return (
        <div className="container-fluid">
            <div className="container-fluid d-flex">
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                <div className="card" style={{ width: "50rem" }}>
                    <div className="card-head p-3 d-flex align-items-center">
                        <img className="img-user me-3" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" alt="" />
                        <span className="name-user">username</span>
                    </div>
                    <img src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" className="card-img-top img-post" alt="..." />
                    <div className="card-body">
                        <div className="body-header d-flex justify-content-between">
                            <h5 className="card-title">Card title</h5>
                            <div className="btn-like-comment">
                                <i className="fa-solid fa-comment"></i>
                                <i className="fa-solid fa-heart ms-1"></i>
                            </div>
                        </div>
                        
                        <p className="card-text text-start">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}