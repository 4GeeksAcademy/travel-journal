import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import defaultImage from '../../img/default-image.jpg';
import { Context } from "../store/appContext";
import '../../styles/navbar.css';

export const Navbar = () => {
	const {store, actions} = useContext(Context);
    const navigate = useNavigate();

	const username = store.user?.username || 'username';
	const userImage = store.user && store.userImage ? store.userImage : defaultImage;

	return (
		<>
		<nav className="navbar navbar-light bg-white p-3">
			<div className="container-fluid d-flex justify-content-between">
				<img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" />

				<div className="dropdown">
                    <button className="btn dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="me-2">{username}</span>
                        <img className="img-user" src={userImage} alt="User Avatar" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><Link className="dropdown-item" to="/settings">User profile</Link></li>
                        <li><Link className="dropdown-item" to="/dashboard">My Posts</Link></li>
                    </ul>
                </div>
			</div>
		</nav>
		</>
		
	);
};

