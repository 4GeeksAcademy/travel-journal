import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div 
            className="container-fluid mt-5"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh'
            }}
        >
            <div className="row justify-content-between align-items-center mb-3">
                <div className="col-auto">
                    <img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" className="img-fluid" />
                </div>
                <div className="col-auto d-flex align-items-center">
                    <span className="name-user me-2">username</span>
                    <img className="img-user rounded-circle" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" alt="" style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
            <div className="text-center">
                <img 
                    src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" 
                    alt="logotipo travel journal" 
                    className="img-fluid" 
                    style={{ width: '200px', height: 'auto' }} 
                />
                <p>Welcome to the Home Page!</p>
                <Link to="/settings" className="btn btn-primary mt-5">Personalización de Usuario</Link>
            </div>
        </div>
    );
};
