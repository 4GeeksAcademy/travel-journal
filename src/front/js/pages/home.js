import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardPost from "../component/cardPost";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="m-5">
			<h5>nombre del pais</h5>
			<div className= "d-flex">
				<CardPost/>
				<CardPost/>
				<CardPost/>
				<CardPost/>
			</div>
			

		</div>
	);
};