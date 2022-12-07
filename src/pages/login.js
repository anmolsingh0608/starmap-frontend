import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import axiosUrl from "../component/axiosUrl";
import toast, { Toaster } from "react-hot-toast";
import { ActionCreators } from "../actions/profile";
import { useDispatch } from "react-redux";

const Loginuser = ({ handleLogin }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    const form = formData;
    let error = {};
    let isValid = true;

    if (!form.email) {
      error.email = "Email is required";
      isValid = false;
    }

    if (!form.password) {
      error.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 8) {
      error.password = "Password should be of at least 8 characters";
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      axiosUrl
        .post("/users/login", formData)
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);
          const { name, role, email } = response.data.data;
          const user = { name: name, role: role, email: email };
          dispatch(ActionCreators.login(user));
          localStorage.setItem("userInfo", JSON.stringify(user));
          handleLogin(true);
          toast.success("You are logged in!");
          document.getElementById("btn-close").click();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="login modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="login modal-dialog modal-dialog-centered"
          role="document"
        >
          <div className="login modal-content">
            <div className="login modal-header border-bottom-0">
              <button
                type="button"
                className="login btn-close float-end"
                aria-label="Close"
                id="btn-close"
                data-bs-dismiss="modal"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="login modal-body">
              <div className="login form-title text-center">
                <h4>Login</h4>
              </div>
              <div className="login d-flex flex-column text-center">
                <form>
                  <div className="login form-group">
                    <input
                      type="email"
                      className="login form-control mt-3"
                      id="email1"
                      placeholder="Your email address..."
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange.bind(this)}
                    />
                    <span style={{ color: "red" }}>
                      <small>{errors?.email}</small>
                    </span>
                  </div>
                  <div className="login form-group">
                    <input
                      type="password"
                      className="login form-control mt-3"
                      id="password1"
                      placeholder="Your password..."
                      name="password"
                      value={formData.password || ""}
                      onChange={handleChange.bind(this)}
                    />
                    <span style={{ color: "red" }}>
                      <small>{errors?.password}</small>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="login mt-3 btn btn-info btn-block btn-round w-100"
                    onClick={handleSubmit.bind(this)}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            {/* <div className="login modal-footer d-flex justify-content-center">
              <div className="login signup-section">
                Not a member yet?{" "}
                <Link to="/register" className="login text-info">
                  {" "}
                  Sign Up
                </Link>
                .
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginuser;
