import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import styles from "./Login.module.css";

const required = (value) => !value ? "This field is required!" : "";

const Login = () => {
  const navigate = useNavigate();

  // Set up use states for each form field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  // Validate that the inputs are valid
  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    newErrors.email = required(email);
    if (newErrors.email) isValid = false;

    newErrors.password = required(password);
    if (newErrors.password) isValid = false;

    setErrors(newErrors);
    return isValid;
  };

  // Validate and send login inputs to auth service
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); // Start loading icon
    // Validate inputs
    if (validate()) {
      // Send inputs to service to go to backend
      AuthService.login(email, password).then(
        () => {
          // Successful login, go to profile
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={styles.bodySection}>
      <div className="card card-container">
        {/* Create form with submit function */}
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
          </div>
          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
          </div>
          {/* Loading symbol for when loading is true */}
          <div className="form-group">
            <button className={styles.button} disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {/* Alert messages */}
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
