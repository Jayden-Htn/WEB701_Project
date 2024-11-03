import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import UserService from "../services/user.service";
import styles from "./About.module.css";

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
        {/* https://www.pexels.com/photo/team-holding-their-hands-on-seashore-1756665/ */}
        <img src={"./images/group_2.jpg"} alt={"Group of people holding hands at the beach"}></img>
        <h1 className={styles.heroTitle}>About Us</h1>
      </div>

      {/* Overview section */}
      <div className={styles.overview}>
        <div className={styles.overviewSection}>
          <h3>Who Are We?</h3>
          <p>
            Re:Tech is a Nelson, New Zealand-based charity dedicated to refurbishing and distributing old technology to 
            individuals and communities in need. By collecting used computers, laptops, and other devices, Re:Tech
            ensures these items are repaired and repurposed for people who lack access to digital tools. The organization 
            is driven by a mission to bridge the digital divide and promote digital inclusivity, helping recipients access 
            educational resources, job opportunities, and stay connected. Through its work, Re:Tech fosters sustainability 
            by reducing e-waste while empowering individuals with the tools they need to succeed in a digital world.
          </p>
        </div>
        <div className={styles.overviewSection}>
          <h3>Our Goal?</h3>
          <p>
            Re:Tech's primary goal is to provide access to essential technology for those who are disadvantaged or 
            under-resourced. By distributing refurbished devices, the charity aims to support education, career development, 
            and social inclusion for recipients. Another key goal is promoting environmental sustainability through the reuse 
            of electronics, reducing e-waste and extending the lifespan of technology. Re:Tech envisions a future where 
            everyone, regardless of their financial situation, can engage with the digital world and access the opportunities 
            it offers, thereby closing the gap in digital inequality across communities.
          </p>
        </div>
      </div>

      {/* Steps section */}
      <div className={styles.steps}>
        <h3>How It Works</h3>
        <div className={styles.stepsContainer}>
          <div className={styles.stepsSection}>
            <h4>Step 1</h4>
            <p>
              Community members and businesses donate old devices like computers, laptops, and tablets, as well as financial 
              contributions to support refurbishing efforts. These donations provide the core resources needed for Re:Tech
              to collect, repair, and prepare technology for redistribution to those in need.
            </p>
          </div>
          <div className={styles.stepsSection}>
            <h4>Step 3</h4>
            <p>
              Re:Tech refurbishes donated devices, ensuring they are functional and updated with the necessary software. 
              This process extends the lifespan of the technology, making it ready for use by new owners. By 
              professionally restoring the devices, the charity maintains a standard of quality and sustainability.
            </p>
          </div>
          <div className={styles.stepsSection}>
            <h4>Step 3</h4>
            <p>
              Every year, individuals in need are given tokens, which can be exchanged for refurbished devices through 
              Re:Tech. These tokens allow recipients to choose the technology that suits their needs, ensuring equitable 
              access to the digital tools essential for education, communication, and career development.
            </p>
          </div>
        </div>
      </div>

      {/* Board section */}
      <div className={styles.board}>
      <h3>Board of Trustees</h3>
        <div className={styles.boardContainer}>
          <div className={styles.boardSection}>
            <img src="./images/woman_3.jpg"></img>
            <h4>Emily Patterson</h4>
            <p>Chairperson</p>
          </div>
          <div className={styles.boardSection}>
            <img src="./images/man.jpg"></img>
            <h4>David Wright</h4>
            <p>Vice-Chairperson</p>
          </div>
          <div className={styles.boardSection}>
            <img src="./images/woman_1.jpg"></img>
            <h4>Sarah Lee</h4>
            <p>Secretary</p>
          </div>
          <div className={styles.boardSection}>
            <img src="./images/woman_2.jpg"></img>
            <h4>Anna Green</h4>
            <p>Treasurer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;