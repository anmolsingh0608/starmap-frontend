import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    nav("/admin/login");
  };
  return (
    <>
      <div id="logo">
        <span className="big-logo">C&O</span>
        <span className="small-logo"></span>
      </div>
      <div id="left-menu">
        <ul>
          <li className="text-decoration-none">
            <Link to="/admin/dashboard">
              <i className="ionicons ion-person"></i>
              <span className="text-decoration-none">Dashboard</span>
            </Link>
          </li>
          <li className="text-decoration-none">
            <Link to="/admin/citymap">
              <i className="ionicons ion-gear-b"></i>
              <span className="text-decoration-none">Citymap</span>
            </Link>
          </li>
          <li className="text-decoration-none">
            <Link to="/admin/starmap">
              <i className="ionicons ion-gear-b"></i>
              <span className="text-decoration-none">Starmap</span>
            </Link>
          </li>
          <li className="text-decoration-none">
            <Link to="/admin/coordinates">
              <i className="ionicons ion-gear-b"></i>
              <span className="text-decoration-none">Coordinates</span>
            </Link>
          </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={handleLogout.bind(this)}>
              <i className="ionicons ion-log-out"></i>
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
