import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import getState from "../store/flux"; 
import defaultImage from '../../img/default-image.jpg';
import { Context } from "../store/appContext";



export const Navbar = () => {
	const {store, actions} = useContext(Context);
    const navigate = useNavigate();

	const username = store.user?.username || 'username';
	const userImage = store.user && store.userImage ? store.userImage : defaultImage;
	
	const handleLogout = () => {
        actions.logout(); // Llama a la función de logout
        navigate('/login'); // Redirige al usuario a la página de login
    };

	return (
		<>
		<nav className="navbar navbar-light bg-white p-3">
			<div className="container-fluid d-flex justify-content-between">
				<img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" />
				<Link to="/settings">
					<div className="container-user">
						<span className="name-user">{username}</span>
						<img className="img-user ms-3" src={userImage} alt="" />
					</div>
				</Link>
			</div>
		</nav>
		</>
		
	);
};

