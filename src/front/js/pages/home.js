import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardPost from "../component/cardPost";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        actions.getCountries();
    }, []);

    useEffect(() => {
        actions.filterPostsByCountry();
    }, [store.selectedCountry]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value === "Todos" ? '' : e.target.value;
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
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {store.selectedCountry || 'Selecciona un país'}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCountryChange({ target: { value: 'All' } })}>Todos</a></li>
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
            <h5>{store.selectedCountry || 'Selecciona un país'}</h5>
            <div className="row">
                {store.filteredPosts && store.filteredPosts.length > 0 ? (
                    store.filteredPosts.map(post => (
                        <CardPost key={post.id} image={post.image} />
                    ))
                ) : (
                    <p>No hay posts disponibles para el país seleccionado.</p>
                )}
            </div>
        </div>
    );
};