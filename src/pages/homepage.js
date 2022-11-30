import { Link } from "react-router-dom";
import Header from "../component/header";
import Layout from "../layout/layout";

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src="https://craftoak.com/storage/app/media/banners/products/citymap.png"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">City Maps</h5>
                    Custom Prints from $55
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <Link
                      to="/citymap"
                      className="btn btn-outline-dark mt-auto"
                    >
                      Create Map
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                {/* <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem;", right:" 0.5rem;" }}>Sale</div> */}
                <img
                  className="card-img-top"
                  src="https://craftoak.com/storage/app/media/banners/products/starmap.png"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">Star Maps</h5>
                    Custom Prints from $55
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <Link className="btn btn-outline-dark mt-auto" to="/starmap">
                      Create Map
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                {/* <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem;", right:" 0.5rem;" }}>Sale</div> */}
                <img
                  className="card-img-top"
                  src="https://craftoak.com/storage/app/media/banners/products/coordinates.png"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">Coordinates</h5>
                    Custom Prints from $44.95
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <Link className="btn btn-outline-dark mt-auto" to="/coordinates" >
                      Create Map
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src="https://craftoak.com/storage/app/media/banners/products/travelmap.png"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">Travel Maps</h5>
                    Custom Prints from $
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <a className="btn btn-outline-dark mt-auto" href="#!">
                      Coming soon
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
