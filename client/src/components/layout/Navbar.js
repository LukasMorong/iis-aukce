import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import './Navbar.css'

import logo from '../../assets/logo.png'

function Navbar(props) {
    function logout(){
        document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.reload(false)
    }

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/login" exact>
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register" exact>
                    Register
                </NavLink>
            </li>

        </ul>
    )
    

    const loggedLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/profile" exact>
                    Profile
                </NavLink>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="" onClick={logout} >
                    Logout
                </Link>
            </li>
        </ul>
    )

    const notLogged = (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                    Home
                </NavLink>
            </li>
        </ul>  
    )

    const userLinks = (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/myAuctions" exact>
                    My auctions
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/addAuction" exact>
                    Add auction
                </NavLink>
            </li>
        </ul>
    )

    const licitatorLinks = (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="navbar-brand text-muted" to="/" exact>:licitator</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                    Licitations
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/licitator/requests" exact>
                    Licitation requests
                </NavLink>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={window.location.pathname} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User actions
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/myAuctions">My auctions</Link>
                    <Link className="dropdown-item" to="/addAuction">Add auction</Link>
                </div>
            </li>
        </ul>
    )

    const adminLinks = (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="navbar-brand text-muted" to="/" exact>:admin</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                    Manage Auctions
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/users" exact>
                    Manage Users
                </NavLink>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={window.location.pathname} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Licitator actions
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/licitator/licitations">Licitations</Link>
                    <Link className="dropdown-item" to="/licitator/requests">Licitation requests</Link>
                </div>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={window.location.pathname} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User actions
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/myAuctions">My auctions</Link>
                    <Link className="dropdown-item" to="/addAuction">Add auction</Link>
                </div>
            </li>
        </ul>
    )


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} width="30" height="30" className="navbarLogo" alt="LOGO"></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {props.role === 0 ? notLogged: ''}
                    {props.role === 1 ? userLinks: ''}
                    {props.role === 2 ? licitatorLinks: ''}
                    {props.role === 3 ? adminLinks: ''}

                    {props.logged ? loggedLinks : authLinks}
                </div>
            </div>
        </nav>
    )
}

export default Navbar