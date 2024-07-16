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
    }, 2000);
  };

  const backButtonStyle = {
    fontSize: '1.5rem',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div className="container mt-1">
     <Link to="/" style={backButtonStyle} className="btn btn-link mb-3">
        <div className="container-fluid d-flex container-back">
        <i className="fa-solid fa-arrow-left" style={{ fontSize: '1.5rem' }}></i>
        </div>
     </Link>

      <div className="row justify-content-start mb-1">
      </div>
      {message && <p className={`text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="mb-3 text-center">
          {profileImage ? (
            <img src={profileImage} alt="Vista previa" style={{ width: '300px', height: '300px', objectFit: 'cover', display: 'block', margin: '0 auto 20px auto' }} />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '300px', height: '300px', marginBottom: '20px' }}>
              Imagen de Perfil
            </div>
          )}
          <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} className="d-none" />
          <label htmlFor="profileImage" className="btn btn-secondary" style={{ display: 'inline-block', margin: '0 auto', fontSize: '0.75rem', padding: '5px 10px', marginBottom: '99px' }}>Insertar imagen</label>
        </div>
        <div className="mb-3 w-10 text-center">
          <label htmlFor="username" className="form-label" style={{ fontSize: '1.5rem' }}>Modificar nombre de usuario</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control text-center" placeholder="Username" />
        </div>
        <div className="w-100 d-flex justify-content-end mt-4">
        <button type="submit" className="btn btn-form" style={{ fontSize: '1.25rem', padding: '10px 20px', backgroundColor: '#f0ad4e', borderColor: '#eea236' }}>Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
