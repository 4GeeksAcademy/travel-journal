import React, { useState, useEffect } from 'react';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(new URLSearchParams(window.location.search).get('token'));

    useEffect(() => {
        setToken(new URLSearchParams(window.location.search).get('token'))
    }, [])
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('The passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://automatic-system-rq66vjwx5w635v45-3001.app.github.dev/reset-password', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset successfully.');
            } else {
                setError(data.msg || 'Error resetting the password.');
            }
        } catch (error) {
            setError('There was a problem with the request. Please try again later.');
        }
    };
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-start w-100">Nueva contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label text-start w-100">Confirmar contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirm-password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    {error && <div className="form-text text-danger text-start">{error}</div>}
                    {message && <div className="form-text text-success text-start">{message}</div>}
                    <div className="container container-btn d-flex justify-content-end">
                        <button type="submit" className="btn btn-form">Reset password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};