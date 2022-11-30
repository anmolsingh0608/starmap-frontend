import Layout from "../../component/admin/layout";
import Loader from "../../component/loading";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Loader time={1000} />
        {/* <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <input id="html" type="checkbox" className="magic-checkbox" />
                    <label htmlFor="html">HTML</label>

                    <input id="css" type="checkbox" className="magic-checkbox" />
                    <label htmlFor="css">CSS</label>

                    <input id="js" type="checkbox" className="magic-checkbox" />
                    <label htmlFor="js">Javascript</label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      name="job"
                      id="designer"
                      type="radio"
                      className="magic-radio"
                    />
                    <label htmlFor="designer">Web designer</label>

                    <input
                      name="job"
                      id="developer"
                      type="radio"
                      className="magic-radio"
                    />
                    <label htmlFor="developer">Web developer</label>

                    <input
                      name="job"
                      id="frontened"
                      type="radio"
                      className="magic-radio"
                    />
                    <label htmlFor="frontened">Frontened</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Button</label> <br />
                    <button className="btn btn-primary">Sumbmit</button>
                    <button className="btn btn-warning">Sumbmit</button>
                    <button className="btn btn-info">Sumbmit</button>
                    <button className="btn btn-danger">Sumbmit</button>
                    <button className="btn btn-secondary">Sumbmit</button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Languages</label>
                    <select name="" id="" className="form-control">
                      <option value="">HTML</option>
                      <option value="">CSS</option>
                      <option value="">JS</option>
                      <option value="">PHP</option>
                      <option value="">SQL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="title">Users</div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        id="staticEmail"
                        value="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        id="staticEmail"
                        value="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  );
};

export default Dashboard;
