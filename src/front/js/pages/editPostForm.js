import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditPostForm = () => {
    const { store, actions } = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCountries();

        const fetchPostData = async () => {
            try {
                const token = localStorage.getItem('jwt-token');
                const response = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTitle(data.title);
                    setDescription(data.description);
                    setCountry(data.country);
                    setImage(data.image);
                } else {
                    console.error("Failed to fetch post data");
                }
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = { title, description, country, image };
        const result = await actions.editPost(postId, updatedPost);

        if (result.success) {
            alert("Post updated successfully!");
            navigate("/dashboard");
        } else {
            alert("Error updating post: " + result.message);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCountries = store.countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="m-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input type="text" value={image} className="form-control" onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <label htmlFor="country" className="form-label"></label>
                    <div className="dropdown">
                        <button className="btn btn-form dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {country || 'Select a country'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </li>
                            {filteredCountries.map((country, index) => (
                                <li key={index}>
                                    <a className="dropdown-item" href="#" onClick={() => handleCountryChange({ target: { value: country.name.common } })}>
                                        {country.name.common}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="d-flex">
                    <button type="submit" className="m-3 btn btn-form">Save Changes</button>
                    <button type="button" className="m-3 btn btn-form" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditPostForm;