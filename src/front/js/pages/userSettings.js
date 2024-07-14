import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSettings = () => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setMessage('Username cannot be empty.');
      return;
    }
    setMessage('Profile updated successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000); // Redirigir después de 2 segundos
  };

  const backButtonStyle = {
    fontSize: '1.5rem',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div className="container mt-5">
      <Link to="/" style={backButtonStyle} className="btn btn-link mb-3">←</Link>
      
      <div className="row justify-content-between align-items-center mb-3">
        <div className="col-auto">
          <img src="https://raw.githubusercontent.com/4GeeksAcademy/travel-journal/main/src/front/img/logotipo.png" alt="logotipo travel journal" className="img-fluid" />
        </div>
        <div className="col text-center">
          <h2 className="mb-0">Modificar Perfil</h2>
        </div>
      </div>

      {message && <p className={`text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="mb-3 text-center">
          {profileImage ? (
            <img src={profileImage} alt="Vista previa" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
          ) : (
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px' }}>
              Imagen de Perfil
            </div>
          )}
          <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} className="d-none" />
          <label htmlFor="profileImage" className="btn btn-primary mt-2">Insertar imagen</label>
        </div>
        <div className="mb-3 w-75">
          <label htmlFor="username" className="form-label">Modificar nombre de usuario</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
        </div>
        <div className="w-100 d-flex justify-content-end">
          <button type="submit" className="btn btn-warning">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
