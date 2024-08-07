import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css"
import CardPost from "../component/cardPost";
import { Link } from "react-router-dom";


export const Home = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        actions.getCountries();
    }, []);

    useEffect(() => {
        actions.getPosts();
    }, []);

    useEffect(() => {
        actions.filterPostsByCountry();
    }, [store.selectedCountry]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value === "All" ? '' : e.target.value;
        actions.setSelectedCountry(selectedCountry);
        setSearchTerm("");
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCountries = store.countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

	return (
        <div className="m-5">
            <div className="text-center">
                <div className="dropdown">
                    <button className="btn btn-form dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {store.selectedCountry || 'Select a country'}
                    </button>
                    <ul className="dropdown-menu countries-dd" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCountryChange({ target: { value: 'All' } })}>All countries</a></li>
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
            <h5>{store.selectedCountry || 'All countries'}</h5>
            <div className="row">
                {store.filteredPosts && store.filteredPosts.length > 0 ? (
                    store.filteredPosts.map(post => (
                        <CardPost key={post.id} id={post.id} image={post.image} />
                    ))
                ) : (
                    <p>There are no posts available for the selected country.</p>
                )}
            </div>
        </div>
    );
};
