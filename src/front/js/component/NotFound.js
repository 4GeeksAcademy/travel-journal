import React from 'react';

export const NotFound = () => {
    return (
        <div className='container-fluid notfound d-flex flex-column align-items-center mt-5 mb-5'>
            <div className='container d-flex justify-content-center align-items'>
                <h1>404</h1>
                <p>Page not found</p>
            </div>
            <p>Oops, an error occurred and the plane couldn't take off.</p>
            <img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/prueba/src/front/img/avion.png" alt="Oops, an error occurred and the plane couldn't take off." />
            <a href="/home">Go back to home</a>
        </div>
    );
};