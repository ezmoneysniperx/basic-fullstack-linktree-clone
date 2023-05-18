import { NavLink, useNavigate } from 'react-router-dom'
import React from "react";
import { getUser, resetUserSession } from "./service/AuthService";

const NavBar = () => {
    const navigate = useNavigate();
    const user = getUser();

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }

    return (
        <header>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink exact activeClassName="active" style={{ textDecoration: 'none' }} to="/"><a className="navbar-brand">Linktree Clone</a></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {user && <div className="navbar-nav ms-auto">
                            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/profile"><a className="nav-link btn btn-navbar btn-primary text-white"><i className="bi bi-person-add"></i> Profile</a></NavLink>
                            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/linkpage"><a className="nav-link btn btn-navbar btn-primary text-white"><i className="bi bi-person-add"></i> Links</a></NavLink>
                            <input type="button" className="nav-link btn btn-navbar btn-danger text-white" value="Logout" onClick={logoutHandler} />
                        </div>}
                        {!user && <div className="navbar-nav ms-auto">
                            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/register"><a className="nav-link btn btn-navbar btn-primary text-white"><i className="bi bi-person-add"></i> Sign Up</a></NavLink>
                            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/login"><a className="nav-link btn btn-navbar btn-success text-white"><i className="bi bi-door-open"></i> Login</a></NavLink>
                        </div>}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar