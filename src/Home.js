import React from "react";
import { NavLink } from 'react-router-dom'
import './stylesheets/home.css';

const Home = () => {
    return (
        <div className="container d-flex text-center justify-content-center align-items-center mt-5 text-white">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <main className="px-3">
                    <h3>Welcome to Linktree Clone!</h3>
                    <p className="lead">Jump right in and create your own profile page!</p>
                    <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/createpage"><a className="btn btn-secondary font-weight-bold border-white bg-white">Create Page</a></NavLink>
                </main>
            </div>
        </div>
    )
}

export default Home;