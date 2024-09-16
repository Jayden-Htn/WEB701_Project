import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log("USER:", currentUser);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Profile</h3>
      </header>
      <p>
        <strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}
      </p>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
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
    </div>
  );
};

export default Profile;