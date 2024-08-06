import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/index.css';
import { Context } from '../store/appContext';
import defaultImage from '../../img/default-image.jpg'; // Importa la imagen predeterminada

const UserSettings = () => {
  const { actions, store } = useContext(Context);
  const [username, setUsername] = useState(store.user?.username || '');
  const [imageUrl, setImageUrl] = useState(store.user && store.userImage ? store.userImage : defaultImage);
  const [message, setMessage] = useState('');
  const [imageMessage, setImageMessage] = useState('');
  const navigate = useNavigate();
  

  const handleImageInsert = () => {
    const url = prompt("Por favor, introduce la URL de la imagen:");
    if (url) {
      setImageUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setImageMessage('');
    if (username.trim() === '') {
      setMessage('El nombre de usuario no puede estar vacío.');
      return;
    }

    try {
      if (imageUrl) {
        const result = await actions.uploadProfileImage(imageUrl);
        setImageMessage(result.message || '');
        if (result.message && result.message.includes('Error')) {
          throw new Error(result.message);
        }
      }
      const result = await actions.updateUser(store.userId, username);
      setMessage(result.message || '');
      if (result.message && result.message.includes('Error')) {
        throw new Error(result.message);
      }
      navigate('/dashboard');
    } catch (error) {
      setMessage(`Error updating user: ${error.message}`);
    }
  };

  return (
    <>
    <div className="container-fluid d-flex container-back mt-3 ms-4">
      <Link to="/home" className='container-back-icon'>
          <i className="fa-solid fa-arrow-left"></i>
      </Link>
    </div>
    <div className="container mt-1">
      <div className="row justify-content-start mb-1"></div>
      {message && (
        <p className={`text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>
          {message}
        </p>
      )}
      {imageMessage && (
        <p className={`text-center ${imageMessage.includes('successfully') ? 'text-success' : 'text-danger'}`}>
          {imageMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="mb-3 text-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Vista previa" className="profile-image" />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center placeholder-image">
              Profile Picture
            </div>
          )}
          <button type="button" onClick={handleImageInsert} className="btn btn-secondary insert-image-label">
          Insert image
          </button>
        </div>
        <div className="mb-3 w-50 text-center">
          <label htmlFor="username" className="form-label">
          Modify username

          
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
          Accept
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default UserSettings;
