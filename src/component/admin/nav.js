import { useNavigate } from "react-router-dom";

const Nav = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    nav("/admin/login");
  };
  return (
    <div id="header">
      <div className="header-left float-left">
        <i id="toggle-left-menu" className="ion-android-menu"></i>
        <i
          className="ionicons ion-log-out float-end me-2"
          onClick={handleLogout.bind(this)}
        ></i>
      </div>
    </div>
  );
};

export default Nav;
