import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserService from "../services/user.service";
import ShopService from "../services/shop.service";
import AuthService from "../services/auth.service";
import styles from "./BoardUser.module.css";

const BoardUser = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        
        // Get tokens to display are disabled too-expensive item buttons
        const user = AuthService.getCurrentUser();
        if (user) {
          setTokens(user.tokens);
        }
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

  const purchase = (id) => {
    setLoading(true); // Disable shop while processing
    // Send item id to service for processing
    ShopService.purchaseItem(id).then(() => {
      // If successful, go to profile
      setLoading(false);
      navigate("/profile");
      window.location.reload();
    }).catch((err) => {
      console.log("Purchase error:", err)
      setLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      <h3>Store</h3>
      <p>Tokens: {tokens}</p>
      <div className={styles.shopContainer}>
        {
          Array.isArray(content) ? (
            content.map((data, i) => (
              <div key={i} className={styles.itemCard}>
                <h5>{data.name}</h5>
                <p>{data.description}</p>
                <p>Price: {data.price}</p>
                <p>Quantity: {data.quantityAvailable} {/*data.category*/}</p>
                
                <button className={styles.button} disabled={loading || data.price > tokens} onClick={() => purchase(data._id)}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Buy</span>
                </button>
              </div>
            ))
          ) : (
            <li>Nothing</li>
          )
        }
      </div>
    </div>
  );
};

export default BoardUser;