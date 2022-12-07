import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import Loader from "../component/loading";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import StripeCheckout from "react-stripe-checkout";
import axiosUrl from "../component/axiosUrl";
import Successpop from "../component/success";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart !== null && cart.length > 0) {
        setCart(cart);
        let total = 0;
        await cart.forEach((element) => {
          total = total + +element.price;
        });
        setSubtotal(total);
      } else {
        nav("/cart");
      }
    };
    fetch();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    let err = {};
    const form = formData;
    let isValid = true;

    if (!form.firstName) {
      err.firstName = true;
      isValid = false;
    }

    if (!form.lastName) {
      err.lastName = true;
      isValid = false;
    }

    if (!form.email) {
      err.email = true;
      isValid = false;
    }

    if (!form.address) {
      err.address = true;
      isValid = false;
    }

    if (!form.country) {
      err.country = true;
      isValid = false;
    }

    if (!form.region) {
      err.region = true;
      isValid = false;
    }

    if (!form.zip) {
      err.zip = true;
      isValid = false;
    }

    console.log(err);

    setErrors(err);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      document.getElementsByClassName("StripeCheckout")[0].click();
    }
  };

  const tokenHandler = (token) => {
    handleToken(token);
  };

  const handleToken = (token) => {
    try {
      axiosUrl.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      axiosUrl
        .post("/api/checkout/pay", {
          token: token,
          amount: subtotal,
        })
        .then((res) => {
          if (res.data.id) {
            const data = {
              ...formData,
              stripe_transaction_id: res.data.id,
              items: cart,
            };
            axiosUrl
              .post("/api/checkout/order", data)
              .then((response) => {
                localStorage.removeItem("cart");
                document.getElementsByClassName("cart-pop")[0].style.display =
                  "block";
              })
              .catch(() => toast.error("Invalid request"));
          }
        })
        .catch((err) => toast.error("Invalid request"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Toaster />
      <Loader time="1000" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {cart.map((value, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div>
                      <h6 className="my-0">
                        {value.size + " - "}
                        {value.map === "starmap"
                          ? "Starmap"
                          : value.map === "citymap"
                          ? "Citymap"
                          : "Coordnates map"}
                      </h6>
                      <small className="text-muted">{value.label}</small>
                    </div>
                    <span className="text-muted">${value.price}</span>
                  </li>
                );
              })}
              {/* <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">-$5</span>
              </li> */}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${subtotal}</strong>
              </li>
            </ul>

            {/* <form className="card p-2" style={{ borderRadius: "0px" }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form> */}
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Address</h4>
            <div className="needs-validation" noValidate="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value={formData.firstName || ""}
                    name="firstName"
                    onChange={handleChange.bind(this)}
                  />
                  {errors.firstName ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Valid first name is required.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value={formData.lastName || ""}
                    onChange={handleChange.bind(this)}
                    name="lastName"
                  />
                  {errors.lastName ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Valid last name is required.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted"></span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange.bind(this)}
                  name="email"
                />
                {errors.email ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please enter a valid email address for shipping updates.
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  onChange={handleChange.bind(this)}
                  name="address"
                />
                {errors.address ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please enter your shipping address.
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  value={formData.address2}
                  placeholder="Apartment or suite"
                  onChange={handleChange.bind(this)}
                  name="address2"
                />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <CountryDropdown
                    classes="form-select"
                    value={country}
                    name="country"
                    onChange={(val, event) => {
                      handleChange(event);
                      setCountry(val);
                    }}
                  />
                  {errors.country ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Please select a valid country.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <RegionDropdown
                    country={country}
                    classes="form-select"
                    value={region}
                    name="region"
                    onChange={(val, event) => {
                      handleChange(event);
                      setRegion(val);
                    }}
                  />
                  {errors.region ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Please provide a valid state.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    value={formData.zip}
                    onChange={handleChange.bind(this)}
                    name="zip"
                  />
                  {errors.zip ? (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      Zip code required.
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <hr className="mb-4" />
              {/* <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="save-info"
                />
                <label className="custom-control-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <hr className="mb-4" /> */}

              <h4 className="mb-3">Payment</h4>
              <div style={{ display: "none" }}>
                <StripeCheckout
                  stripeKey="pk_test_51H7NCGKebr7ly2dMTVk6R8AALogkoAY0vxA7eVTWSm8kwl6W4G0TIWNdi9HqX3IdTXzdmckeF2ftKD2kfkaiha5c007pIZmarC"
                  token={tokenHandler}
                  label="Continue to Payment"
                  email={formData.email}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={handleSubmit.bind(this)}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">© 2017-2018 Company Name</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#!">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#!">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#!">Support</a>
            </li>
          </ul>
        </footer>
      </div>
      <Successpop />
    </Layout>
  );
};

export default Checkout;
