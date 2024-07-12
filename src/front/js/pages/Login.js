import React, { useState } from "react";

export const Login = () => {
    const [showRegistro, setShowRegistro] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleShowRegistro = () => {
        setShowRegistro(true);
        setErrors({});
    };

    const handleShowLogin = () => {
        setShowRegistro(false);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!formData.username) {
            validationErrors.username = "El nombre de usuario es requerido";
        }

        if (showRegistro && !validateEmail(formData.email)) {
            validationErrors.email = "El correo electrónico no es válido";
        }

        if (!validatePassword(formData.password)) {
            validationErrors.password = "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Aquí puedes manejar el envío del formulario si no hay errores
            console.log("Formulario enviado con éxito", formData);
        }
    };

    return (
        <div className="container mt-5">
            <div className="container d-flex justify-content-center">
             <img className="img-logo mb-5" src="https://raw.githubusercontent.com/AngelikaWebDev/travel-journal/main/src/front/img/logo.png" alt="logotipo trabel journal" />
            </div>
            <div className="nav justify-content-center d-flex">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${showRegistro ? "active" : ""}`}
                            aria-current="page"
                            type="button"
                            role="tab"
                            aria-controls="registro"
                            aria-selected={showRegistro}
                            onClick={handleShowRegistro}
                        >
                            <span>Registro</span>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${!showRegistro ? "active" : ""}`}
                            type="button"
                            role="tab"
                            aria-controls="login"
                            aria-selected={!showRegistro}
                            onClick={handleShowLogin}
                        >
                            <span>Login</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="d-flex justify-content-center">
                {showRegistro ? (
                    <div className="container-form">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-start w-100">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <div className="form-text text-danger text-start">{errors.username}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-start w-100">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="form-text text-danger text-start">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-start w-100">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <div className="form-text text-danger text-start">{errors.password}</div>}
                            </div>
                            <div className="mb-3 form-check d-flex justify-content-end align-items-center">
                                <input type="checkbox" className="form-check-input me-3" id="exampleCheck1" required />
                                <label className="form-check-label text-start" htmlFor="exampleCheck1">Aceptar política de privacidad</label>
                            </div>
                            <div className="container container-btn d-flex justify-content-end">
                                <button type="submit" className="btn btn-form">Enviar</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="container-form">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label text-start w-100">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <div className="form-text text-danger text-start">{errors.username}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-start w-100">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <div className="form-text text-danger text-start">{errors.password}</div>}
                            </div>
                            <div className="container container-btn d-flex justify-content-end">
                                <button type="submit" className="btn btn-form">Enviar</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};