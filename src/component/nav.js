import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [count, setCount] = useState(0);
  // eslint-disable-next-line
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart)
    if (cart !== null) {
      setCount(cart.length);
    }
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#!">
          Craft & Oak
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Design now
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/citymap">
                    City maps
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/starmap">
                    Star maps
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/coordinates">
                    Coordinates
                  </Link>
                </li>
                {/* <li>
                  <a className="dropdown-item" href="#!">
                    Travel maps (Coming soon)
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <Link to="/cart">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {count}
                </span>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
