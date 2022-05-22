import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";

export default function Navbar() {
  const state = useSelector((state) => state.handleCart);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg bg-light py-3 shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          It's Meol
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="products" className="nav-link">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="buttons">
            {user.loggedIn === false ? (
              <>
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => {
                    if (user.loggedIn) return;
                    setUser({ loggedIn: true });

                    if (location.state?.from) {
                      navigate(location.state.from);
                    }
                  }}
                >
                  <i className="fa fa-sign-in me-1"></i>Login
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    if (user.loggedIn) return;
                    setUser({ loggedIn: true });

                    if (location.state?.from) {
                      navigate(location.state.from);
                    }
                  }}
                >
                  <i className="fa fa-sign-in me-1"></i>Register
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    if (!user.loggedIn) return;
                    setUser({ loggedIn: false });
                  }}
                >
                  Log Out
                </button>
                <Link to="/cart" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-shopping-cart me-1"></i>Cart (
                  {state.length})
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
