import { useState } from "react";
import Loader from "../component/loading";
import Layout from "../layout/layout";
import axiosUrl from "../component/axiosUrl";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    let isValid = true;
    let err = {};
    const form = formData;

    if (
      !form.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      err["email"] = "Please enter valid Email";
      isValid = false;
    }

    if (!form.name) {
      err["name"] = "Please enter name";
      isValid = false;
    }

    if (!form.password || form.password.length < 8) {
      err["password"] = "Please enter valid password";
      isValid = false;
    }

    if (!form.password2) {
      err["password2"] = "Please enter password for confirmation";
      isValid = false;
    } else if (form.password2 !== form.password) {
      err["password2"] = "Password and Confirm Password should be same";
    }
    setErrors(err);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      axiosUrl
        .post("/users", formData)
        .then((res) => {
          toast.success("Account created!");
          setTimeout(() => {
            nav('/');
          }, 1000)
          console.log(res);
        })
        .catch((err) => {
          toast.error(err.response.data.errors[0].msg);
        });
    }
  };

  return (
    <Layout>
      <section className="vh-100" style={{ backgroundColor: "#F6F7FB" }}>
        <Loader time={1000} />
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong m-0"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-3">
                  <h3 className="mb-5">Create Account</h3>
                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id=""
                        className="form-control form-control-lg"
                        placeholder="Name"
                        name="name"
                        autoComplete=""
                        onChange={handleChange.bind(this)}
                      />
                      <span style={{ color: "red" }}>
                        <small>{errors?.name}</small>
                      </span>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange.bind(this)}
                        autoComplete=""
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

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id=""
                        className="form-control form-control-lg"
                        name="password2"
                        autoComplete=""
                        onChange={handleChange.bind(this)}
                        placeholder="Confirm Password"
                      />
                      <span style={{ color: "red" }}>
                        <small>{errors?.password2}</small>
                      </span>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="button"
                      onClick={handleSubmit.bind()}
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </Layout>
  );
};

export default Register;
