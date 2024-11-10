import React, { useState } from "react";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import styles from "./Register.module.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    organisation: ""
  });

  const validate = () => {
    const newErrors = { firstName: "", lastName: "", email: "", password: "", role: "", organisation: ""};
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = "This field is required!";
      isValid = false;
    } else if (firstName.length < 3 || firstName.length > 20) {
      newErrors.firstName = "The first name must be between 3 and 20 characters.";
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "This field is required!";
      isValid = false;
    } else if (lastName.length < 3 || lastName.length > 20) {
      newErrors.lastName = "The last name must be between 3 and 20 characters.";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "This field is required!";
      isValid = false;
    } else if (!isEmail(email)) {
      newErrors.email = "This is not a valid email.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "This field is required!";
      isValid = false;
    } else if (password.length < 6 || password.length > 40) {
      newErrors.password = "The password must be between 6 and 40 characters.";
      isValid = false;
    }

    if (organisation.length < 0 || organisation.length > 40) {
      newErrors.organisation = "The organisation must be less than 40 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (validate()) {
      AuthService.register(firstName, lastName, email, password, role, organisation).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleRegister} className={styles.registerForm}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="alert alert-danger" role="alert">{errors.firstName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="alert alert-danger" role="alert">{errors.lastName}</div>}
              </div>

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

              <div className="form-group">
                <label htmlFor="role">Account Type</label>
                <select name="role"  value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="beneficiary">Beneficiary</option>
                  <option value="donator">Donator</option>
                </select>
                {errors.role && <div className="alert alert-danger" role="alert">{errors.role}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="organisation">Organisation (optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="organisation"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                />
                {errors.organisation && <div className="alert alert-danger" role="alert">{errors.organisation}</div>}
              </div>

              <div className="form-group">
                <button className={styles.button}>Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
