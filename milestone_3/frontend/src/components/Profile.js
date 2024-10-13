import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    var user = AuthService.getCurrentUser()
    setCurrentUser(user);
  }, []);

  return (
    // Construct user profile and display data
    <div className="container">
      <header className="jumbotron">
        <h3>Profile</h3>
      </header>
      <p><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
      <p><strong>Token:</strong> {currentUser.accessToken}</p>
      <p><strong>Id:</strong> {currentUser.id}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Organisation:</strong> {currentUser.organisation || "N/A"}</p>
      <p><strong>Roles:</strong> {currentUser.role}</p>
      <p><strong>Tokens:</strong> {currentUser.tokens}</p>
      <p><strong>Token expiry:</strong> {currentUser.tokenExpiry}</p>
      {/* Map purchases to list*/}
      <p><strong>Purchases:</strong></p>
      <ul>
        {
          Array.isArray(currentUser.purchases) ? (
            currentUser.purchases.map((item, i) => (
                <li key={i}>{item}</li>
            ))
          ) : (
            <li>Nothing</li>
          )
        }
      </ul>
    </div>
  );
};

export default Profile;