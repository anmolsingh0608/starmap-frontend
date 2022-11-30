import Layout from "../layout/layout";
// import MapView from "../component/mapview";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/citymap.css";
import Cartpop from "../component/cartpop.js";
import Loading from "react-fullscreen-loading";
import html2canvas from "html2canvas";

mapboxgl.accessToken =
  "pk.eyJ1IjoibHdlbDciLCJhIjoiY2tsaHlmOWd0MXBhczJ2bjE2YXB6MjJpdyJ9.Qq7c9tVw3VydDUJhr-0YKg";

const CityMap = () => {
  const mapContainer = useRef(null);
  const [search, setSearch] = useState("");
  const map = useRef(null);
  const [lng, setLng] = useState(-73.9866);
  const [lat, setLat] = useState(40.7306);
  const [place, setPlace] = useState("New York");
  const [zoom, setZoom] = useState(10);
  const [stl, setStl] = useState("mapbox://styles/mapbox/streets-v8");
  const [tag, setTag] = useState(lng + "/" + lat);
  const [size, setSize] = useState("12 X 18 inches");
  const [loading, setLoading] = useState(true);
  let rows = "";
  const accessToken =
    "pk.eyJ1IjoibHdlbDciLCJhIjoiY2tsaHlmOWd0MXBhczJ2bjE2YXB6MjJpdyJ9.Qq7c9tVw3VydDUJhr-0YKg";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (map.current) return; // initialize map only once
    showMap();
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const showMap = (style = "mapbox://styles/mapbox/streets-v8") => {
    setStl(style);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: zoom,
      preserveDrawingBuffer: true
    });
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

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v8",
      center: [lng, lat],
      zoom: zoom,
      preserveDrawingBuffer: true
    });

    setTag(lng + "/" + lat);
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
    const sze = event.target.attributes.sze.value;
    setSize(sze);
    const width = event.target.attributes.width.value;
    const zoom = event.target.attributes.zoom.value;
    document.getElementsByClassName("active")[0].classList.remove("active");
    event.target.classList.add("active");
    document.getElementsByClassName("mapboxgl-map")[0].style.height = width;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: stl,
      center: [lng, lat],
      zoom: zoom,
      preserveDrawingBuffer: true
    });
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
      map: "citymap",
      label: place,
      tag: tag,
      lat: lat,
      lng: lng,
      price: "55",
      size: size,
      style: stl,
      img: img,
      zoom: zoom,
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // setTimeout(() => {
    document.getElementsByClassName("cart-pop")[0].style.display = "block";
    setLoading(false);
    // }, 1000);
  };

  return (
    <Layout>
      <main className="main-inner">
        <div className=" search-box">
          <input
            type="text"
            className="form form-control mb-3 search"
            id="search"
            onChange={handleSearch.bind(this)}
            placeholder="Location"
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
            value={tag}
            onChange={handleTag.bind(this)}
          />
          <hr className="mb-3" />
          <label className="mb-3">2. Styles</label> <br />
          <div className="" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/streets-v12"
              onClick={() => {
                showMap("mapbox://styles/mapbox/streets-v12");
              }}
            >
              Streets
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/outdoors-v12"
              onClick={() => {
                showMap("mapbox://styles/mapbox/outdoors-v12");
              }}
            >
              Outdoors
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/light-v11"
              onClick={() => {
                showMap("mapbox://styles/mapbox/light-v11");
              }}
            >
              Light
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/dark-v11"
              onClick={() => {
                showMap("mapbox://styles/mapbox/dark-v11");
              }}
            >
              Dark
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/satellite-v9"
              onClick={() => {
                showMap("mapbox://styles/mapbox/satellite-v9");
              }}
            >
              Satellite
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/satellite-streets-v12"
              onClick={() => {
                showMap("mapbox://styles/mapbox/satellite-streets-v12");
              }}
            >
              Satellite Streets
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/navigation-day-v1"
              onClick={() => {
                showMap("mapbox://styles/mapbox/navigation-day-v1");
              }}
            >
              Navigation Day
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              data="mapbox://styles/mapbox/navigation-night-v1"
              onClick={() => {
                showMap("mapbox://styles/mapbox/navigation-night-v1");
              }}
            >
              Navigation Night
            </button>
          </div>
          <hr className="mb-3 mt-5" />
          <label className="mb-3">3. Sizes</label> <br />
          <button
            type="button"
            className="btn btn-secondary m-2"
            zoom={zoom}
            width="400px"
            sze="12 X 18 inches"
            onClick={handleSize.bind(this)}
          >
            12 X 18 inches
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            zoom="8"
            width="380px"
            sze="18 X 24 inches"
            onClick={handleSize.bind(this)}
          >
            18 X 24 inches
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            zoom={zoom}
            width="350px"
            sze="30 X 40 cm"
            onClick={handleSize.bind(this)}
          >
            30 X 40 cm
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            zoom="8"
            width="390px"
            sze="50 X 70 cm"
            onClick={handleSize.bind(this)}
          >
            50 X 70 cm
          </button>
        </div>
        <div className="map">
          <div className="map-inner shadow">
            <div ref={mapContainer} className="map-container" />
            <h2>{place}</h2>
            <p className="lntlat">{tag}</p>
          </div>
        </div>
        <div className="text-center price-info">
          <h2>Total: $55</h2>
          <p>Ships 1-3 business days</p>
          <p>Free shipping included</p>
          <button type="button" className="btn btn-danger" onClick={handleCart.bind(this)}>
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

export default CityMap;
