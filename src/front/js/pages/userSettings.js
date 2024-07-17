import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/index.css';

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
    }, 2000);
  };

  return (
    <div className="container mt-1">
      <div className="container-fluid d-flex container-back">
        <Link to="/" className="back-home-link">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <div className="row justify-content-start mb-1"></div>
      {message && (
        <p className={`text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="mb-3 text-center">
          {profileImage ? (
            <img src={profileImage} alt="Vista previa" className="profile-image" />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center placeholder-image">
              Imagen de Perfil
            </div>
          )}
          <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} className="d-none" />
          <label htmlFor="profileImage" className="btn btn-secondary insert-image-label">
            Insertar imagen
          </label>
        </div>
        <div className="mb-3 w-10 text-center">
          <label htmlFor="username" className="form-label username-label">
            Modificar nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control text-center"
            placeholder="Username"
          />
        </div>
        <div className="w-100 d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-form">
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
