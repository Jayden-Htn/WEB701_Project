import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserService from "../services/user.service";
import ShopService from "../services/shop.service";
import AuthService from "../services/auth.service";

const BoardUser = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    UserService.getUserBoard().then(
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

  const purchase = (id) => {
    setLoading(true);
    ShopService.purchaseItem(id).then((response) => {
      let currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        currentUser.tokens = response.data.tokens;  // Update the balance
        currentUser.purchases = response.data.purchases;  
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        console.log("Error: User not found in localStorage");
      }
      navigate("/profile");
      window.location.reload();
      },
      (err) => {
        console.log("Purchase error:", err)
        setLoading(false);
      }
    );
    setLoading(false);
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Store</h3>
        <div id="container">
          {
            Array.isArray(content) ? (
              content.map((data, i) => (
                <div key={i} className="item-card" style={{margin: "40px"}}>
                  <h5>{data.name}</h5>
                  <p>{data.description}</p>
                  <p>Price: {data.price}</p>
                  <p>Quantity: {data.quantityAvailable} {/*data.category*/}</p>
                  
                  <button className="btn-primary btn-block" disabled={loading} onClick={() => purchase(data._id)}>
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
      </header>
    </div>
  );
};

export default BoardUser;