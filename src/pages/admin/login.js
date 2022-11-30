import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/loading";

const Login = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleValidation = () => {
    const formData = form;
    const error = {};
    let isValid = true;
    if (
      !formData.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      error["email"] = "Please enter valid Email";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      error["password"] = "Please enter valid password";
      isValid = false;
    }
    setErrors(error);
    return isValid;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      let baseUrl = "";
      process.env.NODE_ENV === "development"
        ? (baseUrl = process.env.REACT_APP_DEV_URL)
        : (baseUrl = process.env.REACT_APP_STAGE_URL);

      const axiosUrl = axios.create({
        baseURL: baseUrl,
      });

      let response = await axiosUrl
        .post("/users/admin/login", form)
        .catch((err) => alert(err.response.data.message));

      localStorage.setItem("token", response.data.data.token);
      const { name, role, email } = response.data.data;
      const user = { name: name, role: role, email: email };
      console.log(user);
      localStorage.setItem("userInfo", JSON.stringify(user));
      nav("/admin/dashboard");
    }
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#F6F7FB" }}>
      <Loader time={1000} />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5">
                <h3 className="mb-5">Log in</h3>
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      name="email"
                      autoComplete=""
                      onChange={handleChange.bind(this)}
                    />
                    <span style={{ color: "red" }}>
                      <small>{errors?.email}</small>
                    </span>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      name="password"
                      autoComplete=""
                      onChange={handleChange.bind(this)}
                      placeholder="Password"
                    />
                    <span style={{ color: "red" }}>
                      <small>{errors?.password}</small>
                    </span>
                  </div>

                  <div className="d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="button"
                    onClick={handleSubmit.bind()}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
