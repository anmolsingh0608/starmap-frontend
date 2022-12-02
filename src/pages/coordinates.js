import Layout from "../layout/layout";
import "../css/coordinates.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/starmap.css";
import Cartpop from "../component/cartpop.js";
import Loading from "react-fullscreen-loading";
import html2canvas from "html2canvas";
import axiosUrl from "../component/axiosUrl";
import Loader from "../component/loading";

mapboxgl.accessToken =
  "pk.eyJ1IjoibHdlbDciLCJhIjoiY2tsaHlmOWd0MXBhczJ2bjE2YXB6MjJpdyJ9.Qq7c9tVw3VydDUJhr-0YKg";

const Coordinates = () => {
  const [search, setSearch] = useState("");
  const [lng, setLng] = useState(-73.9866);
  const [lat, setLat] = useState(40.7306);
  const [place, setPlace] = useState("New York");
  const [tag, setTag] = useState(lng + ", " + lat);
  const [size, setSize] = useState("12 X 18 inches");
  const [loading, setLoading] = useState(true);
  const [styleFields, setStyleFields] = useState([]);
  const [sizeFields, setSizeFields] = useState([]);
  const [price, setPrice] = useState(55);
  const [total, setTotal] = useState();
  const [selectedStyle, setSelectedStyle] = useState({
    style: "",
    price: "",
  });
  const [selectedSize, setSelectedSize] = useState({
    size: "",
    price: "",
  });
  let rows = "";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetch = async () => {
      let response = await axiosUrl.get("/api/map?q=coordinates");
      if (response.data !== null) {
        if (response.data.price) {
          setPrice(response.data.price);
          setTotal(response.data.price);
        }

        if (response.data.config) {
          const { sizes, styles } = response.data.config;
          console.log(sizes, styles);
          let ttl = 0;
          if (Object.keys(styles).length > 0) {
            setSelectedStyle({
              style: styles[0].style,
              price: styles[0].price,
            });
            if (styles[0].price) {
              ttl = response.data.price + +styles[0].price;
              setTotal(ttl);
            }
            initialColor(styles[0].bgColor, styles[0].color);
          }
          if (Object.keys(sizes).length > 0) {
            const meas =
              sizes[0].height + " X " + sizes[0].width + " " + sizes[0].meas;
            setSelectedSize({
              size: meas,
              price: sizes[0].price,
            });
            if (sizes[0].price) {
              ttl = ttl + +sizes[0].price;
              setTotal(ttl);
            }
          }
          setStyleFields(styles);
          setSizeFields(sizes);
        }
      }
    };
    fetch();
    setLoading(false);
  }, []);

  const initialColor = (bg, clr) => {
    const bgColor = bg;
    const color = clr;
    console.log(color);
    const element = document.getElementsByClassName("map-pre")[0];
    element.style.backgroundColor = bgColor;
    element.style.color = color;
    const elements = document.getElementsByClassName("hr-co");
    for (const ele of elements) {
      ele.style.color = color;
    }
  };

  const handleColor = (event) => {
    const bgColor = event.target.attributes.data.value;
    const color = event.target.attributes.color.value;
    console.log(color);
    const element = document.getElementsByClassName("map-pre")[0];
    element.style.backgroundColor = bgColor;
    element.style.color = color;
    const elements = document.getElementsByClassName("hr-co");
    for (const ele of elements) {
      ele.style.color = color;
    }
  };

  const handleSearch = async (event) => {
    const { value } = event.target;
    const axiosUrl = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoibHdlbDciLCJhIjoiY2tsaHlmOWd0MXBhczJ2bjE2YXB6MjJpdyJ9.Qq7c9tVw3VydDUJhr-0YKg`,
    });

    let response = await axiosUrl.get();
    setSearch(response.data.features);
  };

  const handleMap = async (event) => {
    const lng = event.target.attributes.lng.value;
    const lat = event.target.attributes.lat.value;
    const region = event.target.attributes.place.value;
    console.log(region);

    setTag(lng + ", " + lat);
    setLng(lng);
    setLat(lat);
    setPlace(region);
    document.getElementById("search").value = region;
    setSearch("");
  };

  if (Object.keys(search).length > 0) {
    rows = search.map((value, index) => {
      return (
        <button
          type="button"
          className="list-group-item list-group-item-action"
          lng={value.geometry.coordinates[0]}
          lat={value.geometry.coordinates[1]}
          key={index}
          place={value.text}
          onClick={handleMap.bind(this)}
        >
          {value.place_name}
        </button>
      );
    });
  }

  const handleSize = (event) => {
    const width = event.target.attributes.width.value;
    const sze = event.target.attributes.sze.value;
    setSize(sze);
    document.getElementsByClassName("active")[0].classList.remove("active");
    event.target.classList.add("active");
    document.getElementsByClassName("map-container-co")[0].style.height = width;
  };

  const handleTag = (event) => {
    const { value } = event.target;
    setTag(value);
  };

  const handleRegion = (event) => {
    const { value } = event.target;
    setPlace(value);
  };

  const handleCart = async () => {
    // await getImage();
    setLoading(true);
    let img = "";
    await html2canvas(document.getElementsByClassName("map-inner")[0]).then(
      function (canvas) {
        img = canvas.toDataURL("image/jpeg");
        console.log(img);
      }
    );

    let cart = [];
    const existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart !== null) {
      cart = existingCart;
    }
    let cartItem = {
      map: "coordinates",
      label: place,
      tag: tag,
      lat: lat,
      lng: lng,
      price: total,
      size: size,
      img: img,
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // setTimeout(() => {
    document.getElementsByClassName("cart-pop")[0].style.display = "block";
    setLoading(false);
    // }, 1000);
  };

  const updatePrice = (style, prc, type) => {
    let ttl = total;
    if (type === "style") {
      ttl = ttl - Number(selectedStyle.price);
      if (prc) {
        const addOn = ttl + +prc;
        setTotal(addOn);
      } else {
        const add = 0;
        const addOn = ttl + add;
        setTotal(addOn);
      }
      setSelectedStyle({
        style: style,
        price: prc,
      });
    } else {
      ttl = ttl - Number(selectedSize.price);
      if (prc) {
        const addOn = ttl + +prc;
        setTotal(addOn);
      } else {
        const add = 0;
        const addOn = ttl + add;
        setTotal(addOn);
      }
      setSelectedSize({
        style: style,
        price: prc,
      });
    }
  };

  return (
    <Layout>
      <main className="main-inner">
        <div className=" search-box">
          <input
            type="text"
            className="form form-control mb-3 search"
            id="search"
            placeholder="Location"
            onChange={handleSearch.bind(this)}
          />
          {Object.keys(search).length > 0 && (
            <div
              data-bs-smooth-scroll="true"
              tabIndex="0"
              className="scrollspy-example search-result shadow mb-3 bg-body"
            >
              <div className="list-group">{rows}</div>
            </div>
          )}
          <hr className="mb-3" />
          <label className="mb-3">1. Labels</label>
          <input
            type="text"
            className="form form-control mb-3"
            placeholder="Title"
            value={place || ""}
            onChange={handleRegion.bind(this)}
          />
          <input
            type="text"
            className="form form-control mb-3"
            placeholder="Tagline"
            value={tag || ""}
            onChange={handleTag.bind(this)}
          />
          <hr className="mb-3" />
          <label className="mb-3">2. Styles</label> <br />
          <div className="styles" aria-label="Basic example">
            {styleFields.map((value, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  style={{ backgroundColor: value.bgColor }}
                  className="btn m-2 button-co"
                  data={value.bgColor}
                  color={value.color}
                  onClick={(event) => {
                    handleColor(event);
                    updatePrice(value.bgColor, value.price, "style");
                  }}
                ></button>
              );
            })}
          </div>
          <hr className="mb-3 mt-5" />
          <label className="mb-3">3. Sizes</label> <br />
          <div className="sizes">
            {sizeFields.map((value, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className="btn btn-outline-secondary m-2"
                  width="410px"
                  sze={value.height + " X " + value.width + " " + value.meas}
                  onClick={(event) => {
                    handleSize(event);
                    updatePrice(
                      value.height + " X " + value.width + " " + value.meas,
                      value.price,
                      "size"
                    );
                  }}
                >
                  {value.height + " X " + value.width + " " + value.meas}
                </button>
              );
            })}
          </div>
          {/* <button
            type="button"
            className="btn btn-secondary m-2"
            width="410px"
            sze="12 X 18 inches"
            onClick={handleSize.bind(this)}
          >
            12 X 18 inches
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            zoom="8"
            width="400px"
            sze="18 X 24 inches"
            onClick={handleSize.bind(this)}
          >
            18 X 24 inches
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            width="400px"
            sze="30 X 40 cm"
            onClick={handleSize.bind(this)}
          >
            30 X 40 cm
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            width="408px"
            sze="50 X 70 cm"
            onClick={handleSize.bind(this)}
          >
            50 X 70 cm
          </button> */}
        </div>
        <div className="map">
          <div className="map-inner shadow">
            <div className="border map-pre">
              <div className="outer-map text-center">
                <div className="map-container-co">{place.charAt(0)}</div>
              </div>
              <hr className="hr-co" />
              <h2 className="text-center place-co  m-3">{place}</h2>
              <hr className="hr-co" />
              <p className="text-center lntlat-co  m-3">{tag}</p>
              <hr className="hr-co mb-3" />
            </div>
          </div>
        </div>
        <div className="text-center price-info">
          <h2>Total: ${total}</h2>
          <p>Ships 1-3 business days</p>
          <p>Free shipping included</p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCart.bind(this)}
          >
            Add to cart
          </button>
          <hr />
          <p>
            Using our custom-built map editor, choose from a wide variety of
            themes, colours and sizes.
          </p>
          <p>
            <b>Production Process</b>
            <br />
            Advanced Lichee Printing using HP Indigo 12000 Press
          </p>
          <p>
            <b>Paper Stock</b> <br />
            250 GSM Matte Paper <br />
            Acid Free / Archival Quality
          </p>
        </div>
        <Cartpop />
        <Loading
          loading={loading}
          background="#ffffffde"
          loaderColor="#3498db"
        />
      </main>
    </Layout>
  );
};

export default Coordinates;
