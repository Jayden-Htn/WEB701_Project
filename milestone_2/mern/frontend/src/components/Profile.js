import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");
  // const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    var user = AuthService.getCurrentUser()
    setCurrentUser(user);
    console.log("user:", user);
    // console.log("purchases:", user.purchases);
    // console.log("purchases name:", user.purchases.name);
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Profile</h3>
      </header>
      <p>
        <strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}
      </p>
      <p>
        <strong>Token:</strong> {currentUser.accessToken} {/*{currentUser.accessToken.substring(0, 20)} ...{" "} */}
        {/*{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Organisation:</strong> {currentUser.organisation || "N/A"}
      </p>
      <p>
        <strong>Roles:</strong> {currentUser.role}
      </p>
      <p>
        <strong>Tokens:</strong> {currentUser.tokens}
      </p>
      <p>
        <strong>Token expiry:</strong> {currentUser.tokenExpiry}
      </p>
      <p>
        <strong>Purchases:</strong></p>
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