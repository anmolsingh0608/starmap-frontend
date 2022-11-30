const Footer = () => {
  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            href="/"
            className="d-flex align-items-center mb-3 link-dark text-decoration-none"
          ></a>
          <p className="text-muted">
            Copyright © 2021 Craft & Oak. All rights reserved.
          </p>
        </div>

        <div className="col mb-3"></div>

        <div className="col mb-3">
          <h5>POSTER MAKERS</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Citymap Posters
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Starmap Posters
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Coordinates Posters
              </a>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>DECORATING</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Student Dorm
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Home Office
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Work Desk
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Local Business
              </a>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>OCCASIONS</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Valentine's Day
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Birth
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Wedding
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Birthday
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Moving
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="!#" className="nav-link p-0 text-muted">
                Anniversary
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
