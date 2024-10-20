import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import UserService from "../services/user.service";
import styles from "./Home.module.css";

const Home = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="container">

      {/* Hero top section */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroText}>
            <h1>Re:Tech</h1>
            <h3>Empowering lives with refurbished technology</h3>
          </div>
        </div>
        <div className={styles.heroRight}>
          {/* Free use: https://www.pexels.com/photo/boy-and-woman-sitting-on-sofa-with-headphones-4624912/ */}
          <img src={"./images/people_1.png"} className={styles.img1} alt={"Boy and woman sitting on sofa with headphones and laptop"}></img>
          {/* Free use: https://www.pexels.com/photo/a-woman-smiling-holding-laptop-7584674/ */}
          <img src={"./images/person_laptop.png"} className={styles.img2} alt={"A woman smiling holding laptop"}></img>
        </div>
      </div>

      {/* Stats banner */}
      <div className={styles.statsBanner}>
        <div className={styles.statsBlock}>
          <div className={styles.statsSection}>
            <h3>357</h3>
            <p>devices donated to our community</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.statsSection} style={{margin: "0 8px"}}>
            <h3>287</h3>
            <p>people benefited through Re:Tech</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.statsSection}>
            <h3>3</h3>
            <p>years of supporting Nelson/Tasman</p>
          </div>
        </div>
      </div>

      {/* Links banner */}
      <div className={styles.banner}>
        <div className={styles.bannerSection}>
          <h3>Need a device?</h3>
          <button onClick={() => navigate("/register")}>GET A DEVICE</button>
        </div>
        <div className={styles.bannerSection}>
          <h3>Want to support us?</h3>
          <button onClick={() => navigate("/register")}>DONATE A DEVICE</button>
        </div>
      </div>

      {/* Basic info section */}
      <div className={styles.info}>
        <div className={styles.infoSection}>
          {/* https://www.pexels.com/photo/three-people-donating-goods-6646918/ */}
          <img src={"./images/volunteers.jpg"} alt={"Three volunteers donating goods"}></img>
          <div className={styles.infoSectionText}>
            <h3>Who We Are</h3>
            <p>
              Re:Tech is a Nelson, New Zealand-based charity that provides refurbished technology to those in need. By 
              collecting and restoring used computers and devices, the organization helps individuals and families gain 
              access to essential technology for education, employment, and staying connected. Re:Tech promotes both 
              sustainability and digital inclusion, reducing electronic waste while empowering people with the tools to 
              thrive in today's digital world.
            </p>
            <button onClick={() => navigate("/about")}>ABOUT US</button>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoSectionText}>
            <h3>Get In Contact</h3>
            <p>
              Need assistance? You can register with Re:Tech by filling out our form or contacting us directly. 
              We're here to help you access essential technology.
            </p>
            <p>
              Want to get involved? Enquire about becoming a volunteer and make a difference in your community.
            </p>
            <p>
              Support our mission! Businesses and individuals can donate money or old devices, giving those in 
              need the opportunity to connect and thrive while reducing e-waste.
            </p>
            <button onClick={() => navigate("/contact")}>CONTACT US</button>
          </div>
          {/* https://www.pexels.com/photo/group-of-people-taking-photo-1963622/ */}
          <img src={"./images/group.jpg"} alt={"Large group of people taking a photo"}></img>
        </div>
      </div>

    </div>
  );
};

export default Home;