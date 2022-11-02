import React from "react";
import loginImage from "../assets/login-pizza.jpg";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function LoginForm({ setToken }) {
  let navigate = useNavigate();
  const [form, setForm] = React.useState({ username: "", password: "" });

  //used so input fields are not pre-validated before attempting to login
  const [formValidated, setFormValidated] = React.useState(false);

  //Error shown in login if input is invalid
  const [error, setError] = React.useState("");

  //used to check form validity 
  const formElem = document.getElementById("loginForm");

  const goToOrderPage = () => { navigate("/Home"); }

  //attempt login and set validated styles on input fields
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formElem.checkValidity()) {
      AuthService.login(form.username, form.password)
        .then((token) => {
          console.log("token " + token)
          setToken(token);
          goToOrderPage();
        })
        .catch((error) => {
          if (error.message === "401") {
            setError("Invalid username or password. Please try again.");
          } else {
            setError("Error: " + error.message);
          }
        });
    }
    setFormValidated(true);
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <div className="d-flex justify-content-center h-100" >
      <div className="row no-gutters mt-5 border rounded shadow bg-light" style={{ width: '50rem' }}>
        {/* left side image */}
        <img
          src={loginImage}
          className="login-img img-fluid col-lg-4 col-md-5 rounded-left"
          alt="Pizza"
        />
        {/* right side */}
        <div className="col-lg-8 col-md-7 px-4 mt-3">
          {/* Title */}
          <p>Log In To Place Your Order</p>

          {/* login form */}
          <form
            className={`${formValidated ? "was-validated" : "needs-validation"}`}
            id="loginForm"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* username Input */}
            <div className="form-outline mb-4">
              <input
                type="username"
                required
                id="LoginFormEmail"
                className="form-control"
                placeholder="Username"
                aria-label="input box for username address"
                onChange={(e) => setField("username", e.target.value)}
              />
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
              <input
                type="password"
                required
                id="loginFormPassword"
                className="form-control"
                placeholder="Password"
                aria-label="input box for password"
                onChange={(e) => setField("password", e.target.value)}
              />
            </div>

            {/* Error text */}
            <p className="text-danger">{error}</p>

            {/* remember me and forgot pass */}
            <div className="row mb-4 d-flex justify-content-between">
              <div className="col col-md-7">
                <div className="form-check d-flex">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="LoginRememberMeCheck"
                  />
                  <label className="form-check-label">Remember me</label>
                </div>
              </div>
              <div className="col col-md-5 d-flex flex-row-reverse pr-3">
                <a href="">Forgot password?</a>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                Not a member? <a href="">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
