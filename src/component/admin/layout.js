import Nav from "./nav";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div id="main-content">
        <Nav />
        <div id="page-container">
            {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
