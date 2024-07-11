import React from "react";

export const NavLogin = () => {

    return (
        <div className="nav justify-content-center d-flex">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#gallery" data-bs-toggle="tab" data-bs-target="#gallery" type="button" role="tab" aria-controls="gallery" aria-selected="true" onclick="showGallery()">
                    <i className="fa-solid fa-table-cells"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#post" data-bs-toggle="tab" data-bs-target="#post" type="button" role="tab" aria-controls="post" aria-selected="false" onclick="showPosts()">
                    <i className="fa-solid fa-square"></i>
                  </a>
                </li>
              </ul>
        </div>
    )
}