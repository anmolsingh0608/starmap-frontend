import Layout from "../layout/layout";
import celestial from "d3-celestial";
import { createRef, useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Web } from "../svg/web.svg";
import { ReactComponent as Mdl } from "../svg/mdl.svg";
import { ReactComponent as Line } from "../svg/line.svg";
import { ReactComponent as Font } from "../svg/fonts.svg";
import Cartpop from "../component/cartpop.js";
import html2canvas from "html2canvas";
import axiosUrl from "../component/axiosUrl";
import Loader from "../component/loading";
import Loading from "react-fullscreen-loading";
const Celestial = celestial.Celestial();

const Starmap = () => {
  const ref = createRef(null);
  const [names, setNames] = useState(false);
  const [lines, setLines] = useState(true);
  const [mv, setMv] = useState(true);
  const [globe, setGlobe] = useState(false);
  const [bg, setBg] = useState("#000");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const [search, setSearch] = useState("");
  const [lng, setLng] = useState(2.3483915);
  const [lat, setLat] = useState(48.8534951);
  const [tag, setTag] = useState(lng + ", " + lat);
  const [place, setPlace] = useState("Paris");
  const [msg, setMsg] = useState("Star-Map");
  const [region, setRegion] = useState("Paris");
  const [size, setSize] = useState("12 X 18 inches");
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
      let response = await axiosUrl.get("/api/map?q=starmap");
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
  }, []);

  useEffect(() => {
    const DATE = new Date("2021-09-25T04:00:00+0000");
    const [LAT, LON] = [lat, lng];
    const FONT = "arial";

    const config = {
      container: "map",
      width: 200,

      form: false,
      advanced: false,
      interactive: false,
      disableAnimations: true,

      zoomlevel: null,
      zoomextend: 1,

      projection: "airy",
      transform: "equatorial",

      follow: "zenith",
      geopos: [LAT, LON],

      lines: {
        graticule: {
          show: globe,
          stroke: "#fff",
          width: 0.5,
          opacity: 0.5,
          // grid values: "outline", "center", or [lat,...] specific position
          lon: {
            pos: [""],
            fill: "#eee",
            font: "10px Helvetica, Arial, sans-serif",
          },
          // grid values: "outline", "center", or [lon,...] specific position
          lat: {
            pos: [""],
            fill: "#eee",
            font: "10px Helvetica, Arial, sans-serif",
          },
        },
        equatorial: {
          show: false,
          stroke: "#aaaaaa",
          width: 1.3,
          opacity: 0.7,
        },
        ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },
        galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },
        supergalactic: {
          show: false,
          stroke: "#cc66cc",
          width: 1.3,
          opacity: 0.7,
        },
      },

      planets: {
        show: false,
        which: ["mer", "ven", "ter", "lun", "mar", "jup", "sat"],

        symbolType: "disk",
        names: false,
        nameStyle: {
          fill: "#00ccff",
          font: `3px ${FONT}`,
          align: "center",
          baseline: "top",
        },
        namesType: "en",
      },

      dsos: {
        show: false,
        names: false,
      },

      constellations: {
        names: names,
        namesType: "iau",
        nameStyle: {
          fill: "#ffffff",
          align: "center",
          baseline: "middle",
          font: [`4px ${FONT}`, `6px ${FONT}`, `2px ${FONT}`],
        },
        lines: lines,
        lineStyle: { stroke: color, width: 0.2, opacity: 1 },
        // bonds: false,
        // boundStyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
      },

      mw: {
        show: mv,
        style: { fill: "#ffffff", opacity: 0.08 },
      },

      background: {
        fill: bg, // Area fill
        opacity: 1,
        stroke: color, // Outline
        width: 1.5,
      },

      horizon: {
        //Show horizon marker, if location is set and map projection is all-sky
        show: true,
        stroke: "#000000", // Line
        width: 1.0,
        fill: "#000000", // Area below horizon
        opacity: 1,
      },

      daylight: {
        //Show day sky as a gradient, if location is set and map projection is hemispheric
        show: false,
      },

      stars: {
        colors: false,
        size: 2,
        limit: 5,
        exponent: -0.28,
        designation: false,

        propername: false,
        propernameType: "name",
        propernameStyle: {
          fill: "#ddddbb",
          font: `4px ${FONT}`,
          align: "right",
          baseline: "center",
        },
        propernameLimit: 1.0,
      },
    };

    Celestial.display(config);
    Celestial.skyview({ date: DATE });
    window.Celestial = Celestial;
  });

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
    setRegion(region);
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

  const handleColor = (event) => {
    const bgColor = event.target.attributes.data.value;
    const color = event.target.attributes.color.value;
    bgColor === "#FFFFFF" || bgColor === "#ffffff" || bgColor === "#fff"
      ? setBg("#000")
      : setBg(bgColor);

    const element = document.getElementsByClassName("map-pre")[0];
    element.style.backgroundColor = bgColor;
    element.style.color = color;
    const elements = document.getElementsByClassName("hr-co");
    for (const ele of elements) {
      ele.style.color = color;
    }
  };

  const initialColor = (bg, clr) => {
    const bgColor = bg;
    const color = clr;
    bgColor === "#FFFFFF" || bgColor === "#ffffff" || bgColor === "#fff"
      ? setBg("#000")
      : setBg(bgColor);

    const element = document.getElementsByClassName("map-pre")[0];
    element.style.backgroundColor = bgColor;
    element.style.color = color;
    const elements = document.getElementsByClassName("hr-co");
    for (const ele of elements) {
      ele.style.color = color;
    }
  };

  const handleTag = (event) => {
    const { value } = event.target;
    setTag(value);
  };

  const handleRegion = (event) => {
    const { value } = event.target;
    setPlace(value);
  };

  const handleMsg = (event) => {
    const { value } = event.target;
    setMsg(value);
  };

  const handleSize = (event) => {
    const sze = event.target.attributes.sze.value;
    setSize(sze);
    const width = event.target.attributes.width.value;
    document.getElementsByClassName("active")[0].classList.remove("active");
    event.target.classList.add("active");
    document.getElementsByClassName("map-container-starmap")[0].style.height =
      width;
  };
  const handleCart = async () => {
    // await getImage();
    setLoading(true);
    let img = "";
    await html2canvas(document.getElementsByClassName("map-inner")[0]).then(
      function (canvas) {
        img = canvas.toDataURL("image/jpeg");
      }
    );
    let cart = [];
    const existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart !== null) {
      cart = existingCart;
    }
    let cartItem = {
      map: "starmap",
      label: place,
      tag: tag,
      place: region,
      lat: lat,
      lng: lng,
      price: total,
      size: size,
      style: {
        globe: globe,
        mv: mv,
        names: names,
        lines: lines,
      },
      color: bg,
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
          <input
            type="text"
            className="form form-control mb-3"
            placeholder="Message"
            value={msg || ""}
            onChange={handleMsg.bind(this)}
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
            onClick={handleSize.bind(this)}
            sze="50 X 70 cm"
          >
            50 X 70 cm
          </button> */}
          <hr className="mb-3" />
          <label className="mb-3">4. Styles</label> <br />
          <span
            className={globe ? "svg svg-otl me-3" : "svg me-3"}
            onClick={() => {
              setGlobe(!globe);
            }}
          >
            <Web />
          </span>
          <span
            className={mv ? "svg svg-otl me-3" : "svg me-3"}
            onClick={() => {
              setMv(!mv);
            }}
          >
            <Mdl />
          </span>
          <span
            className={lines ? "svg svg-otl me-3" : "svg me-3"}
            onClick={() => {
              setLines(!lines);
            }}
          >
            <Line />
          </span>
          <span
            className={names ? "svg svg-otl me-3" : "svg me-3"}
            onClick={() => {
              setNames(!names);
            }}
          >
            <Font />
          </span>
        </div>
        <div className="map">
          <div className="map-inner shadow" ref={ref}>
            <div className="border map-pre">
              <div className="outer-map text-center">
                <div id="map-container" className="map-container-starmap">
                  <div id="map"></div>
                </div>
                {/* <div className="map-container-co">place.charAt(0)</div> */}
              </div>
              <hr className="hr-co" />
              <h2 className="text-center place-co  m-3">{place}</h2>
              <hr className="hr-co" />
              <p className="text-center lntlat-co  m-3">
                {tag} <br /> <small>{msg}</small>{" "}
              </p>
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
          <Cartpop />
          <Loader time={1000} />
          <Loading
            loading={loading}
            background="#ffffffde"
            loaderColor="#3498db"
          />
        </div>
      </main>
    </Layout>
  );
};

export default Starmap;
