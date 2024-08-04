import React from 'react';

export const NotFound = () => {
    return (
        <div className='container-fluid notfound'>
            <h1>404</h1>
            <p>Page not found</p>
            <img className="mb-5" src="https://raw.githubusercontent.com/AngelikaWebDev/travel-journal/main/src/front/img/avion.png" alt="Oops, an error occurred and the plane couldn't take off." />
            <a href="/home">Go back to home</a>
        </div>
    );
};