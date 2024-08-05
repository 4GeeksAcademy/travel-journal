import React from 'react';

export const NotFound = () => {
    return (
        <div className='container-fluid notfound d-flex flex-column align-items-center mb-5'>
            <div className="container-fluid d-flex align-items-center navbarnotfound pt-3 pb-3 mb-5">
                <img className="notfoundlogo" src="https://raw.githubusercontent.com/AngelikaWebDev/travel-journal/main/src/front/img/logo.png" alt="logotipo travel journal" />
                <img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" />
            </div>
            <div className='container d-flex justify-content-center align-items-center'>
                <h1>404</h1>
                <p>Page not found</p>
            </div>
            <p>Oops, an error occurred and the plane couldn't take off.</p>
            <img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/prueba/src/front/img/avion.png" alt="Oops, an error occurred and the plane couldn't take off." />
            <a href="/login">Go back to home</a>
        </div>
    );
};