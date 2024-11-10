import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import styles from "./Profile.module.css";
import { useNavigate } from 'react-router-dom';
import { isEmail } from "validator";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [showBeneficiary, setShowBeneficiary] = useState(false);
  const [showDonator, setShowDonator] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organisation: ""
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    console.log("User:", user);

    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setOrganisation(user.organisation);

      if (user.role === "role_beneficiary") {
        setShowBeneficiary(true);
      }
      
      const expiryDate = new Date(user.tokenExpiry);
      expiryDate.getTime()
      user.expiryDate = expiryDate.toLocaleDateString("en-GB", {
        year: "numeric", month: "long", day: "numeric", 
      });
      setUser(user);
    } 
    else {
      navigate("/login");
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = { firstName: "", lastName: "", email: "", organisation: ""};
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

    if (organisation.length < 0 || organisation.length > 40) {
      newErrors.organisation = "The organisation must be less than 40 characters.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    if (validate()) {
      AuthService.update(user.id, firstName, lastName, email, organisation).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

          let newUser = user;
          newUser.firstName = firstName;
          newUser.lastName = lastName;
          newUser.email = email;
          newUser.organisation = organisation;
          setUser(newUser);
        },
        (error) => {
          const resMessage = error.response.data.message.toString();
          // (error.response && error.response.data && error.response.data.message) || error.message ||
          setMessage(resMessage);
          setSuccessful(false);

          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setOrganisation(user.organisation);
        }
      );
    }
  };

  return (
    // Construct user profile and display data
    <div className={styles.container}>
      <header className="jumbotron">
        <h3>Welcome {firstName} {lastName}</h3>
      </header>
      {showBeneficiary && (
        <div className={styles.tokens}>
        <div className={styles.tokensLeft}>
          <h3>My Balance:</h3>
          <h4>{user.tokens} Tokens</h4>
          <p>Next reset {user.expiryDate}</p>
        </div>
        <div className={styles.tokensRight}>
          <button className={styles.buttonWhite} onClick={() => navigate("/user")}>SHOP</button>
        </div>
      </div>
      )}

      <div className={styles.mainBody}>
        {/* Account details update form */}
        <form onSubmit={handleUpdate} className={styles.updateDetailsForm}>
          <h3>Account Details</h3>
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
              <label htmlFor="organisation">Organisation (optional)</label>
              <input
                type="text"
                className="form-control"
                name="organisation"
                value={organisation}
                placeholder="n/a"
                onChange={(e) => setOrganisation(e.target.value)}
              />
              {errors.organisation && <div className="alert alert-danger" role="alert">{errors.organisation}</div>}
            </div>

            <div className="form-group">
              <button className={styles.button}>UPDATE</button>
            </div>
          </div>

          {message && (
            <div className={`form-group ${styles.messageBox}`}>
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
        </form>

        {/* Map purchases to list */}
        {showBeneficiary && (
          <div className={styles.purchaseHistory}>
          <p><strong>Purchases:</strong></p>
          <ul>
            {
              Array.isArray(user.purchases) ? (
                user.purchases.map((item, i) => (
                    <li key={i}>{item}</li>
                ))
              ) : (
                <li>Nothing</li>
              )
            }
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};

export default Profile;