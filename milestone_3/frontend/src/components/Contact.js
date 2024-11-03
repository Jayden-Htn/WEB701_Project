import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { isEmail } from "validator";

import UserService from "../services/user.service";
import styles from "./Contact.module.css";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    textMessage: ""
  });

  const validate = () => {
    const newErrors = { name: "", email: "", textMessage: ""};
    let isValid = true;

    if (!name) {
      newErrors.came = "This field is required!";
      isValid = false;
    } else if (name.length < 3 || name.length > 20) {
      newErrors.name = "The name must be between 3 and 20 characters.";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "This field is required!";
      isValid = false;
    } else if (!isEmail(email)) {
      newErrors.email = "This is not a valid email.";
      isValid = false;
    }

    if (!textMessage) {
      newErrors.textMessage = "This field is required!";
      isValid = false;
    } else if (textMessage.length < 6 || textMessage.length > 250) {
      newErrors.textMessage = "The password must be between 6 and 250 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (validate()) { 
      setMessage("Sent contact message.");
      setSuccessful(true);    
    }
  } 

  return (
    <div className="container">

      {/* Hero top section */}
      <div className={styles.hero}>
        {/* https://www.pexels.com/photo/photo-of-people-near-wooden-table-3184418/ */}
        <img src={"./images/hands.jpg"} alt={"People stacking their hands together"}></img>
        <h1 className={styles.heroTitle}>Contact Us</h1>
      </div>

      {/* Main body section */}
      <div className={styles.mainBody}>
        <div className={styles.article}>
          <h3>Feel Free To Contact Us</h3>
          <p><b>Email:</b> email@retech.com</p>
          <p><b>Phone:</b> 123456789 (8am-5pm Mon-Fri)</p>
          <div className={styles.socialContainer}>
            <div className={styles.iconDot}>
              <ion-icon name="logo-instagram" className={styles.icon} size="large"></ion-icon>
            </div>
            <div className={styles.iconDot}>
              <ion-icon name="logo-facebook" className={styles.icon} size="large"></ion-icon>
            </div>
            <div className={styles.iconDot}>
              <ion-icon name="logo-twitter" className={styles.icon} size="large"></ion-icon>
            </div>
            <div className={styles.iconDot}>
              <ion-icon name="logo-youtube" className={styles.icon} size="large"></ion-icon>
            </div>
          </div>
        </div>
        <div className={styles.aside}>
          <h3>Contact Form</h3>
          <form onSubmit={handleSend}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className="alert alert-danger" role="alert">{errors.name}</div>}
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
                  <label htmlFor="textMessage">Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="textMessage"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                  />
                  {errors.textMessage && <div className="alert alert-danger" role="alert">{errors.textMessage}</div>}
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">SUBMIT</button>
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
    </div>
  );
};

export default Home;