import { useEffect, useState } from "react";
import Loading from "react-fullscreen-loading";
import "../css/cart.css";
import Layout from "../layout/layout";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  let rows = "";
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null) setCart(cart);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   rows = "";
  // })

  const handleDel = (key) => {
    setLoading(true);
    rows = "";
    const shpCart = cart;
    shpCart.splice(key, 1);
    setCart(shpCart);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    localStorage.setItem('cart', JSON.stringify(shpCart));
  };

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
                <div className="col-4">
                  <h6 className="mob-text">${value.price}</h6>
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
      <div className="container px-4 py-5 mx-auto">
        {Object.keys(cart).length > 0 ? (
          <div>{rows}</div>
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
