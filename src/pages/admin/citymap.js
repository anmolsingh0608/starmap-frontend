import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/admin/layout";
import axiosUrl from "../../component/axiosUrl";
import Loader from "../../component/loading";
import toast, { Toaster } from "react-hot-toast";
import Switch from "react-switch";

const CitymapAdmin = () => {
  const token = localStorage.getItem("token");
  const [styleFields, setStyleFields] = useState([
    {
      status: false,
      style: "mapbox://styles/mapbox/streets-v12",
      price: "",
      title: "Street Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/outdoors-v12",
      price: "",
      title: "Outdoor Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/light-v11",
      price: "",
      title: "Light Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/dark-v11",
      price: "",
      title: "Dark Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/satellite-v9",
      price: "",
      title: "Satellite Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      price: "",
      title: "Satellite Street Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      price: "",
      title: "Navigation Day Style",
    },
    {
      status: false,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      price: "",
      title: "Navigation Night Style",
    },
  ]);
  const [sizeFields, setSizeFields] = useState([
    { height: "", width: "", meas: "Inches", price: "" },
  ]);
  const [price, setPrice] = useState(55);
  const [error, setError] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      let response = await axiosUrl.get("/api/map?q=citymap");
      if (response.data !== null) {
        if (response.data.price) setPrice(response.data.price);
        if (response.data.config) {
          const { sizes, styles } = response.data.config;
          setStyleFields(styles);
          setSizeFields(sizes);
        }
      }
    };
    fetch();
  }, []);

  const handleSizeAdd = (event) => {
    const newField = { height: "", width: "", meas: "Inches", price: "" };
    setSizeFields([...sizeFields, newField]);
  };

  const handleStylePrice = (event, index) => {
    let styles = [...styleFields];
    styles[index].price = event.target.value;
    setStyleFields(styles);
  };

  const removeSizeFields = (index) => {
    let data = [...sizeFields];
    data.splice(index, 1);
    setSizeFields(data);
  };

  const handleSizeChange = (event, index) => {
    let data = [...sizeFields];
    data[index][event.target.name] = event.target.value;
    setSizeFields(data);
  };

  const handleValidation = () => {
    let err = {};
    let isValid = true;
    const prc = price;
    sizeFields.forEach((value, index) => {
      if (value.height === "" || value.width === "") {
        err.size = true;
        isValid = false;
      }
    });

    if (!prc) {
      err.price = true;
      isValid = false;
    }

    if (err.size) document.getElementById("contact-tab").click();
    else if (err.price) document.getElementById("home-tab").click();
    setError(err);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log("sizeFields", sizeFields);
    console.log("styleFields", styleFields);
    if (handleValidation()) {
      const config = {
        styles: styleFields,
        sizes: sizeFields,
      };
      const data = {
        name: "citymap",
        price: price,
        config: config,
      };

      axiosUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axiosUrl
        .post("/api/map", data)
        .then((res) => {
          console.log(res);
          toast.success("Saved!");
        })
        .catch((err) => {
          if (err.response.data.name === "TokenExpiredError") {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            nav("/admin/login");
          } else {
            alert("Invalid request");
          }
        });
    }
  };

  const handleSwitch = (index, status) => {
    let styles = [...styleFields];
    styles[index].status = status;
    setStyleFields(styles);
  };

  return (
    <Layout>
      <Loader time="1000" />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Price
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Styles
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Sizes
          </button>
        </li>
        <li className="nav-item float-end" role="presentation">
          <button
            className="btn btn-primary save-adm"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            onClick={handleSubmit.bind(this)}
          >
            Save
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="mt-3 ms-2">
            <small>
              <span className={error.price ? "errorColor" : "normal"}>
                All fields are required
              </span>
            </small>
          </div>
          <div className="form-floating mt-3">
            <input
              type="number"
              name="price"
              min="0"
              className="form-control"
              id="floatingPassword"
              placeholder=""
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label htmlFor="floatingPassword">Price($)</label>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="container mt-5">
            {styleFields.map((value, index) => {
              return (
                <div key={index} className="row mb-4">
                  <div className="col-3">{value.title}</div>
                  <div className="col-2 text-center">
                    <Switch
                      onChange={handleSwitch.bind(this, index)}
                      checked={value.status}
                    />
                  </div>

                  <div className="col-7">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price ($)"
                      min="0"
                      value={value.price}
                      onChange={(event) => handleStylePrice(event, index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <div className="mt-3 ms-2">
            <small>
              Leave price field empty if you don't want to add extra price for
              that size
              <br />
              <span className={error.size ? "errorColor" : "normal"}>
                All fields are required except price
              </span>
            </small>
          </div>
          <button
            className="btn btn-secondary mt-2 ms-2"
            type="button"
            onClick={handleSizeAdd.bind(this)}
          >
            Add more
          </button>
          <div className="container">
            {sizeFields.map((value, index) => {
              return (
                <div key={index} className="row mt-3">
                  <div className="col-7">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={value.height}
                        onChange={(event) => {
                          handleSizeChange(event, index);
                        }}
                        name="height"
                      />
                      <span className="input-group-text">X</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={value.width}
                        onChange={(event) => {
                          handleSizeChange(event, index);
                        }}
                        name="width"
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <select
                      className="form-select"
                      placeholder="Meas."
                      defaultValue={value.meas}
                      onChange={(event) => {
                        handleSizeChange(event, index);
                      }}
                      name="meas"
                    >
                      <option value="Inches">Inches</option>
                      <option value="CM">CM</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="$"
                      min="0"
                      value={value.price}
                      name="price"
                      onChange={(event) => {
                        handleSizeChange(event, index);
                      }}
                    />
                  </div>
                  <div className="col-1">
                    <button
                      type="button"
                      className="btn-close mb-2"
                      aria-label="Close"
                      onClick={() => removeSizeFields(index)}
                    ></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
};

export default CitymapAdmin;
