import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSettings = () => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');

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
    // Aquí se enviaría la actualización al backend
    // Simulación de guardado exitoso
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-link mb-3">←</button>
      <h2 className="text-center">Modificar Perfil</h2>
      {message && <p className="text-center text-success">{message}</p>}
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
          <label htmlFor="profileImage" className="btn btn-secondary mt-2">Insertar imagen</label>
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="username" className="form-label">Modificar nombre de usuario</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
        </div>
        <button type="submit" className="btn btn-warning">Aceptar</button>
      </form>
    </div>
  );
};

export default UserSettings;



