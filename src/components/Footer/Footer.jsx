import React from "react";
import "./Footer.css";
import About from "../About/About";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2026 FinTrack. All rights reserved.</p>
      <About />
    </footer>
  );
}