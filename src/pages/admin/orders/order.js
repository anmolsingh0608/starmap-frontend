import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../component/admin/layout";
import axiosUrl from "../../../component/axiosUrl";
import Image from "react-image-enlarger";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const token = localStorage.getItem("token");
  const [subtotal, setSubtotal] = useState();
  useEffect(() => {
    const fetch = () => {
      console.log(id);
      axiosUrl.defaults.headers.common["authorization"] = `Bearer ${token}`;
      axiosUrl
        .get(`/api/orders/${id}`)
        .then((res) => {
          setOrder(res.data);
          let total = 0;
          res.data.items.forEach((element) => {
            total = total + element.price;
          });
          setSubtotal(total);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [id, token]);

  return (
    <Layout>
      <div className="order container-fluid">
        <div className="order container">
          <div className="order d-flex justify-content-between align-items-center py-3">
            <h2 className="order h5 mb-0">Order #{order?._id}</h2>
          </div>

          <div className="order row">
            <div className="order col-12    ">
              <div className="order card mb-4">
                <div className="order card-body">
                  <div className="order mb-3 d-flex justify-content-between">
                    <div>
                      <span className="order me-3">
                        {new Date(order?.date).toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {/* <div className="order d-flex">
                      <div className="order dropdown">
                        <button
                          className="order btn btn-link p-0 text-muted"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="order bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="order dropdown-menu dropdown-menu-end">
                          <li>
                            <a className="order dropdown-item" href="#!">
                              <i className="order bi bi-pencil"></i> Edit
                            </a>
                          </li>
                          <li>
                            <a className="order dropdown-item" href="#!">
                              <i className="order bi bi-printer"></i> Print
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                  <table className="order table table-borderless">
                    <tbody>
                      {Object.keys(order).length > 0 &&
                        order.items.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="order d-flex mb-2">
                                  <div className="order flex-shrink-0">
                                    <SingleSource
                                      key={index}
                                      src={
                                        process.env.NODE_ENV === "development"
                                          ? process.env.REACT_APP_DEV_URL +
                                            "/" +
                                            value.img
                                          : process.env.REACT_APP_STAGE_URL +
                                            "/" +
                                            value.img
                                      }
                                    />
                                  </div>
                                  <div className="order align-self-md-center flex-lg-grow-1 ms-3">
                                    <h6 className="order small mb-0">
                                      {value.size + " - " + value.map}
                                    </h6>
                                    <span className="order small">
                                      {value.label}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td
                                className=""
                                style={{ verticalAlign: "middle" }}
                              >
                                1
                              </td>
                              <td
                                className="order text-end"
                                style={{ verticalAlign: "middle" }}
                              >
                                ${value.price}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">Subtotal</td>
                        <td className="order text-end">${subtotal}</td>
                      </tr>
                      {/* <tr>
                        <td colSpan="2">Shipping</td>
                        <td className="order text-end">$20.00</td>
                      </tr>
                      <tr>
                        <td colSpan="2">Discount (Code: NEWYEAR)</td>
                        <td className="order text-danger text-end">-$10.00</td>
                      </tr>
                      <tr className="order fw-bold">
                        <td colSpan="2">TOTAL</td>
                        <td className="order text-end">$169,98</td>
                      </tr> */}
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="order card mb-4">
                <div className="order card-body">
                  <div className="order row">
                    <div className="order col-lg-6">
                      <h3 className="order h6">Payment Method</h3>
                      <p>
                        Card <br />
                        Total: ${subtotal}{" "}
                        <span className="order badge bg-success rounded-pill">
                          PAID
                        </span>
                      </p>
                    </div>
                    <div className="order col-lg-6">
                      <h3 className="order h6">Billing address</h3>
                      <address>
                        <strong>
                          {order.firstName + " " + order.lastName}
                        </strong>
                        <br />
                        {order.address}
                        <br />
                        {order.region + ", " + order.country}
                        <br />
                        {order.zip}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="order col-lg-4">
              <div className="order card mb-4">
                <div className="order card-body">
                  <h3 className="order h6">Customer Notes</h3>
                  <p>
                    Sed enim, faucibus litora velit vestibulum habitasse. Cras
                    lobortis cum sem aliquet mauris rutrum. Sollicitudin. Morbi,
                    sem tellus vestibulum porttitor.
                  </p>
                </div>
              </div>
              <div className="order card mb-4">
                <div className="order card-body">
                  <h3 className="order h6">Shipping Information</h3>
                  <strong>FedEx</strong>
                  <span>
                    <a
                      href="#!"
                      className="order text-decoration-underline"
                      target="_blank"
                    >
                      FF1234567890
                    </a>{" "}
                    <i className="order bi bi-box-arrow-up-right"></i>{" "}
                  </span>
                  <hr />
                  <h3 className="order h6">Address</h3>
                  <address>
                    <strong>John Doe</strong>
                    <br />
                    1355 Market St, Suite 900
                    <br />
                    San Francisco, CA 94103
                    <br />
                    <abbr title="Phone">P:</abbr> (123) 456-7890
                  </address>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const SingleSource = ({ src }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div style={{ margin: "0.25rem" }}>
      <Image
        style={{ width: "100px", height: "auto" }}
        zoomed={zoomed}
        className="shadow"
        src={src}
        onClick={() => setZoomed(true)}
        onRequestClose={() => setZoomed(false)}
      />
    </div>
  );
};

export default Order;
