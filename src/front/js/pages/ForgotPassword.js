import React, { useState } from "react";

export const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        try {
            // Asegúrate de que la URL es correcta
            const response = await fetch("https://automatic-system-rq66vjwx5w635v45-3001.app.github.dev/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("We have sent you an email to reset your password.");
            } else {
                setErrors({ email: data.error || "The email does not exist in our database." });
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors({ email: "There was a problem with the request. Please try again later." });
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="container-form">
                <form onSubmit={handleSubmitPassword}>
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
                        {message && <div className="form-text text-success text-start">{message}</div>}
                    </div>
                    <div className="container container-btn d-flex justify-content-end">
                        <button type="submit" className="btn btn-form">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};