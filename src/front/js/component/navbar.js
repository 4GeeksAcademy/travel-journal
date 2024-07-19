import React from "react";
import { Link,useNavigate } from "react-router-dom";
import getState from "../store/flux"; 

export const Navbar = () => {

	return (
		<>
		<nav className="navbar navbar-light bg-white p-3">
			<div className="container-fluid d-flex justify-content-between">
				<img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" />
				<Link to="/">
					<div className="container-user">
						<span className="name-user">username</span>
						<img className="img-user ms-3" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" alt="" />
					</div>
				</Link>
			</div>
		</nav>
		</>
		
	);
};