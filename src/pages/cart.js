import { useEffect, useState } from "react";
import Loading from "react-fullscreen-loading";
import { Link } from "react-router-dom";
import "../css/cart.css";
import Layout from "../layout/layout";
import Loginuser from "./login";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  let rows = "";
  useEffect(() => {
    const fetch = async () => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart !== null) {
        setCart(cart);
        let total = 0;
        await cart.forEach((element) => {
          total = total + +element.price;
        });
        setSubtotal(total);
      }
    };
    fetch();
    setLoading(false);
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token") ? true : false;
    setLoggedIn(isLoggedIn);
  }, []);

  const handleDel = (key) => {
    setLoading(true);
    rows = "";
    const shpCart = cart;
    shpCart.splice(key, 1);
    setCart(shpCart);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    localStorage.setItem("cart", JSON.stringify(shpCart));
  };

  const handleLogin = (status) => {
    console.log(status)
    setLoggedIn(status);
  }

  if (Object.keys(cart).length > 0) {
    rows = cart.map((value, index) => {
      return (
        <div key={index}>
          <div className="row d-flex justify-content-center border-top">
            <div className="col-5">
              <div className="row d-flex">
                <div className="book">
                  <img src={value.img} className="book-img shadow" alt="" />
                </div>
              </div>
            </div>
            <div className="my-auto col-7">
              <div className="row text-right">
                <div className="col-4">
                  <div className="my-auto flex-column d-flex pad-left">
                    <h5 className="mob-text">
                      {value.size + " - "}
                      {value.map === "starmap"
                        ? "Starmap"
                        : value.map === "citymap"
                        ? "Citymap"
                        : "Coordnates map"}
                    </h5>
                    <p className="mob-text">{value.label}</p>
                  </div>
                </div>
                <div className="col-4">
                  <h6 className="mob-text">${value.price}</h6>
                </div>
                <div className="col-4">
                  <div className="row d-flex justify-content-end px-3">
                    <p
                      className="mb-0"
                      id="cnt1"
                      onClick={() => {
                        handleDel(index);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <Layout>
      <Loginuser handleLogin={handleLogin} />
      <div className="container px-4 py-5 mx-auto">
        {Object.keys(cart).length > 0 ? (
          <>
            <div>{rows}</div>
            <div className="float-end me-5">
              <h4 className="mb-3">Subtotal: ${subtotal}</h4>
              <div>
                {loggedIn ? (
                  <Link to="/checkout">
                    <button
                      style={{ width: "100%" }}
                      type="button"
                      className="btn btn-primary"
                    >
                      Checkout
                    </button>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <img src="/cart1.png" alt="" style={{ width: 450 + "px" }} />
          </div>
        )}
      </div>
      <Loading loading={loading} background="#ffffffde" loaderColor="#3498db" />
    </Layout>
  );
};

export default Cart;
