import React from "react";
import './About.css';
import LinkedInLogo from "../../images/linkedin.svg";
import GitHubLogo from "../../images/github.svg";
import EmailLogo from "../../images/email.svg";

export default function About() {
  return (
    <div className="about">
      <p>Criado por Anthony Rossa</p>
      <div className="about__links">
        <a href="mailto:anthonysixty23@gmail.com" target="_blank" rel="noopener noreferrer">
          <img src={EmailLogo} alt="Email" className="about__icon" />
        </a>
        <a href="https://www.linkedin.com/in/anthony-rossa-24a362371/" target="_blank" rel="noopener noreferrer">
          <img src={LinkedInLogo} alt="LinkedIn" className="about__icon" />
        </a>
        <a href="https://github.com/AnthonyRossa" target="_blank" rel="noopener noreferrer">
          <img src={GitHubLogo} alt="GitHub" className="about__icon" />
        </a>
      </div>
    </div>
  );
}
