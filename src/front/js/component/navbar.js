// import React from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {

// 	return (
// 		<>
// 		<nav className="navbar navbar-light bg-white p-3">
// 			<div className="container-fluid d-flex justify-content-between">
// 				<img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" />
// 				<Link to="/settings">
// 					<div className="container-user">
// 						<span className="name-user">username</span>
// 						<img className="img-user ms-3" src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" alt="" />
// 					</div>
// 				</Link>
// 			</div>
// 		</nav>
// 		</>
		
// 	);
// };

import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-white p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <img 
          src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" 
          alt="logotipo travel journal" 
          style={{ height: '60px' }}
        />
        <Link to="/settings" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="name-user" style={{ fontSize: '1rem', marginRight: '10px' }}>username</span>
          <img 
            className="img-user" 
            src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg" 
            alt="" 
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
          />
        </Link>
      </div>
    </nav>
  );
};
