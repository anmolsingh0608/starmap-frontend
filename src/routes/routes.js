import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityMap from "../pages/citymap";
import Coordinates from "../pages/coordinates";
import Starmap from "../pages/starmap";
import Cart from "../pages/cart";
import Login from "../pages/admin/login";
import Dashboard from "../pages/admin/dashboard";
import ProtectedRoutes from "../component/routeGuard";
import HomePage from "../pages/homepage";
import AutoLogin from "./components/autoLogin";
import StarmapAdmin from "../pages/admin/starmap";
import CoordinatesAdmin from "../pages/admin/coordinates";
import CitymapAdmin from "../pages/admin/citymap";
import Checkout from "../pages/checkout";
import Register from "../pages/register";
import Loginuser from "../pages/login";
import ProtectedUser from "./components/userProtected";
import Orders from "../pages/admin/orders/orders";
import Order from "../pages/admin/orders/order";
import ProtectedRegister from "./components/protectedRegister";

const RouteList = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="citymap" element={<CityMap />} />
          <Route path="coordinates" element={<Coordinates />} />
          <Route path="starmap" element={<Starmap />} />
          <Route path="cart" element={<Cart />} />
          <Route path="" element={<ProtectedUser />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>

          <Route path="" element={<ProtectedRegister />}>
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="login" element={<Loginuser />} />
          <Route path="" element={<AutoLogin />}>
            <Route path="/admin/login" element={<Login />} />
          </Route>
          <Route path="" element={<ProtectedRoutes />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/starmap" element={<StarmapAdmin />} />
            <Route path="/admin/coordinates" element={<CoordinatesAdmin />} />
            <Route path="/admin/citymap" element={<CitymapAdmin />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:id" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteList;
