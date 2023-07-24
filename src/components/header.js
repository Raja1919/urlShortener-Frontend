// Header.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">
          urlShortener
        </a>

        {isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/dashboard">
                  dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/CreateUrl">
                  CreateUrl
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/AllUrl">
                  AllUrl
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <div className="d-flex">
          {isLoggedIn ? (
            <button className="btn btn-primary me-2" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink className="btn btn-primary" to="/">
                Login
              </NavLink>
            </>
          )}
        </div>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
