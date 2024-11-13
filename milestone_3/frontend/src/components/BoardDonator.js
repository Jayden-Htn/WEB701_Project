import React, { useState, useEffect } from "react";
import ShopService from "../services/shop.service";
import UserService from "../services/user.service";
import styles from "./BoardDonator.module.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [errors, setErrors] = useState({
    itemName: "",
    description: "",
    tokenPrice: "",
    quantity: "",
    category: ""
  });

  useEffect(() => {
    UserService.getDonatorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const validate = () => {
    const newErrors = { itemName: "", description: "", tokenPrice: "", quantity: "", category: ""};
    let isValid = true;

    if (!itemName) {
      newErrors.itemName = "This field is required!";
      isValid = false;
    } else if (itemName.length < 3 || itemName.length > 30) {
      newErrors.itemName = "The item name must be between 3 and 30 characters.";
      isValid = false;
    }

    if (!description) {
      newErrors.description = "This field is required!";
      isValid = false;
    } else if (description.length < 10 || description.length > 250) {
      newErrors.description = "The description must be between 10 and 250 characters.";
      isValid = false;
    }

    if (!tokenPrice) {
      newErrors.tokenPrice = "This field is required!";
      isValid = false;
    } else if (!Number.isInteger(tokenPrice)) {
      newErrors.tokenPrice = "This is not a valid price.";
      isValid = false;
    } else if (tokenPrice <= 0) {
      newErrors.tokenPrice = "This is not a valid price.";
      isValid = false;
    }

    if (!quantity) {
      newErrors.organisation = "This field is required!";
      isValid = false;
    } else if (!Number.isInteger(quantity)) {
      newErrors.quantity = "This is not a valid quantity.";
      isValid = false;
    } else if (quantity <= 0) {
      newErrors.quantity = "This is not a valid quantity.";
      isValid = false;
    }

    if (!category) {
      newErrors.category = "This field is required!";
      isValid = false;
    } 

    setErrors(newErrors);
    return isValid;
  };

  const handleDonation = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    if (validate()) {
      ShopService.addItem(itemName, description, tokenPrice, quantity, category).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

          setItemName("");
          setDescription("");
          setTokenPrice(0);
          setQuantity(0);
        },
        (error) => {
          const resMessage = error.response.data.message.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    // Construct user profile and display data
    <div className={styles.container}>
      
      {/* Donation form */}
      <form onSubmit={handleDonation} className={styles.donateForm}>
      <h3>Donation Form</h3>
      <div>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          {errors.itemName && <div className="alert alert-danger" role="alert">{errors.itemName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <div className="alert alert-danger" role="alert">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="tokenPrice">Token Price</label>
          <input
            type="number"
            className="form-control"
            name="tokenPrice"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(Number.parseInt(e.target.value))}
          />
          {errors.tokenPrice && <div className="alert alert-danger" role="alert">{errors.tokenPrice}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            className="form-control"
            name="number"
            value={quantity}
            placeholder="n/a"
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          />
          {errors.quantity && <div className="alert alert-danger" role="alert">{errors.quantity}</div>}
        </div>

        <div className="form-group">
            <label htmlFor="category">Item Category</label>
            <select name="category"  value={category} onChange={(e) => setCategory(e.target.value)}>
              <option disabled></option>
              <option value="phone">Phone</option>
              <option value="computer">Computer</option>
              <option value="tablet">Tablet</option>
              <option value="charger">Charger</option>
              <option value="audio">Audio</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <div className="alert alert-danger" role="alert">{errors.category}</div>}
          </div>

          <div className="form-group">
            <button className={styles.button}>SUBMIT</button>
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
    </div>
  );
};

export default Profile;